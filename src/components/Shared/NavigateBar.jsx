import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import React from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useData } from "../../Context/DataContext";
import { FaSearch } from "react-icons/fa";
const NavigateBar = () => {
  const { isAuthenticated } = useData();
  const token = localStorage.getItem("token");

  return (
    <Navbar expand="lg" className="bg-navy shadow-sm m-2 rounded">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-white fw-bold d-flex align-items-center"
        >
          <img
            src="/Hospital-Logo/Pond.jpg"
            alt="Logo"
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: 6,
            }}
            className="me-2"
          />
          <span className="fs-5">HealthQ</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={NavLink} to="/" className="text-white">
              หน้าหลัก
            </Nav.Link>
            <Nav.Link as={NavLink} to="/doctorsearch" className="text-white">
              ค้นหาแพทย์
            </Nav.Link>
            <Nav.Link as={NavLink} to="/appointment" className="text-white">
              ทำนัดหมาย
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto align-items-center">
            {!token ? (
              <>
                <Nav.Link as={NavLink} to="/login" className="text-white">
                  เข้าสู่ระบบ
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" className="text-white">
                  สมัครสมาชิก
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/profile" className="text-white">
                  โปรไฟล์
                </Nav.Link>
                <Nav.Link as={NavLink} to="/logout" className="text-white">
                  ออกจากระบบ
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigateBar;
