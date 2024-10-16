import ProductsList from "./Components/MainPageComponents/ProductsList";
import Carousel from "./Components/MainPageComponents/Carousel";

function App() {
  return (
    <div className="h-full bg-white">
      <Carousel />
      <ProductsList />
    </div>
  );
}

export default App;
