import Plot from "react-plotly.js";
import TableRenderers from './TableRenderers';
import createPlotlyRenderers from './PlotlyRenderers';
import PivotTableUI from './PivotTableUI';
import './pivottable.css';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';
import { useState } from "react";

function MainPivotUI() {
  const PlotlyRenderers = createPlotlyRenderers(Plot);
  const [state, setState] = useState([]);
  const data = [
    {
      "Total Bill": 16.99,
      "Tip": 1.01,
      "Payer Gender": "Female",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 2
    },
    {
      "Total Bill": 10.34,
      "Tip": 1.66,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 3
    },
    {
      "Total Bill": 21.01,
      "Tip": 3.5,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 3
    },
    {
      "Total Bill": 23.68,
      "Tip": 3.31,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 2
    },
    {
      "Total Bill": 24.59,
      "Tip": 3.61,
      "Payer Gender": "Female",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 4
    },
    {
      "Total Bill": 25.29,
      "Tip": 4.71,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 4
    },
    {
      "Total Bill": 8.77,
      "Tip": 2,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 2
    },
    {
      "Total Bill": 26.88,
      "Tip": 3.12,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 4
    },
    {
      "Total Bill": 15.04,
      "Tip": 1.96,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 2
    },
    {
      "Total Bill": 14.78,
      "Tip": 3.23,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 2
    },
    {
      "Total Bill": 10.27,
      "Tip": 1.71,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 2
    },
    {
      "Total Bill": 35.26,
      "Tip": 5,
      "Payer Gender": "Female",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 4
    },
    {
      "Total Bill": 15.42,
      "Tip": 1.57,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 2
    },
    {
      "Total Bill": 18.43,
      "Tip": 3,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 4
    },
    {
      "Total Bill": 14.83,
      "Tip": 3.02,
      "Payer Gender": "Female",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 2
    },
    {
      "Total Bill": 21.58,
      "Tip": 3.92,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 2
    },
    {
      "Total Bill": 10.33,
      "Tip": 1.67,
      "Payer Gender": "Female",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 3
    },
    {
      "Total Bill": 16.29,
      "Tip": 3.71,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 3
    },
    {
      "Total Bill": 16.97,
      "Tip": 3.5,
      "Payer Gender": "Female",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Sunday",
      "Meal": "Dinner",
      "Party Size": 3
    },
    {
      "Total Bill": 20.65,
      "Tip": 3.35,
      "Payer Gender": "Male",
      "Payer Smoker": "Non-Smoker",
      "Day of Week": "Saturday",
      "Meal": "Dinner",
      "Party Size": 3
    }
  ];  

  return (
    
    <PivotTableUI
      data={data}
      renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
      onChange={(s) => {
        setState(s);
      }}
      {...state}
    />
  );
}

export default MainPivotUI;