import { useState } from "react";

const LocationInputModal = () => {
  const [pincode, setPincode] = useState<number>(5000001);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 6) return;
    setPincode(parseInt(e.target.value));
  };
  return (
    <div className="w-96 max-sm:w-72 h-full bg-white rounded-lg ">
      <h1 className="p-4 bg-slate-400">Choose a location</h1>
      <div className="p-4">
        <div className="flex space-x-1">
          <input
            type="number"
            placeholder="Enter your pincode"
            className="w-full p-2 flex-grow border-2 border-slate-200 rounded-3xl"
            onChange={handleChange}
            value={pincode}
          />
          <button className="w-full p-2  flex-1 border-2 border-slate-200 rounded-3xl">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationInputModal;
