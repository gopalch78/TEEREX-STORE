import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
// import { BsSearch } from "react-icons/bs";
import "./index.css";
const url =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const NewProductFilter = () => {
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [query, setQuery] = useState([]);
  // const [colors, setColors] = useState("");
  // const [types, setTypes] = useState("");
  // const [genders, setGenders] = useState("");
  // const [prices, setPRices] = useState("");
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);


  const handleFilterColor = (color) => {
    if (!checked) {
      setfilteredData(
        data.filter((product) => product.color.toLowerCase() === color)
      );
      setChecked(true);
    } else {
      setData(data);
      setChecked(false);
    }
  };

  const handleFilterGender = (gender) => {
    if (!checked) {
      setfilteredData(
        data.filter((product) => product.gender.toLowerCase() === gender)
      );
      setChecked(true);
    } else {
      setData(data);
      setChecked(false);
    }
  };

  const handleFilterType = (type) => {
    if (!checked) {
      setfilteredData(
        data.filter((product) => product.type.toLowerCase() === type)
      );
      setChecked(true);
    } else {
      setData(data);
      setChecked(false);
    }
  };
  const handleFilterPriceRange = (price) => {
    if (!checked) {
      setfilteredData(data.filter((product) => product.price === price));

      setChecked(true);
    } else {
      setData(data);
      setChecked(false);
    }
  };

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
        <input
          type="search"
          placeholder="Search"
          value={query}
          onChange={filterBySearch}
          className="search-input form-control"
        />
      </div>

      <div className="filter-paper">
        <Container>
          <Row>
            <Col lg={12}>
              <Row>
                <Col lg={3}>
                  <div>
                    <h6 className="filter-heading">Color</h6>
                    <ul className="list-style">
                      <li>
                        <input
                          type="checkbox"
                          id="red"
                          className="search-box"
                          onChange={() => handleFilterColor("red")}
                        />
                        <label htmlFor="red" className="label-element">
                          Red
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="blue"
                          className="search-box"
                          onChange={() => handleFilterColor("blue")}
                        />
                        <label htmlFor="blue" className="label-element">
                          Blue
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="green"
                          className="search-box"
                          onChange={() => handleFilterColor("green")}
                        />
                        <label htmlFor="green" className="label-element">
                          Green
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="pink"
                          className="search-box"
                          onChange={() => handleFilterColor("pink")}
                        />
                        <label htmlFor="     pink" className="label-element">
                          Pink
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="grey"
                          className="search-box"
                          onChange={() => handleFilterColor("grey")}
                        />
                        <label htmlFor="     grey" className="label-element">
                          Grey
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="purple"
                          className="search-box"
                          onChange={() => handleFilterColor("purple")}
                        />
                        <label htmlFor="      purple" className="label-element">
                          Purple
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="black"
                          className="search-box"
                          onChange={() => handleFilterColor("black")}
                        />
                        <label htmlFor="black" className="label-element">
                          Black
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="white"
                          className="search-box"
                          onChange={() => handleFilterColor("white")}
                        />
                        <label htmlFor="white" className="label-element">
                          White
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="yellow"
                          className="search-box"
                          onChange={() => handleFilterColor("yellow")}
                        />

                        <label htmlFor="yellow" className="label-element">
                          Yellow
                        </label>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="filter-heading">Gender</h6>
                    <ul className="list-style">
                      <li>
                        <input
                          type="checkbox"
                          id="men"
                          className="search-box"
                          onChange={() => handleFilterGender("men")}
                        />
                        <label htmlFor="men" className="label-element">
                          Men
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="women"
                          className="search-box"
                          onChange={() => handleFilterGender("women")}
                        />
                        <label htmlFor="women" className="label-element">
                          Women
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="filter-heading">Type</h6>
                    <ul className="list-style">
                      <li>
                        <input
                          type="checkbox"
                          id="polo"
                          className="search-box"
                          onChange={() => handleFilterType("polo")}
                        />
                        <label htmlFor="Polo" className="label-element">
                          Polo
                        </label>
                      </li>{" "}
                      <li>
                        <input
                          type="checkbox"
                          id="hoodie"
                          className="search-box"
                          onChange={() => handleFilterType("hoodie")}
                        />
                        <label htmlFor="   hoodie" className="label-element">
                          Hoodie
                        </label>
                      </li>{" "}
                      <li>
                        <input
                          type="checkbox"
                          id="basic"
                          className="search-box"
                          onChange={() => handleFilterType("basic")}
                        />
                        <label htmlFor="basic" className="label-element">
                          Basic
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="filter-heading">Price</h6>
                    <ul className="list-style">
                      <li>
                        <input
                          type="checkbox"
                          id=" 250"
                          className="search-box"
                          onChange={() =>
                            handleFilterPriceRange(parseInt("250"))
                          }
                        />
                        <label htmlFor=" 250" className="label-element">
                          250
                        </label>
                      </li>

                      <li>
                        <input
                          type="checkbox"
                          id="300"
                          className="search-box"
                          onChange={() =>
                            handleFilterPriceRange(parseInt("300"))
                          }
                        />
                        <label htmlFor=" 300" className="label-element">
                          300
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="350"
                          className="search-box"
                          onChange={() =>
                            handleFilterPriceRange(parseInt("350"))
                          }
                        />
                        <label htmlFor="350" className="label-element">
                          350
                        </label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="500"
                          className="search-box"
                          onChange={() =>
                            handleFilterPriceRange(parseInt("500"))
                          }
                        />
                        <label htmlFor=" 500" className="label-element">
                          500
                        </label>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={9}>
                  <div className="wrap-container">
                    {checked ? (
                      filteredData.map((each) => (
                        <ul key={each.id} className="list-style">
                          <li>
                            <Card className="card-background">
                              <Card.Img variant="top" src={each.imageURL} />
                              <Card.Body>
                                <Card.Title>{each.name}</Card.Title>

                                <p>Price-{each.price}</p>
                                <p>Color-{each.color}</p>
                                <p>Gender-{each.gender}</p>
                                <p>Type-{each.type}</p>
                                <p>Quantity-{each.quantity}</p>
                                <div className="d-flex text-left">
                                  <button className="cart-button">
                                    Add to Cart
                                  </button>
                                </div>
                              </Card.Body>
                            </Card>
                          </li>
                        </ul>
                      ))
                    ) : searchData.length === 0 ? (
                      <div>
                        <h1>No Data Found</h1>
                        <p className="no-job-paragraph">
                          We could not find any Products. Try other filters.
                        </p>
                      </div>
                    ) : (
                      searchData.map((each) => (
                        <ul key={each.id} className="list-style">
                          <li>
                            <Card className="card-background">
                              <Card.Img variant="top" src={each.imageURL} />
                              <Card.Body>
                                <Card.Title>{each.name}</Card.Title>

                                <p>Price-{each.price}</p>
                                <p>Color-{each.color}</p>
                                <p>Gender-{each.gender}</p>
                                <p>Type-{each.type}</p>
                                <p>Quantity-{each.quantity}</p>
                                <div className="d-flex text-left">
                                  {each.quantity === 0 ? (
                                    <button className="cart-button bg-danger">
                                      Out of Stock
                                    </button>
                                  ) : (
                                    <button className="cart-button">
                                      Add to Cart
                                    </button>
                                  )}
                                </div>
                              </Card.Body>
                            </Card>
                          </li>
                        </ul>
                      ))
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default NewProductFilter;
