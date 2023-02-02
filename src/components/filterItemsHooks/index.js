import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./index.css";
const FilterItemsHooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((response) => {
        setData(response.data);
      });
  }, []);

  const colors = [
    {
      id: 1,
      label: "Red",
    },
    {
      id: 2,
      label: "Blue",
    },
    {
      id: 3,
      label: "Green",
    },
    {
      id: 4,
      label: "Pink",
    },
    {
      id: 5,
      label: "Grey",
    },
    {
      id: 6,
      label: "Purple",
    },
    {
      id: 7,
      label: "Black",
    },
    {
      id: 8,
      label: "Yellow",
    },
  ];
  const genders = [
    {
      id: 1,
      label: "Men",
    },
    {
      id: 2,
      label: "Women",
    },
  ];
  const types = [
    {
      id: 1,
      label: "Polo",
    },
    {
      id: 2,
      label: "Hoodie",
    },
    {
      id: 3,
      label: "Basic",
    },
  ];
  const priceRange = [
    { label: "0-250", start: 0, end: 251 },
    { label: "251-450", start: 251, end: 450 },
    { label: "450", start: 450, end: 10000 },
  ];
  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          // value={searchText}
          // onChange={handleSearch}
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
                    {colors.map((each) => (
                      <li key={each.id} className="list-style ">
                        <input
                          id="color"
                          // onChange={selectHandler}
                          type="checkbox"
                          value={each}
                          className="search-box"
                        />
                        <label htmlFor="color" className="label-element">
                          {each.label}
                        </label>
                      </li>
                    ))}
                  </div>
                  <div>
                    <h6 className="filter-heading">Gender</h6>

                    {genders.map((each) => (
                      <li key={each.id} className="list-style ">
                        <input
                          id="color"
                          // onChange={handleFilter}
                          type="checkbox"
                          value={each}
                        />
                        <label htmlFor="color" className="label-element">
                          {each.label}
                        </label>
                      </li>
                    ))}
                  </div>
                  <div>
                    <h6 className="filter-heading">Type</h6>

                    {types.map((each) => (
                      <li key={each.id} className="list-style ">
                        <input
                          id="color"
                          // onChange={handleFilter}
                          type="checkbox"
                          value={each}
                        />
                        <label htmlFor="color" className="label-element">
                          {each.label}
                        </label>
                      </li>
                    ))}
                  </div>
                  <div>
                    <h6 className="filter-heading">Price</h6>
                    {priceRange.map((each) => (
                      <li key={each.id} className="list-style ">
                        <input
                          id="color"
                          // onChange={handleFilter}
                          type="checkbox"
                          value={each}
                        />
                        <label htmlFor="color" className="label-element">
                          {each.label}
                        </label>
                      </li>
                    ))}
                  </div>
                </Col>
                <Col lg={9}>
                  {" "}
                  <div className="wrap-container">
                    {data.map((each) => (
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
                    ))}
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
export default FilterItemsHooks;
