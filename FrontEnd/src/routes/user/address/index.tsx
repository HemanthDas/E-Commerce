import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useAuth } from "../../../hooks/useAuth";
import {
  Address as AddressType,
  getAllLocationswithID,
  removeLocation,
} from "../../../api/locationApi";

const Address = () => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient(); // Initialize queryClient
  const { data, isLoading, error } = useQuery({
    queryKey: ["location", currentUser?.id],
    queryFn: () => {
      if (!currentUser) {
        return Promise.reject("User not logged in");
      }
      return getAllLocationswithID(currentUser.id);
    },
    enabled: !!currentUser,
  });

  const removeAddress = (addressId: string) => {
    if (currentUser) {
      return removeLocation(currentUser.id, addressId);
    } else {
      return Promise.reject("User not logged in");
    }
  };

  const { mutate: removalMutate } = useMutation({
    mutationFn: removeAddress,
    onError: (error) => {
      alert(`Error removing address: ${error}`);
    },
    onSuccess: () => {
      alert("Address removed successfully");
      queryClient.invalidateQueries({
        queryKey: ["location", currentUser!.id],
      });
    },
  });

  if (!currentUser) {
    return <p>User not logged in</p>;
  }

  const handleRemove = (addressId: string) => {
    removalMutate(addressId);
  };

  return (
    <div className="bg-white w-full h-full flex flex-col items-center">
      <nav className="text-sm w-[60%] my-4">
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
      </nav>
      <div className="w-[60%]">
        <h1 className="text-3xl font-sans mb-6">Your Addresses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            to="/user/address/add-address"
            className="w-full p-4 border-2 border-dashed rounded-lg flex flex-col items-center"
          >
            <div
              style={{
                background: "url('/add.png')",
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
              className="w-12 h-12"
            ></div>
            <h1 className="font-bold text-2xl text-slate-600 mt-2">
              Add Address
            </h1>
          </Link>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">
              Error loading addresses:{" "}
              {error instanceof Error ? error.message : String(error)}
            </p>
          ) : data && data.length > 0 ? (
            data.map((address: AddressType) => (
              <div
                key={address.id}
                className="w-full p-4 border-2 rounded-lg flex flex-col items-start bg-gray-50 hover:bg-gray-100"
              >
                {address.default && (
                  <h4 className="text-sm text-white bg-green-500 px-2 py-1 rounded mb-2">
                    Default Address
                  </h4>
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{address.recipientName}</h2>
                  <p>{`${address.street}, ${address.city}`}</p>
                  <p>{`${address.state}, ${address.postalCode}`}</p>
                  <p>{address.phonenumber}</p>
                </div>
                <div className="text-purple-500 mt-2">
                  <Link to={`/user/address/${address.id}`}>Edit</Link> |{" "}
                  <button onClick={() => handleRemove(address.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No addresses found. Please add a new one.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const Route = createFileRoute("/user/address/")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      return redirect({ to: "/authentication/login" });
    }
  },
  component: Address,
});
