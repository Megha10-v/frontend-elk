import React from 'react';
import { Navbar, Nav, Image, Container, Button, NavDropdown } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../store/slices/authSlice';
import { useCookies } from 'react-cookie';

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['elk_authorization_token']);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const location = useLocation();

  const handleLogout = () => {
    removeCookie('elk_authorization_token');
    dispatch(clearUser());
    navigate('/');
  };
  
return (
    <>
    <Navbar expand="lg">
      <Container className="pt-2 pb-2">
        <Navbar.Brand href="/" className="align-items-center">
          <Image src={logo} thumbnail style={{ width: '200px', height: '120px', border: 'none' }} />
        </Navbar.Brand>

         <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" style={{ zIndex: '1000' }}> 
          <Nav className="ms-auto">
            
          {isAuthenticated ? (
            location.pathname !== '/post-ad' && (
              <Button
                  className="ms-4 d-flex align-items-center mx-3"
                  style={{ gap: '10px', borderRadius: '15px', backgroundColor: '#4FBBB4', borderColor: '#4FBBB4' }}
                  onClick={() => navigate('/post-ad')}
              >
                  <i className="bi bi-plus-circle"></i> Place Your Ad
        </Button>
    )
) : (
    <Button
        className="ms-4 d-flex align-items-center mx-3"
        style={{ gap: '10px', borderRadius: '15px', backgroundColor: '#4FBBB4', borderColor: '#4FBBB4' }}
        onClick={() => navigate('/login')}
    >
        <i className="bi bi-plus-circle"></i> Place Your Ad
    </Button>
)}


            {/* <Form className="d-flex ms-5" inline onSubmit={(e) => e.preventDefault()}>
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
              {/* <Button type="submit" variant="outline-light">Search</Button> */}
            {/* </Form>  */} 

            {isAuthenticated ? (
                            <NavDropdown title={user?.name || "My Account"} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/wishlist">Wishlist</NavDropdown.Item>
                                <NavDropdown.Item href="/chat">Chat</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Button style={{ all: "unset" }} onClick={() => navigate('/login')}>
                                <strong>Login or Sign Up</strong>
                            </Button>
                        )}
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
      </>
  );
}

export default Header;
