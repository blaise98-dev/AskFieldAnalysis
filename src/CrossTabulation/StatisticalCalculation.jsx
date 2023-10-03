import React, { useState, useEffect } from 'react';

function StatisticalCalculation() {
  const [selectedOperation, setSelectedOperation] = useState('minimum');
  const [tableData, setTableData] = useState([]);
  const operations = [
    'minimum',
    'maximum',
    'sum',
    'average',
    'count',
    'median',
    'sample variance',
    'sample standard deviation',
  ];

  // Sample JSON data (questions and answers)
  const jsonData = [
    {
      question: 'Which JavaScript frameworks do you use?',
      answer: [2, 5, 8, 10],
    },
    {
      question: 'Question 2',
      answer: [1, 3, 7, 9],
    },
    {
      question: 'Question 3',
      answer: [4, 6, 8, 12],
    },
  ];

  useEffect(() => {
    // Calculate the operation result based on the selected operation
    const calculateResult = (operation) => {
      switch (operation) {
        case 'minimum':
          return jsonData[0].answer.map((_, colIndex) =>
            Math.min(...jsonData.map((item) => item.answer[colIndex]))
          );
        case 'maximum':
          return jsonData[0].answer.map((_, colIndex) =>
            Math.max(...jsonData.map((item) => item.answer[colIndex]))
          );
        case 'sum':
          return jsonData[0].answer.map((_, colIndex) =>
            jsonData.reduce(
              (acc, item) => acc + item.answer[colIndex],
              0
            )
          );
        case 'average':
          return jsonData[0].answer.map((_, colIndex) =>
            jsonData.reduce(
              (acc, item) => acc + item.answer[colIndex],
              0
            ) / jsonData.length
          );
          case 'count':
          return jsonData[0].answer.map((_, colIndex) =>
            jsonData.map((item) => item.answer[colIndex]).length
          );
        case 'median':
          return jsonData[0].answer.map((_, colIndex) => {
            const sortedValues = jsonData.map(
              (item) => item.answer[colIndex]
            ).sort((a, b) => a - b);

            const middle = Math.floor(sortedValues.length / 2);
            if (sortedValues.length % 2 === 0) {
              return (
                (sortedValues[middle - 1] + sortedValues[middle]) / 2
              );
            } else {
              return sortedValues[middle];
            }
          });
        case 'sample variance':
          return jsonData[0].answer.map((_, colIndex) => {
            const columnValues = jsonData.map(
              (item) => item.answer[colIndex]
            );

            const mean =
              columnValues.reduce((acc, value) => acc + value, 0) /
              columnValues.length;

            const squaredDifferences = columnValues.map(
              (value) => Math.pow(value - mean, 2)
            );

            return squaredDifferences.reduce(
              (acc, squaredDiff) => acc + squaredDiff,
              0
            ) / (columnValues.length - 1);
          });
        case 'sample standard deviation':
          return jsonData[0].answer.map((_, colIndex) =>
            Math.sqrt(calculateResult('sample variance')[colIndex])
          );
        default:
          return [];
      }
    };

    const result = calculateResult(selectedOperation);
    setTableData(result);
  }, [selectedOperation]);

  const handleOperationChange = (e) => {
    setSelectedOperation(e.target.value);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Cross tabulation Table</h1>
      <div className="mb-3">
        <label htmlFor="operationSelect" className="form-label">
          Select Operation:
        </label>
        <select
          id="operationSelect"
          className="form-select"
          value={selectedOperation}
          onChange={handleOperationChange}
        >
          {operations.map((operation, index) => (
            <option key={index} value={operation}>
              {operation}
            </option>
          ))}
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Question</th>
              {jsonData[0].answer.map((_, colIndex) => (
                <th key={colIndex}>Answer {colIndex + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jsonData.map((item, rowIndex) => (
              <tr key={rowIndex}>
                <td>{item.question}</td>
                {item.answer.map((answer, colIndex) => (
                  <td key={colIndex}>{answer}</td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="fw-bold">{selectedOperation}</td>
              {tableData.map((result, colIndex) => (
                <td key={colIndex} className="fw-bold">{result}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatisticalCalculation;