import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaCopy } from 'react-icons/fa';import { Bar, Pie, Line, Scatter, Radar, PolarArea, Bubble } from 'react-chartjs-2';
import 'chart.js/auto';
import Select from 'react-select';
import MainPivotUI from './MainPivotUI';
function DynamicDropdowns() {
  const [json, setJson] = useState(null);
  const [dropdowns, setDropdowns] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [shareableLink, setShareableLink] = useState('');

  useEffect(() => {
    fetch('./data.json')
      .then((response) => response.json())
      .then((data) => {
        setJson(data);
      })
      .catch((error) => {
        console.error('Error fetching JSON data:', error);
      });
  }, []);

  useEffect(() => {
    if (json) {
      setDropdowns([{ key: 0, jsonData: json, selectedAnswers: [], selectedChartType: 'bar' }]);
    }
  }, [json]);

  const addDropdown = () => {
    const newKey = dropdowns.length;
    const newDropdown = { key: newKey, jsonData: json, selectedAnswers: [], selectedChartType: 'bar' };
    setDropdowns([...dropdowns, newDropdown]);
  };

  const deleteDropdown = (key) => {
    const updatedDropdowns = dropdowns.filter((dropdown) => dropdown.key !== key);
    setDropdowns(updatedDropdowns);
  };

  const handleQuestionChange = (selectedOption, dropdownKey) => {
    if (selectedOption) {
      const selectedQuestionName = selectedOption.value;
      const selectedQuestionTitle = selectedOption.label;
      const selectedQuestion = json?.elements.find((element) => element.name === selectedQuestionName);

      const updatedDropdowns = dropdowns.map((dropdown) => {
        if (dropdown.key === dropdownKey) {
          return {
            ...dropdown,
            selectedQuestion: selectedQuestionName,
            selectedQuestionTitle,
            answerChoices: selectedQuestion ? selectedQuestion.choices : [],
            selectedAnswers: [],
          };
        }
        return dropdown;
      });

      setDropdowns(updatedDropdowns);
      setSelectedQuestion(selectedQuestionName);
    }
  };

  const handleAnswerChange = (event, dropdownKey) => {
    const selectedAnswers = Array.from(event.target.selectedOptions, (option) => option.value);

    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.key === dropdownKey) {
        return {
          ...dropdown,
          selectedAnswers,
        };
      }
      return dropdown;
    });

    setDropdowns(updatedDropdowns);
    setSelectedAnswers(selectedAnswers);
  };

 

  const generateShareableLink = () => {
    if (json) {
      const selectedQuestions = dropdowns.map((dropdown) => ({
        question: dropdown.selectedQuestion,
        answers: dropdown.selectedAnswers,
      }));

      // Encode the selected questions and answers as a query parameter
      const queryParameters = encodeURIComponent(JSON.stringify(selectedQuestions));

      // Create the shareable link
      const currentURL = window.location.href;
      const link = `${currentURL}?questions=${queryParameters}`;

      // Update the state with the shareable link
      setShareableLink(link);

      // Copy the link to the clipboard
      navigator.clipboard.writeText(link)
        .then(() => {
          console.log('Link copied to clipboard');
        })
        .catch((error) => {
          console.error('Failed to copy link to clipboard:', error);
        });
    } else {
      console.error('JSON data is not available');
    }
  };

  const parseQueryParameters = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const questionsParam = queryParams.get('questions');

    if (questionsParam) {
      const selectedQuestions = JSON.parse(decodeURIComponent(questionsParam));

      const updatedDropdowns = selectedQuestions.map((selectedQuestion, index) => ({
        key: index,
        jsonData: json,
        selectedQuestion: selectedQuestion.question,
        selectedAnswers: selectedQuestion.answers,
        selectedChartType: 'bar',
      }));

      setDropdowns(updatedDropdowns);
    }
  };

  useEffect(() => {
    parseQueryParameters();
  }, [json]); // Add json as a dependency to re-parse when json is available

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 text-right mb-3">
          <button onClick={generateShareableLink} className="btn btn-primary">
            <FaCopy /> Copy Link
          </button>
        </div>
      </div>
      {dropdowns.map((dropdown) => (
        <div key={dropdown.key} className="row mb-3 mt-3">
          <div className="col-md-5">
            <Select
              options={json && json.elements ? json.elements.map((element, index) => ({
                value: element.name,
                label: element.title,
              })) : []}
              isClearable
              isSearchable
              placeholder="Select a Question"
              onChange={(selectedOption) => handleQuestionChange(selectedOption, dropdown.key)}
              value={dropdown.selectedQuestion ? { value: dropdown.selectedQuestion, label: dropdown.selectedQuestionTitle } : null}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              multiple
              onChange={(e) => handleAnswerChange(e, dropdown.key)}
              value={dropdown.selectedAnswers || []}
            >
              {(dropdown.answerChoices || []).map((choice, index) => (
                <option key={index} value={choice}>
                  {typeof choice === 'object' ? choice.text : choice}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              onChange={(e) => handleChartTypeChange(e, dropdown.key)}
              value={dropdown.selectedChartType || 'bar'}
            >
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
              <option value="scatter">Scatter Chart</option>
              <option value="radar">Radar Chart</option>
              <option value="polarArea">Polar Area Chart</option>
              <option value="bubble">Bubble Chart</option>
              <option value="crossTab">Cross Tabulation</option>
            </select>
          </div>
          <div className="col-md-1 ">
            <button
              className="btn btn-danger"
              onClick={() => deleteDropdown(dropdown.key)}
              type="button"
            >
              <FaMinus />
            </button>
            <button className="btn btn-success" onClick={addDropdown} type="button">
            <FaPlus />
          </button>
          </div>
          <div className="col-12">
            {renderChart(dropdown)}
          </div>
          {dropdown.selectedChartType === 'crossTab' && (
            <div className="col-12">
              <MainPivotUI />
            </div>
          )}
        </div>
      ))}
    </div>
  );

  function handleChartTypeChange(event, dropdownKey) {
    const selectedChartType = event.target.value;
    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.key === dropdownKey) {
        return {
          ...dropdown,
          selectedChartType,
        };
      }
      return dropdown;
    });

    setDropdowns(updatedDropdowns);
  }

  function renderChart(dropdown) {
    if (json && json.elements) {
      if (dropdown.selectedQuestion && dropdown.selectedAnswers.length > 0) {
        const labels = dropdown.selectedAnswers;
        const selectedQuestionData = json.elements.find(
          (element) => element.name === dropdown.selectedQuestion
        );
        const counts = selectedQuestionData ? selectedQuestionData.counts : [];
        const backgroundColors = generateRandomColors(labels.length);

        const chartData = {
          labels,
          datasets: [
            {
              label: dropdown.selectedQuestionTitle,
              data: counts.slice(0, dropdown.selectedAnswers.length),
              backgroundColor: backgroundColors,
            },
          ],
        };

        switch (dropdown.selectedChartType) {
          case 'bar':
            return <Bar data={chartData} />;
          case 'line':
            return <Line data={chartData} />;
          case 'pie':
            return <Pie data={chartData} />;
          case 'scatter':
            return <Scatter data={chartData} />;
          case 'radar':
            return <Radar data={chartData} />;
          case 'polarArea':
            return <PolarArea data={chartData} />;
          case 'bubble':
            return <Bubble data={chartData} />;
          default:
            return null;
        }
      } else {
        return null;
      }
    } else {
      return <p>Loading JSON data...</p>; // Add a loading message or handle when data is not available
    }
  }

  function generateRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, 0.6)`;
      colors.push(color);
    }
    return colors;
  }
}

export default DynamicDropdowns;
