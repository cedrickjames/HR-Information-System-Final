import React , { useState }from "react";
import { Navbar, Row, Col, } from "react-bootstrap";
import { FaBars,FaChartBar, FaUser, FaUsers, FaHome } from "react-icons/fa";
import { Link} from 'react-router-dom';

import '../css/style.scss';
import '../index.css';
import Offcanvas  from 'react-bootstrap/Offcanvas';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavBar = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = ()  => setShow((s) => !s);

  return (
    <div>


    <Navbar
    fixed="top"
      variant="dark"
    //   expand="sm"
      className="navbar navbar-expand-sm shadow px-0 px-sm-3"
      style={{ backgroundColor: "#061362", height:"65px" }}
      data-bs-scroll="true" 
    >
      <Navbar.Brand className="d-none d-lg-block"variant="primary" onClick={handleShow}>
        <FaBars size={20} />
      </Navbar.Brand>
      <Navbar.Brand className="d-block d-lg-none d-none d-sm-block" data-bs-toggle="offcanvas" href="#offcanvasExample2" aria-controls="offcanvasExample">
        <FaBars size={30} />
      </Navbar.Brand>
      <Navbar.Brand className="mb-0 h1">HR Information System</Navbar.Brand>
     
    </Navbar>

      <Offcanvas show={show} onHide={handleClose} id="offcanvasExample" className="sidebar " animate={false} backdrop={false} scroll={false}  >
        <Offcanvas.Header  className="offcanvas-header p-0 d-flex justify-content-center"   style={{ height: "200px", color: "white", backgroundColor: "skyblue", width:"100%"}}>
        <Row className="containerName w-100">
      <Col xs={4} className="blue px-3 ">
        <div className="initialsOfName">CJ</div>
      </Col>
      <Col xs={8} className="pink">
        <Row className="name col-12">
          <h5 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "1.3rem" }}>Cedrick James</h5>
        </Row>
        <Row className="green col-12">
          <h6>MIS Specialist</h6>
        </Row>
      </Col>
    </Row>
          {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
           
        <ul className="nav nav-pills flex-column mb-auto">
    <li className="nav-item side" style={{ height: "40px" }}>
        <Link to ="/" className="nav-link side active"  id="forecastButton"> 
        <FaHome size={18} />

        <div className="d-inline ms-1">Home Page</div>
        </Link>
     
    </li>
    <li>
    <Link to ="/dashboard" className="nav-link side"  id="dashboardOpt"> 
        <div className="d-inline me-1">
        <FaChartBar size={18} />
        </div>
        <div className="d-inline ms-1">Dashboard</div>
      </Link>
    </li>
    <li>
    <Link to ="/manpower" className="nav-link side"  id="manpowerOpt"> 
        <div className="d-inline" style={{ marginRight: "6px" }}>
        <FaUsers size={18} />
        </div>
        <div className="d-inline">Manpower</div>
        </Link>
    </li>
    <li>
    <Link to ="/request" className="nav-link side"  id="requestOpt"> 
        <div className="d-inline" style={{ marginRight: "6px" }}>
        <FaUser size={18} />

        </div>
        <div className="d-inline position-relative ">
          Signup Request
          <span className="ms-4 position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            1
            <span className="visually-hidden">unread messages</span>
          </span>
        </div>
      </Link>
    </li>
  </ul>
        
        </Offcanvas.Body>
      </Offcanvas>
      
    </div>
  );
};

export default NavBar;