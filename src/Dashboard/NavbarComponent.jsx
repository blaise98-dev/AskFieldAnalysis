import React, { useState } from 'react';
import { Navbar, Nav, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus, faArrowUpFromBracket, faRetweet } from "@fortawesome/free-solid-svg-icons";

const NavbarComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleIconClick = (icon) => {
    setModalContent(icon);
    setShowModal(true);
  };

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  const appStyles = {
    backgroundColor: darkMode ? '#333' : 'white',
    color: darkMode ? 'white' : 'black',
    transition: 'background-color 0.3s, color 0.3s'
  };

  return (
    <div style={appStyles}>
      <Navbar bg="danger" variant="dark" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Nav className="mr-auto">
          <Nav.Link href="#home" onClick={() => handleIconClick("Add Item")}>
            <FontAwesomeIcon icon={faPlus} />
          </Nav.Link>

          <Nav.Link href="#home" onClick={() => handleIconClick("Settings")}>
            <FontAwesomeIcon icon={faGear} />
          </Nav.Link>

          {/* Add more navigation links */}
        </Nav>

        <Nav>
          <Nav.Link href="#login" onClick={() => handleIconClick("Refresh")}>
            <FontAwesomeIcon icon={faRetweet} />
          </Nav.Link>

          <Nav.Link href="#signup" onClick={() => handleIconClick("Scroll to Top")}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
          </Nav.Link>
        </Nav>
      </Navbar>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={toggleDarkMode}>
            Toggle Dark Mode
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NavbarComponent;
