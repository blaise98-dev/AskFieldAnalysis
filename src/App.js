import React from 'react';
import DynamicDropdowns from './CrossTabulation/CrossTab';
import { Route, Routes } from "react-router-dom";
 import NavbarComponent from './Dashboard/NavbarComponent';
 import Sidebar from './Dashboard/Sidebar';
 import ChartContent from "./Dashboard/renders/ChartContent";
 import CardContent from "./Dashboard/renders/CardContent";
 import { Col, Container, Row } from 'react-bootstrap';
 import TableContentDataTable from './Dashboard/renders/TableContent';
 import MainDashboardComponent from './Dashboard/renders/MainDashboard';

const App = () => {
  return (
    
      <>
  
  <div className="app-container">
    <NavbarComponent />
    <Container fluid>
      <Row>
        <Col lg={3} md={3} sm={12}>
          <Sidebar />
        </Col>
        <Col lg={9} md={9} sm={12}>
          <Routes>
            <Route path="/" element={<MainDashboardComponent />} />
            <Route path="/charts" element={<ChartContent />} />
            <Route path="/table" element={<TableContentDataTable />} />
            <Route path="/crossTabulation" element={<DynamicDropdowns />} />
            <Route path="/card" element={<CardContent />} />
            <Route path="/enumerator" element={<DynamicDropdowns/>} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </div>
  </>
  );
};
export default App;