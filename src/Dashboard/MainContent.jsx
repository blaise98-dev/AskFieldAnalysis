
import { Row, Col } from "react-bootstrap"; // Import file-saver library
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChartContent from "./renders/ChartContent";
import TableContent from "./renders/TableContent";
import CardContent from "./renders/CardContent";
import FormContent from "./renders/FormContent";
import MainDashboardComponent from "./renders/MainDashboard";

const MainContent = () => {
  return (
    <BrowserRouter>
      <Row>
        <Col md={12} className="ml-sm-auto col-lg-10 px-md-1">
        
         <Routes>
         <Route path="/" element={<MainDashboardComponent />} />
          <Route path="/charts" elementyy={<ChartContent/>}></Route>
          <Route path="/table" element={<TableContent/>}></Route>
          <Route path="/card" element={<CardContent/>}></Route>
          <Route path="/form" element={<FormContent/>}></Route>
          </Routes>
         
        </Col>
      </Row>
    </BrowserRouter>
  );
};

export default MainContent;
