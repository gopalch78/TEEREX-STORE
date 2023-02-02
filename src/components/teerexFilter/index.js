import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { TailSpin } from "react-loader-spinner";
import "./index.css";
const url =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const teerexStoreApiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};
class TeerexFilter extends Component {
  state = {
    data: [],
    filteredData: [],
    colors: [
      "red",
      "blue",
      "green",
      "pink",
      "grey",
      "purple",
      "black",
      "white",
      "yellow",
    ],
    genders: ["men", "women"],
    types: ["Polo", "Hoodie", "Basic"],
    priceRange: [
      { label: "0-250", start: 0, end: 251 },
      { label: "251-450", start: 251, end: 450 },
      { label: "450", start: 450, end: 10000 },
    ],
    searchInput: [],
    teerexStoreApiStatus: teerexStoreApiStatusConstants.initial,
    checked: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ apiStatus: teerexStoreApiStatusConstants.inProgress });
    const response = await fetch(url);
    if (response.ok === true) {
      const data = await response.json();
      this.setState({
        data,

        teerexStoreApiStatus: teerexStoreApiStatusConstants.success,
      });
    } else {
      this.setState({
        teerexStoreApiStatus: teerexStoreApiStatusConstants.failure,
      });
    }
  };

  // handleFilter = (value, type) => {
  //   this.setState((prevState) => ({
  //     filteredData: prevState.data.filter(
  //       (product) =>
  //         product[type].toLowerCase() === value.toLowerCase() ||
  //         (Array.isArray(product[type]) &&
  //           product[type]
  //             .map((t) => t.toLowerCase())
  //             .includes(value.toLowerCase()))
  //     ),
  //   }));
  // };

  handleCheckbox = (event) => {
    const { type, value } = event.target.dataset;
    if (event.target.checked) {
      this.setState((prevState) => ({
        filteredData: [
          ...prevState.filteredData,
          ...prevState.data.filter(
            (product) =>
              product[type].toLowerCase() === value.toLowerCase() ||
              (Array.isArray(product[type]) &&
                product[type]
                  .map((t) => t.toLowerCase())
                  .includes(value.toLowerCase()))
          ),
        ],
      }));
    } else {
      this.setState((prevState) => ({
        filteredData: prevState.filteredData.filter(
          (product) =>
            product[type].toLowerCase() !== value.toLowerCase() &&
            (!Array.isArray(product[type]) ||
              !product[type]
                .map((t) => t.toLowerCase())
                .includes(value.toLowerCase()))
        ),
      }));
    }
  };










  handleCheckboxPrice = (event) => {
    const { start, end } = JSON.parse(event.target.dataset.value);
    if (event.target.checked) {
      this.setState((prevState) => ({
        filteredData: [
          ...prevState.filteredData,
          ...prevState.data.filter(
            (product) => product.price >= start && product.price < end
          ),
        ],
      }));
    } else {
      this.setState((prevState) => ({
        filteredData: prevState.filteredData.filter(
          (product) => !(product.price >= start && product.price < end)
        ),
      }));
    }
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  renderLoadingView = () => (
    <div className="loader-container d-flex justify-content-center">
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );

  renderNoProductView = () => (
    <div className="no-jobs-container">
      <h1 className="no-job-heading">No Products Found</h1>
      <p className="no-job-paragraph">
        We could not find any Products. Try other filters.
      </p>
    </div>
  );

  renderProductFailureView = () => (
    <div>
      <h1 className="failure-heading">Oops! Something Went Wrong </h1>
      <p className="failure-paragraph">
        we cannot seem to find the page you are looking for
      </p>

      <button type="button" onClick={this.onRetryProductList}>
        Retry
      </button>
    </div>
  );

  renderProductsList = () => {
    return (
      <div>
        <ul className="list-style ">
          {this.state.data.map((product) => (
            <li key={product.id}>
              <Card className="card-background">
                <Card.Img variant="top" src={product.imageURL} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <h6>
                    <b>
                      Price-{product.price}({product.currency})
                    </b>
                  </h6>

                  <p>
                    <b>Color-{product.color}</b>
                  </p>
                  <p>
                    <b>Gender-{product.gender}</b>
                  </p>
                  <p>
                    <b>Type-{product.type}</b>
                  </p>
                  <p>
                    <b>Quantity -{product.quantity}</b>
                  </p>
                  <div className="d-flex text-left">
                    <button className="cart-button">Add to Cart</button>
                  </div>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  renderFilterProductsList = () => {
    return (
      <div >
        <ul className="list-style wrap-container ">
          {this.state.filteredData.map((product) => (
            <li key={product.id}>
              <Card className="card-background">
                <Card.Img variant="top" src={product.imageURL} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <h6>
                    <b>
                      Price-{product.price}({product.currency})
                    </b>
                  </h6>

                  <p>
                    <b>Color-{product.color}</b>
                  </p>
                  <p>
                    <b>Gender-{product.gender}</b>
                  </p>
                  <p>
                    <b>Type-{product.type}</b>
                  </p>
                  <p>
                    <b>Quantity -{product.quantity}</b>
                  </p>
                  <div className="d-flex text-left">
                    <button className="cart-button">Add to Cart</button>
                  </div>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  renderProductDetails = () => {
    const { teerexStoreApiStatus, checked } = this.state;
    switch (teerexStoreApiStatus) {
      case teerexStoreApiStatusConstants.inProgress:
        return this.renderLoadingView();
      case teerexStoreApiStatusConstants.success:
        if (!checked) return this.renderFilterProductsList();
        return this.renderProductsList();
      case teerexStoreApiStatusConstants.failure:
        return this.renderProductFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <div className="search-container">
          <input
            type="search"
            className="search-input"
            placeholder="Search"
            value={this.state.searchInput}
            onChange={this.onChangeSearchInput}
          />
        </div>
        <Container>
          <Row>
            <Col lg={12}>
              <Row>
                <Col lg={3}>
                  <div>
                    <div>
                      <h3>Color</h3>
                      {this.state.colors.map((color) => (
                        <div key={color}>
                          <input
                            type="checkbox"
                            data-type="color"
                            data-value={color}
                            onChange={this.handleCheckbox}
                          />
                          {color}
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3>Price Range</h3>
                      {this.state.priceRange.map((priceRange) => (
                        <div key={priceRange.label}>
                          <input
                            type="checkbox"
                            data-value={JSON.stringify(priceRange)}
                            onChange={this.handleCheckboxPrice}
                          />
                          {priceRange.label}
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3>Gender</h3>
                      {this.state.genders.map((gender) => (
                        <div key={gender}>
                          <input
                            type="checkbox"
                            data-type="gender"
                            data-value={gender}
                            onChange={this.handleCheckbox}
                          />
                          {gender}
                        </div>
                      ))}
                    </div>
                    <div>
                      <h3>Type</h3>
                      {this.state.types.map((type) => (
                        <div key={type}>
                          <input
                            type="checkbox"
                            data-type="type"
                            data-value={type}
                            onChange={this.handleCheckbox}
                          />
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col lg={9}>{this.renderProductDetails()}</Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default TeerexFilter;
