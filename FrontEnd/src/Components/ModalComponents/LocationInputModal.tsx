import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getLocationWithPincode } from "../../api/locationApi";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";

const LocationInputModal = () => {
  const { userLocation, updateLocation } = useAuth();
  const [pincode, setPincode] = useState<number>(
    userLocation?.pincode ?? 5000001
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const closePopModel = () => {
    navigate({ search: undefined });
  };
  const { mutate } = useMutation({
    mutationFn: getLocationWithPincode,
    onSuccess: (data) => {
      updateLocation(data.location, pincode);
      closePopModel();
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["location"] });
    },
    mutationKey: ["location"],
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 6) return;
    setPincode(parseInt(e.target.value));
  };
  const handleSubmit = () => {
    if (pincode.toString().length !== 6) {
      alert("Please enter a valid pincode");
      return;
    }
    mutate(pincode);
  };
  return (
    <div className="w-96 max-sm:w-72 h-full bg-white rounded-lg ">
      <h1 className="p-4 bg-slate-400">Choose a location</h1>
      <div className="p-4">
        <div>
          <Link to="/user/address" className="underline text-teal-400">
            add address or a pick-up location
          </Link>
        </div>
        <div className="flex space-x-1">
          <input
            type="number"
            placeholder="Enter your pincode"
            className="w-full p-2 flex-grow border-2 border-slate-200 rounded-3xl"
            onChange={handleChange}
            value={pincode}
          />
          <button
            className="w-full p-2  flex-1 border-2 border-slate-200 rounded-3xl"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationInputModal;
