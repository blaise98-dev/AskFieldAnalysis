import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChartBar, faClipboardList } from "@fortawesome/free-solid-svg-icons";


const CardsSection = () => {
  return (
      <Row>
    <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Surveys</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faUsers} /> 500
            </Card.Text>
          </Card.Body>
        </Card>
      </Col> <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Surveys</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faUsers} /> 500
            </Card.Text>
          </Card.Body>
        </Card>
      </Col> <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Surveys</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faUsers} /> 500
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title> Subscriptions</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faChartBar} /> 75%
            </Card.Text>
          </Card.Body>
        </Card>
      </Col> 
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Projects</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faChartBar} /> 15
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Customers</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faClipboardList} /> 20
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Supervisors</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faClipboardList} /> 3
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card>
          <Card.Body>
            <Card.Title>Enumerators</Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faClipboardList} /> 30
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    
  );
};
export default CardsSection;
