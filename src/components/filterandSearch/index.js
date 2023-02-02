import { Component } from "react";
import "./index.css";

import { TailSpin } from "react-loader-spinner";

import FilterAndSearchItems from "../../components/filterandSearchItems";
import Items from "../Items";
import { Container, Row, Col } from "react-bootstrap";
const teerexStoreApiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

const colorTypesList = [
  {
    label: "Red",
    colorValueId: "Red",
  },
  {
    label: "Green",
    colorValueId: "Green",
  },
  {
    label: "Blue",
    colorValueId: "Blue",
  },
  {
    label: "Pink",
    colorValueId: "Pink",
  },
  {
    label: "Grey",
    colorValueId: "Grey",
  },
  {
    label: "Purple",
    colorValueId: "Purple",
  },
  {
    label: "Black",
    colorValueId: "Black",
  },
  {
    label: "White",
    colorValueId: "White",
  },
  {
    label: "Yellow",
    colorValueId: "Yellow",
  },
];

// const genderRangesList = [
//   {
//     label: "Men",
//   },
//   {
//     label: "Women",
//   },
// ];

// const priceRangesList = [
//   {
//     label: "0-Rs250",
//   },
//   {
//     label: "Rs251-Rs450",
//   },
//   {
//     label: "Rs 450",
//   },
// ];

// const typeList = [
//   {
//     label: "Polo",
//   },
//   {
//     label: "Hoodie",
//   },
//   {
//     label: "Basic",
//   },
// ];

class FilterAndSearch extends Component {
  state = {
    productsList: [],
    teerexStoreApiStatus: teerexStoreApiStatusConstants.initial,
    // searchInput: [],
    colorType:'',
    // priceValue: "",
    // typeValue: "",
    // genderValue: "",

  };

  componentDidMount() {
    this.getTeerexStoreProductsData();
  }

  getTeerexStoreProductsData = async () => {
    this.setState({ apiStatus: teerexStoreApiStatusConstants.inProgress });
    const { colorType } = this.state;
    //  priceValue, typeValue, genderValue
    const url = `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json?color=${colorType}`; 
 
    // const { colorValueId, priceValue, typeValue, genderValue } = this.state;
    // &gender=${genderValue}&price=${priceValue}&type=${typeValue}
    const options = {
      method: "GET",
    };

    const response = await fetch(url, options);
    if (response.ok === true) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.map((each) => ({
        colorType: each.color,
        currency: each.currency,
        gender: each.gender,
        id: each.id,
        imageUrl: each.imageURL,
        name: each.name,
        price: each.price,
        quantity: each.quantity,
        type: each.type,
      }));
      this.setState({
        productsList: updatedData,
        teerexStoreApiStatus: teerexStoreApiStatusConstants.success,
      }); 

     
    } else {
      this.setState({
        teerexStoreApiStatus: teerexStoreApiStatusConstants.failure,
      });
    }
  }; 


  
  filterColorValues=colorValueId=> {
    this.setState({colorType:colorValueId}, this.getTeerexStoreProductsData)
  }



    // const searchResults = productsList.filter(
    //   (each) =>
    //     each.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    //     each.color.toLowerCase().includes(searchInput.toLowerCase()) ||
    //     each.type.toLowerCase().includes(searchInput.toLowerCase()) ||
    //     each.gender.toLowerCase().includes(searchInput.toLowerCase())
    // );

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
    const { productsList } = this.state;

    return (
      <div>
        <Container>
          <Row>
            {productsList.map((eachItem) => (
              <Items key={eachItem.id} itemDetails={eachItem} />
            ))}
          </Row>
        </Container>
      </div>
    );
  };

  renderProductDetails = () => {
    const { teerexStoreApiStatus } = this.state;
    switch (teerexStoreApiStatus) {
      case teerexStoreApiStatusConstants.inProgress:
        return this.renderLoadingView();
      case teerexStoreApiStatusConstants.success:
        return this.renderProductsList();
      case teerexStoreApiStatusConstants.failure:
        return this.renderProductFailureView();
      default:
        return null;
    }
  };



  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col lg={3} md={4}>
              <FilterAndSearchItems
                colorTypesList={colorTypesList}
                // genderRangesList={genderRangesList}
                // typeList={typeList}
                // priceRangesList={priceRangesList}
                filterColorValues={this.filterColorValues}
                // filterGenderValues={this.filterGenderValues}
                // filterTypeValues={this.filterTypeValues}
                // filterPriceValues={this.filterPriceValues}
              />

              {/* <div>
                <h1 className="common-heading">Color</h1>
                <ul className="unOrder-list-container">
                  {colorTypesList.map((eachItem) => (
                    <li className="list-elements" key={eachItem.colorTypeId}>
                      <input
                        type="checkbox"
                   
                        value={eachItem.value}
                      />
                      <label>{eachItem.label}</label>
                    </li>
                  ))}
                </ul>
                <hr className="hr-line" />
                <h1 className="common-heading">Gender</h1>
                <ul className="unOrder-list-container">
                  {genderRangesList.map((eachItem) => (
                    <li className="list-elements" key={eachItem.genderId}>
                      <input type="checkbox" id={eachItem.genderId} />
                      <label>{eachItem.label}</label>
                    </li>
                  ))}
                </ul>
                <hr className="hr-line" />

                <h1 className="common-heading">Price</h1>
                <ul className="unOrder-list-container">
                  {priceRangesList.map((eachItem) => (
                    <li className="list-elements" key={eachItem.priceRangeId}>
                      <input type="radio" name="option" />
                      <label>{eachItem.label}</label>
                    </li>
                  ))}
                </ul>
                <hr className="hr-line" />

                <h1 className="common-heading">Type</h1>
                <ul className="unOrder-list-container">
                  {typeList.map((eachItem) => (
                    <li className="list-elements" key={eachItem.typeRangeId}>
                      <input type="checkbox" />
                      <label>{eachItem.label}</label>
                    </li>
                  ))}
                </ul>
              </div> */}
            </Col>
            <Col lg={9} md={8}>
              {this.renderProductDetails()}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default FilterAndSearch;
