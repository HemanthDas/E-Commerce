import { useNavigate } from "@tanstack/react-router";
import LocationInputModal from "./ModalComponents/LocationInputModal";

interface PopupModelProps {
  popType: string;
}

const PopupModel = ({ popType }: PopupModelProps) => {
  const navigate = useNavigate();
  const closePopModel = () => {
    navigate({ search: undefined });
  };
  function PopModel() {
    switch (popType) {
      case "location":
        return <LocationInputModal />;
    }
  }
  return (
    <div className="absolute w-full h-full bg-black bg-opacity-40 flex justify-center z-50">
      <div className="w-fit h-min my-16 shadow relative">
        <button
          onClick={closePopModel}
          className="absolute right-3 top-5 h-[15px] w-4 overflow-hidden"
        >
          <i
            style={{
              background: "url('/2KViI4b7ZZCNtr3.png')",
              backgroundSize: "512px 512px",
              backgroundPosition: "-243px -270px",
              backgroundRepeat: "no-repeat",
            }}
            className="px-[7px]"
          ></i>
        </button>
        <PopModel />
      </div>
    </div>
  );
};

export default PopupModel;
