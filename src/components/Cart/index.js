import { useContext } from "react";
import { Cartcontext } from "../../context/Context";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

const Cart = () => {
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;
  const dispatch = Globalstate.dispatch;

  const total = state.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <Container>
        <Row>
          <Col lg={12}>
            {state.length === 0 ? (
              <div className="text-center pt-3">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  className="cart-empty-img"
                  alt="cart empty"
                />
                <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

                <Link to="/">
                  <button type="button" className="cart-button-now">
                    Shop Now
                  </button>
                </Link>
              </div>
            ) : (
              state.map((each, index) => {
                return (
                  <ul key={index} className="list-style pt-3">
                    <li>
                      <Card className="cart-card-background">
                        <Row>
                          <Col lg={4} md={6} sm={6}>
                            <div className="image-sm">
                              <Card.Img
                                variant="top"
                                src={each.imageURL}
                                className="cart-image"
                                alt="cart-image"
                              />
                            </div>
                          </Col>
                          <Col lg={4} md={1} sm={1}></Col>
                          <Col lg={4} md={5} sm={5}>
                            <Card.Body>
                              <Card.Title className="text-info">
                                <b>{each.name}</b>
                              </Card.Title>
                              <Card.Text style={{ color: "red" }}>
                                <b>Rs.{each.quantity * each.price}</b>
                              </Card.Text>

                              <div className="quantity ">
                                <button
                                  className="cart-button-plus-minus"
                                  onClick={() => {
                               
                                    dispatch({
                                      type: "INCREASE",
                                      payload: each,
                                    });
                                  }}
                                >
                                  +
                                </button>
                                <p className=" p-1">
                                  <b>{each.quantity}</b>
                                </p>
                                <button
                                  className="cart-button-plus-minus"
                                  onClick={() => {
                                    if (each.quantity > 1) {
                                      dispatch({
                                        type: "DECREASE",
                                        payload: each,
                                      });
                                    } else {
                                      dispatch({
                                        type: "REMOVE",
                                        payload: each,
                                      });
                                    }
                                  }}
                                >
                                  -
                                </button>
                              </div>

                              <button
                                style={{
                                  backgroundColor: "red",
                                  border: "1px solid red",
                                  borderRadius: "10px",
                                }}
                                className="text-white"
                                onClick={() =>
                                  dispatch({ type: "REMOVE", payload: each })
                                }
                              >
                                <b> Remove</b>
                              </button>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    </li>
                  </ul>
                );
              })
            )}
          </Col>
          <Col lg={12}>
            <Row>
              <Col lg={8} md={7} sm={7} xs={1}></Col>
              <Col lg={4} md={5} sm={5} xs={11}>
                {state.length > 0 && (
                  <>
                    <h2 className="text-success">Total : {total}</h2>
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
