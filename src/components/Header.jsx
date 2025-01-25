import React from 'react';
import { useState } from 'react';
import { Navbar, Nav, Image, Container, NavDropdown, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css'
import Rental from './Rental';
import Service from './Service';

function Header({ activeTab, setActiveTab }) {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'rentals':
        return <Rental />;
      case 'services':
        return <Service />;
      case 'my business':
        return (
          <div>
            <h3>Jobs</h3>
            <p>Tab content for Jobs</p>
          </div>
        );
      default:
        return null;
    }

  };

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogin = () => {
    // Simulate login, ideally this would be set after successful API call for authentication
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logout logic
    setIsLoggedIn(false);
  };


  return (
    <>
    <Navbar expand="lg">
      <Container className="pt-2 pb-2">
        <Navbar.Brand href="/" className="align-items-center">
          <Image src={logo} thumbnail style={{ width: '200px', height: '80px', border: 'none' }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" style={{ zIndex: '1000' }}>
          <Nav className="ms-auto">
            {/* Custom Nav for Tab-Like Selection */}
            <Nav className="custom-tabs mx-auto ">
              {[ 'rentals', 'services', 'my business'].map((tab) => (
                <Link
                  key={tab}
                  to={`/${tab.replace(' ', '-')}`}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-item ${activeTab === tab ? 'active-tab' : ''}`}
                  style={{
                    margin: '0 15px',
                    paddingBottom: '5px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    position: 'relative',
                    textDecoration: 'none'
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}

                </Link>
              ))}
            </Nav>
            

            <Button
              href="#elk"
              className="ms-5 d-flex align-items-center"
              style={{ gap: '5px', borderRadius: '15px', backgroundColor: '#4FBBB4', borderColor: '#4FBBB4' }}
            >
              <i className="bi bi-plus-circle"></i> Place Your Ad
            </Button>

            <Form className="d-flex ms-5" inline onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                style={{ borderRadius: '15px', backgroundColor: '#FDD77F', borderColor: '#FDD77F' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    alert('Search submitted for: ' + e.target.value);
                  }
                }}
              />
              <Button type="submit" variant="outline-light">Search</Button>
            </Form>
            <NavDropdown
                title={<span><i className="bi bi-person-fill"></i> Account</span>}
                id="account-dropdown"
                className="ms-5"
                aria-label="Account Menu"
              >
                {!isLoggedIn ? (
                  <NavDropdown.Item onClick={handleLogin}>
                    Login
                  </NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item href="#edit-profile">Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#wishlist">Wishlist</NavDropdown.Item>
                    <NavDropdown.Item href="#orders">Chat</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="tab-content">
    {renderTabContent()}
      </div>
      </>
  );
}

export default Header;
