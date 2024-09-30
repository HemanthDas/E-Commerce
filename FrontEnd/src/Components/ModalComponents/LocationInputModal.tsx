import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Address,
  getAllLocationswithID,
  getLocationWithPincode,
} from "../../api/locationApi";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../hooks/useAuth";

const LocationInputModal = () => {
  const { userLocation, updateLocation, currentUser } = useAuth();

  const [pincode, setPincode] = useState<number>(
    userLocation?.pincode ?? 5000001
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const closePopModel = () => {
    navigate({ search: undefined });
  };
  const { data: addresses, isLoading } = useQuery({
    queryKey: ["location"],
    queryFn: () => {
      if (!currentUser) {
        return Promise.reject("User not logged in");
      }
      return getAllLocationswithID(currentUser.id);
    },
  });
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
      alert("Please enter a valid postalcode");
      return;
    }
    mutate(pincode);
  };
  const handleUpdateLocation = (address: Address) => {
    updateLocation(address.city + "," + address.state, pincode);
    closePopModel();
  };
  return (
    <div className="w-96 max-sm:w-72 h-full bg-white rounded-lg ">
      <h1 className="p-4 bg-slate-400">Choose a location</h1>
      <div className="p-4">
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {addresses.map((address: Address) => {
                return (
                  <div
                    key={address.id}
                    className={
                      "rounded border-gray-500 border" +
                      (userLocation?.pincode === Number(address.postalCode)
                        ? " bg-slate-200"
                        : "")
                    }
                    onClick={() => handleUpdateLocation(address)}
                  >
                    <h1>{address.recipientName}</h1>
                    <p>
                      {address.street +
                        " " +
                        address.city +
                        " " +
                        address.country +
                        " " +
                        address.postalCode +
                        " " +
                        address.state}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          <Link to="/user/address" className="underline text-teal-400">
            add address or a pick-up location
          </Link>
        </div>
        <div className="flex space-x-1">
          <input
            type="number"
            placeholder="Enter your postalcode"
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
