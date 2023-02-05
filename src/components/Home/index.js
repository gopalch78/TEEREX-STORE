import { useEffect, useState, useContext } from "react";
import "./index.css";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Cartcontext } from "../../context/Context";

export default function Home() {
  // State for Storing Data
  const [data, setData] = useState([]);

  // url  in json format
  const url =
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // states for filtered data, color,price,gender and type with  search query
  const [filteredList, setFilteredList] = useState(data);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [query, setQuery] = useState([]);

  const Globalstate = useContext(Cartcontext);
  const dispatch = Globalstate.dispatch;

  // Filter for Color

  const filterByColor = (filteredData) => {
    // Avoid filter for empty string
    if (!selectedColor) {
      return filteredData;
    }

    const filteredColors = filteredData.filter(
      (color) => color.color.split(" ").indexOf(selectedColor) !== -1
    );
    return filteredColors;
  };

  // Filter for Gender
  const filterByGender = (filteredData) => {
    // Avoid filter for empty string
    if (!selectedGender) {
      return filteredData;
    }

    const filteredGender = filteredData.filter(
      (gender) => gender.gender.split(" ").indexOf(selectedGender) !== -1
    );

    return filteredGender;
  };
  // Filter for Type
  const filterByType = (filteredData) => {
    // Avoid filter for empty string
    if (!selectedType) {
      return filteredData;
    }

    const filteredType = filteredData.filter(
      (type) => type.type.split(" ").indexOf(selectedType) !== -1
    );
    return filteredType;
  };
  // Filter for Prce
  const filterByPrice = (filteredData) => {
    // Avoid filter for null value
    if (!selectedPrice) {
      return filteredData;
    }

    const filteredPrice = filteredData.filter(
      (price) => price.price === selectedPrice
    );
    return filteredPrice;
  };

  // Handle Change for Color
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };
  // Handle Change for Gender
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
  // Handle Change for Type
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  // Handle Change for Price
  const handlePriceChange = (event) => {
    const inputYear = Number(event.target.id);

    if (inputYear === selectedPrice) {
      setSelectedPrice("");
    } else {
      setSelectedPrice(inputYear);
    }
  };

  // UseEffect for multiple filters
  useEffect(() => {
    var filteredData = filterByColor(data);
    filteredData = filterByPrice(filteredData);
    filteredData = filterByGender(filteredData);
    filteredData = filterByType(filteredData);
    setFilteredList(filteredData);
  }, [selectedColor, selectedPrice, selectedGender, selectedType, data]);

  // Search filter with input type= searchf
  const searchData = data.filter(
    (each) =>
      each.name.toLowerCase().includes(query) ||
      each.color.toLowerCase().includes(query) ||
      each.type.toLowerCase().includes(query)
  );

  const filterBySearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <div className="search-container">
        {/* INPUT */}
        <input
          type="search"
          placeholder="Search"
          value={query}
          onChange={filterBySearch}
          className="search-input form-control"
        />
      </div>
      <div className="filter-container">
        <Container>
          <Row>
            <Col lg={3} md={6} sm={6}>
              <div className="select-alignment">
                <h6 className="text-center pt-2 pb-2">Filter by Color </h6>
                {/* DropDown for Color */}
                <select
                  id="brand-input"
                  value={selectedColor}
                  onChange={handleColorChange}
                  className="form-control"
                >
                  <option value="">All</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="White">White</option>
                  <option value="Purple">Purple</option>
                  <option value="Grey">Grey</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Black">Black</option>
                  <option value="Pink">Pink</option>
                </select>
              </div>
            </Col>

            <Col lg={3} md={6} sm={6}>
              <div className="select-alignment">
                <h6 className="text-center pt-2 pb-2">Filter by Gender</h6>
                {/* DropDown for Gender */}
                <select
                  id="brand-input"
                  value={selectedGender}
                  onChange={handleGenderChange}
                  className="form-control"
                >
                  <option value="">All</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6}>
              <div className="select-alignment">
                <h6 className="text-center pt-2 pb-2">Filter by Type</h6>
                {/* DropDown for Type */}
                <select
                  id="brand-input"
                  value={selectedType}
                  onChange={handleTypeChange}
                  className="form-control"
                >
                  <option value="">All</option>
                  <option value="Polo">Polo</option>
                  <option value="Hoodie">Hoodie</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
            </Col>
            <Col lg={3} md={6} sm={6}>
              <h6 className="text-center pt-2 pb-2">Filter by Price</h6>
              {/* DropDown for Price */}
              <div
                className="d-flex justify-content-center"
                onClick={handlePriceChange}
              >
                <div
                  className={
                    selectedPrice === 250 ? "active-option" : "filter-option"
                  }
                  id="250"
                >
                  250
                </div>
                <div
                  className={
                    selectedPrice === 300 ? "active-option" : "filter-option"
                  }
                  id="300"
                >
                  300
                </div>
                <div
                  className={
                    selectedPrice === 350 ? "active-option" : "filter-option"
                  }
                  id="350"
                >
                  350
                </div>
                <div
                  className={
                    selectedPrice === 500 ? "active-option" : "filter-option"
                  }
                  id="500"
                >
                  500
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div id="cart-list">
        <Container>
          <Row>
            {selectedColor ||
            selectedGender ||
            selectedType ||
            selectedPrice ? (
              filteredList.length > 0 ? (
                filteredList.map((each, index) => (
                  <Col lg={3}>
                    <ul key={index} className="list-style">
                      <li>
                        <Card className="card-background">
                          <Card.Img variant="top" src={each.imageURL} />
                          <Card.Body>
                            <Card.Title>{each.name}</Card.Title>

                            <p>
                              {each.currency}-{each.price}
                            </p>
                            {/* <p>Color-{each.color}</p> */}
                            {/* <p>Gender-{each.gender}</p> */}
                            {/* <p>Type-{each.type}</p> */}
                            {/* <p>Quantity-{each.quantity}</p> */}
                            <div className="d-flex text-left">
                              {each.quantity === 0 ? (
                                <button className="cart-button bg-danger">
                                  Out of Stock
                                </button>
                              ) : (
                                <div className="quantity">
                                  <button
                                    className="cart-button"
                                    onClick={() =>
                                      dispatch({ type: "ADD", payload: each })
                                    }
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              )}
                            </div>
                          </Card.Body>
                        </Card>
                      </li>
                    </ul>
                  </Col>
                ))
              ) : (
                <div className=" text-center pt-4">
                  <img
                    src="https://res.cloudinary.com/nsp/image/upload/v1635664104/tastyKitchens/error_1x_csgpog.png"
                    alt="not found"
                  />

                  <p className="pt-3">
                    <b>No Products Found.Try Other Filters</b>
                  </p>
                </div>
              )
            ) : searchData.length === 0 ? (
              <div className=" text-center pt-4">
                <img
                  src="https://res.cloudinary.com/nsp/image/upload/v1635664104/tastyKitchens/error_1x_csgpog.png"
                  alt="not found"
                />
                <h1>No Products Found</h1>
                <p>
                  We could not find any Products for you and Try other filters.
                </p>
              </div>
            ) : (
              searchData.map((each, index) => (
                <Col lg={3} md={4} sm={6}>
                  <ul key={index} className="list-style">
                    <li>
                      <Card className="card-background">
                        <Card.Img variant="top" src={each.imageURL} />
                        <Card.Body>
                          <Card.Title>{each.name}</Card.Title>

                          <p>
                            {each.currency}-{each.price}
                          </p>
                          {/* <p>Color-{each.color}</p> */}
                          {/* <p>Gender-{each.gender}</p> */}
                          {/* <p>Type-{each.type}</p> */}
                          {/* <p>Quantity-{each.quantity}</p> */}
                          <div className="d-flex text-left">
                            {each.quantity === 0 ? (
                              <button className="cart-button bg-danger">
                                Out of Stock
                              </button>
                            ) : (
                              <div className="quantity">
                                <button
                                  className="cart-button"
                                  onClick={() =>
                                    dispatch({ type: "ADD", payload: each })
                                  }
                                >
                                  Add to Cart
                                </button>
                              </div>
                            )}
                          </div>
                        </Card.Body>
                      </Card>
                    </li>
                  </ul>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}
