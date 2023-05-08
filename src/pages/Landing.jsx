import React, { useState } from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ImageCarousel from '../components/ImageCarousel';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import '../css/Landing.css';

const Landing = (props) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const history = useHistory();

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="landing-container">
      <div className="landing-header">
        <img src="" alt="logo" height="50px" className="landing-logo" />
        <h3 className="landing-title">Gruuper</h3>
      </div>
      <Row className="landing-content">
        <Col md={6} className="landing-carousel d-none d-md-block">
          <ImageCarousel />
        </Col>
        <Col md={6} className="landing-form">
          <div className="landing-form-header">
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
    </div>
  );
};

export default Landing;
