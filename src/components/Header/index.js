import React from "react";
import "./index.css";
import { Container, Navbar } from "react-bootstrap";

import { useContext } from "react";
import { Cartcontext } from "../../context/Context";
import { NavLink } from "react-router-dom";
const Header = () => {
  const Globalstate = useContext(Cartcontext);
  const state = Globalstate.state;

  return (
    <div className="header">
      <Navbar>
        <Container>
          <Navbar.Brand href="/" className="text-white">
            <b>TreeRex Store </b>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <div className="d-flex">
              <Navbar.Text className="p-2 text-white">
                <NavLink to="/">
                  {" "}
                  <b>Products</b>
                </NavLink>
              </Navbar.Text>
              <Navbar.Text className="text-white">
                <NavLink to="/cart">
                  {" "}
                  <b>Cart</b>{" "}
                  <span className="text-danger">({state.length}) </span>{" "}
                </NavLink>
              </Navbar.Text>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
