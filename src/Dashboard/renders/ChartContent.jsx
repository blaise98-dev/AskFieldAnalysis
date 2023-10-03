import React, { useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFileCsv,
} from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import BarChart from "../chartTypes/BarChart";
import LineChart from "../chartTypes/LineChart";
import PieChart from "../chartTypes/PieChart";
import ScatterChart from "../chartTypes/ScatterChart";
import { UserData } from "../ChartData";
import * as htmlToImage from "html-to-image"; // Import html-to-image library
import { saveAs } from "file-saver"; // Import file-saver library
import RadarChart from "../chartTypes/RadarChart";
import DoughnutChartType from "../chartTypes/Doughnut";
import PolarAreaChart from "../chartTypes/PolarAreaChart";
import BubbleChartType from "../chartTypes/BubbleChart";

const ChartContent = () => {
  const [selectedColors, setSelectedColors] = useState([
    "rgba(75,192,192,1)",
    "#ecf0f1",
    "#50AF95",
    "#f3ba2f",
    "#2a71d0",
  ]);

  const [selectedChartType, setSelectedChartType] = useState("bar");

  const chartRef = useRef(null);

  const handleColorChange = (index, color) => {
    const updatedColors = [...selectedColors];
    updatedColors[index] = color;
    setSelectedColors(updatedColors);
  };

  const handleChartTypeChange = (chartType) => {
    setSelectedChartType(chartType);
  };

  const downloadImage = () => {
    htmlToImage
      .toPng(chartRef.current)
      .then(function (dataUrl) {
        const blob = dataURLToBlob(dataUrl);
        saveAs(blob, "chart.png");
      })
      .catch(function (error) {
        console.error("Error creating image:", error);
      });
  };

  const dataURLToBlob = (dataURL) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  };

  const exportToCsv = () => {
    let csvContent = `"${chartData.datasets[0].label}"\n`; // Data title as the first cell

    // Add headers
    csvContent += "Label,Data Series,Value\n";

    // Loop through labels and datasets
    chartData.labels.forEach((label, index) => {
      const dataValue = chartData.datasets[0].data[index];
      csvContent += `${label},${chartData.datasets[0].label},${dataValue}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "chart_data.csv");
  };
  
  const chartData = {
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: selectedColors,
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const getChartComponent = () => {
    switch (selectedChartType) {
      case "bar":
        return <BarChart chartData={chartData} />;
      case "line":
        return <LineChart chartData={chartData} />;
      case "pie":
        return <PieChart chartData={chartData} />;
      case "scatter":
        return <ScatterChart chartData={chartData} />;
        case "polarArea":
            return <PolarAreaChart chartData={chartData} />;
            case "bubble":
            return <BubbleChartType chartData={chartData} />;
        case "doughnut":
        return <DoughnutChartType chartData={chartData} />;
        case "radar":
        return <RadarChart chartData={chartData} />;
      default:
        return null;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12} className="ml-sm-auto col-lg-10 px-md-4 mt-1">
          <div>
            <h3>AskField Visualization Screen</h3>
           <div className="chartControls" style={{display:'flex',gap:3}}>
           <div>
              <select
                value={selectedChartType}
                onChange={(e) => handleChartTypeChange(e.target.value)}
              >
                <option value="bar">Bar Chart</option>
                <option value="line">Line Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="scatter">Scatter Chart</option>
                <option value="bubble">Bubble Chart</option>
                <option value="doughnut">Doughnut Chart</option>
                <option value="radar">Radar Chart</option>
                <option value="polarArea">Polar Area Chart</option>
              </select>
            </div>
            <div>
              {selectedColors.map((color, index) => (
                <input
                  key={index}
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                />
              ))}
            </div>
            <div>
              <FontAwesomeIcon
                icon={faDownload}
                onClick={downloadImage}
                style={{ cursor: "pointer" }}
              />{" "}
              {/* Download icon */}
              <FontAwesomeIcon
                icon={faFileCsv}
                onClick={exportToCsv}
                style={{ cursor: "pointer" }}
              />{" "}
              {/* Export to CSV icon */}
            </div>
           </div>
            <div ref={chartRef} style={{ width: "100%", height: "auto" }}>
              {getChartComponent()}
            </div>
            
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChartContent;
