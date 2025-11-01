import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function NavigateBar() {
  return (
    <Navbar expand="lg" className="bg-navy shadow-lg m-1 rounded h-25">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-white fw-bold">
          <img
            src="./Pond.jpg"
            alt="Logo"
            style={{ width: "40px", height: "40px" }}
          />
          &nbsp; HONGSAWADEE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link as={Link} to="/appointment" className="text-white">
              ทำนัด
            </Nav.Link>
            <Nav.Link as={Link} to="/doctorsearch" className="text-white">
              ค้นหาเเพทย์
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="text-white">
              เข้าสู่ระบบ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigateBar;
