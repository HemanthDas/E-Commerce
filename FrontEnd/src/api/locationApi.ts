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
