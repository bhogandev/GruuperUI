import React from "react";
import NavMenu from "../components/NavMenu";
import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Landing = (props) => {
  return (
    <div>
      <NavMenu brandText={"Gruuper"} />
      <Container>
        <Row>
          <Col>
            <div id="lan-header" className="text-center mt-4 mb-4">
              <h1 className="display-4">Gruuper. <br /> Who's in your group?</h1>
              <Button tag={Link} to={{ pathname: "/login", state: { toLogin: true } }} onClick={() => console.log("Log in")} color="primary">Log In</Button>
              <Button tag={Link} to={{ pathname: "/login", state: { toLogin: false } }} onClick={() => console.log("Sign Up")} color="secondary" className="ml-2">Sign Up</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="lan-about" className="mt-4 mb-4">
              <h2>About</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error harum, ab consectetur corrupti vel ut exercitationem nemo quis, quibusdam similique quidem explicabo cum laborum qui impedit in possimus? Accusantium, sunt!</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="lan-features" className="mt-4 mb-4">
              <h2>Features (Why Gruuper?)</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, dolorem quisquam aspernatur id ipsam consectetur dolore, reprehenderit repellat natus quod suscipit. Qui dicta quo tempore laborum rerum sapiente, voluptatum ipsa!</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="lan-footer" className="mt-4 mb-4">
              <p>&copy; {new Date().getFullYear()} Gruuper</p>
              <ul className="list-inline">
                <li className="list-inline-item"><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li className="list-inline-item"><Link to="/terms-of-service">Terms of Service</Link></li>
                <li className="list-inline-item"><Link to="/contact-us">Contact Us</Link></li>
              </ul>
              <p>Follow us: 
                <a href="https://twitter.com/gruuper" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://facebook.com/gruuper" target="_blank" rel="noopener noreferrer">Facebook</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Landing;
