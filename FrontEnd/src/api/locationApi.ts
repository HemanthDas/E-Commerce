export type Address = {
  city: string;
  country: string;
  id: string;
  postalCode: string;
  recipientName: string;
  state: string;
  street: string;
  phonenumber: string;
  default: boolean;
};
export type AddAddressType = {
  recipientName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phonenumber: string;
  default: boolean;
};

export const getLocationWithPincode = async (pincode: number) => {
  const response = await fetch(
    `http://localhost:8080/api/getlocation?pincode=${pincode}`
  );
  if (!response.ok) {
    throw new Error("Location not found");
  }
  const data = await response.json();
  return data;
};
export const getLocationById = async (id: string) => {
  const response = await fetch(`http://localhost:8080/api/address/single/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Location not found");
  }
  const data = await response.json();
  return data;
};
export const getAllLocationswithID = async (id: string) => {
  const response = await fetch(`http://localhost:8080/api/address/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.status === 204) {
    return [];
  }
  if (!response.ok) {
    throw new Error("Locations not found");
  }
  const data = await response.json();
  return data;
};
export const addLocation = async (address: AddAddressType, id: string) => {
  const response = await fetch(`http://localhost:8080/api/address/${id}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(address),
  });
  if (!response.ok) {
    throw new Error("Location not added");
  }
  const data = await response.json();
  return data;
};

export const removeLocation = async (userId: string, addressId: string) => {
  const response = await fetch(
    `http://localhost:8080/api/address/${userId}/delete/${addressId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Location not removed");
  }

  return null;
};
export const updateLocation = async (
  userId: string,
  address: AddAddressType
) => {
  const response = await fetch(
    `http://localhost:8080/api/address/${userId}/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(address),
    }
  );
  if (response.status === 204) {
    throw new Error("Location not updated");
  }
  if (!response.ok) {
    throw new Error("Location not updated");
  }
  const data = await response.json();
  return data;
};
