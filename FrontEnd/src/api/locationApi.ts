export type Address = {
  city: string;
  country: string;
  id: string;
  postalCode: string;
  recipientName: string;
  state: string;
  street: string;
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
export const getAllLocationswithID = async (id: string) => {
  console.log("called ");
  const response = await fetch(`http://localhost:8080/api/address/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Locations not found");
  }
  const data = await response.json();
  return data;
};
