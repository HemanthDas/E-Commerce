import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  Link,
  createFileRoute,
} from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Address, updateLocation } from "../../../api/locationApi";
import { useAuth } from "../../../hooks/useAuth";
import { getLocationById } from "../../../api/locationApi"; // Assuming this exists for fetching the address data

const EditAddress = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { address } = useParams({ from: "/user/address/$address" });

  const [formData, setFormData] = useState({
    street: "",
    phonenumber: "",
    recipientName: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    default: false,
  });

  const { isLoading, isSuccess, error, data } = useQuery<Address>({
    queryKey: ["location", address],
    queryFn: () => getLocationById(address),
    enabled: !!currentUser?.id,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setFormData(data);
    }
  }, [isSuccess, data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: () => updateLocation(currentUser?.id ?? "", formData),
    onSuccess: () => {
      alert("Address updated successfully");
      navigate({ to: "/user/address", replace: true });
    },
    onError: (error) => {
      alert(`Error updating address: ${error}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full h-full bg-white flex flex-col items-center">
      <nav className="text-sm w-[60%] my-6">
        <Link to="/user/profile" className="underline">
          Your account
        </Link>
        &gt;
        <Link
          to="/user/address"
          className="underline"
          activeProps={{
            style: {
              color: "purple",
            },
          }}
          activeOptions={{ exact: true }}
        >
          Your Address
        </Link>
        &gt;
        <Link
          to={`/user/address/edit-address/${address}`}
          className="underline"
          activeProps={{
            style: {
              color: "purple",
            },
          }}
          activeOptions={{ exact: true }}
        >
          Edit Address
        </Link>
      </nav>

      <form onSubmit={handleSubmit} className="w-[40%] flex flex-col space-y-4">
        <h1 className="text-3xl font-sans">Edit Address</h1>

        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleInputChange}
          placeholder="Recipient Name"
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          placeholder="Street"
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          placeholder="State"
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleInputChange}
          placeholder="Postal Code"
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="Country"
          className="border p-2 rounded w-full"
          required
        />

        <input
          type="number"
          name="phonenumber"
          value={formData.phonenumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
          className="border p-2 rounded w-full"
          required
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="default"
            checked={formData.default}
            onChange={handleInputChange}
          />
          <span>Set as default address</span>
        </label>

        <button
          type="submit"
          className="bg-purple-500 text-white py-2 px-4 rounded"
        >
          Update Address
        </button>
      </form>
    </div>
  );
};

export const Route = createFileRoute("/user/address/$address")({
  component: EditAddress,
});
