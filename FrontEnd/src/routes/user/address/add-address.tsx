import { useState } from "react";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { addLocation } from "../../../api/locationApi";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";

const AddAddress = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const { mutate } = useMutation({
    mutationFn: () => addLocation(formData, currentUser?.id ?? ""),
    mutationKey: ["location"],
    onSuccess: () => {
      alert("Address added successfully");
      navigate({ to: "/user/address", replace: true });
    },
    onError: (error) => {
      alert(`Error adding address: ${error}`);
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

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
          to="/user/address/add-address"
          className="underline"
          activeProps={{
            style: {
              color: "purple",
            },
          }}
          activeOptions={{ exact: true }}
        >
          New Address
        </Link>
      </nav>

      <form onSubmit={handleSubmit} className="w-[40%] flex flex-col space-y-4">
        <h1 className="text-3xl font-sans">Add New Address</h1>

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
          Save Address
        </button>
      </form>
    </div>
  );
};
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
export const Route = createFileRoute("/user/address/add-address")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      return redirect({ to: "/authentication/login" });
    }
  },
  component: AddAddress,
});
