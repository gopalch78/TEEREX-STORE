import "./App.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
// import NewProductFilter from "./components/newProductFilter";
import UseCaseLiveFilter from "./components/multifilter";
// import NewMultiProductFilter from "./components/newMultiFilter";
import Cart from "./components/Cart";

// import TeerexFilter from "./components/teerexFilter";

// import FilterItemsHooks from "./components/filterItemsHooks";
// import ProductFilter from "./components/newProductFilter";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<UseCaseLiveFilter />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* <FilterAndSearch /> */}
      {/* <TeerexFilter /> */}

      {/* <FilterItemsHooks /> */}

      {/* <ProductFilter /> */}
      {/* <NewProductFilter /> */}

      {/* <NewMultiProductFilter/> */}
    </div>
  );
}

export default App;
