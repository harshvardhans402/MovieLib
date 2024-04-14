import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Favicon from '../../favicon.png'


export default function Layout() {

  const user = useSelector((state) => state.user.value);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <img
          src={Favicon} // Set the source of your logo
          alt="DiscForum Logo" // Provide an alt text for accessibility
          height={70}
          width={150}// Adjust the height of your logo as needed
          className="d-inline-block "
         // style={margin = '0'} // Apply Bootstrap classes for proper alignment
        />
        <Container>

          <Navbar.Brand as={Link} to="/" >

            {' '}
            DiscForum</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to='/create-forum'>Create a new forum</Nav.Link>
              <Nav.Link as={Link} to="/forums">Forums</Nav.Link>
              {user.isLoggedIn ?
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link> :
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />

    </div>
  );
}