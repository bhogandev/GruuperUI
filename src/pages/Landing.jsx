import React, { useState } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import '../css/Landing.css';
import gruuperLogo from '../assets/imgs/GruuperFull.png';

const Landing = (props) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const history = useHistory();

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="landing-container">
      <Row className="landing-content">
        <Col md={6} className="landing-form">
          <div className="landing-form-header">
            <img src={gruuperLogo} alt="logo" height="50px" className="landing-logo" />
            <h1>{showLoginForm ? 'Welcome Back!' : 'Get Started'}</h1>
          </div>
          <Container>
            {showLoginForm ? (
              <LoginForm history={history} />
            ) : (
              <SignUpForm history={history} />
            )}
            <div className="landing-form-toggle">
              <Button variant="link" onClick={toggleForm}>
                {showLoginForm
                  ? "Don't have an account? Sign up now!"
                  : 'Already have an account? Log in here.'}
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
      <footer className="landing-footer">
        <p>&copy; {currentYear} Gruuper. All rights reserved. Powered By Hogan Way Technologies</p>
      </footer>
    </div>
  );
};

export default Landing;
