import React, { useState, useEffect } from "react";
import axios from 'axios';
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import { Line, Pie,Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

const backgroundColors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#ffffff', '#000000']

export default function Graph() {
  const [data, setData] = useState([]);
  const [selectedGraphType, setSelectedGraphType] = useState("line");
  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://127.0.0.1:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  //how to create the data for Graphs by weapon type
  //<Pie data={chartData} options={options}/>
  //<Line data={chartData} options={options}/>
  //<Bar data={chartData} options={options}/>
  const typeWeapon =  ["PERSONAL_WEAPONS","HANDGUN","UNKNOWN","OTHER","NA","KNIFE","HANDS","FIREARM","FIRE","BLUNT_OBJECT","AUTOMATIC_HANDGUN","AUTOMATIC_FIREARM","ASPHYXIATION"]
  const numOccurancesAll = []
  let i = 0
  for (i; i < typeWeapon.length; i++) {
    const filteredData1 = data.filter((item) => item[4] === typeWeapon[i]);
    const numOccurrences1 = filteredData1.length;
    numOccurancesAll.push(numOccurrences1)
  }
  const chartData = {
    labels: ["PERSONAL_WEAPONS","HANDGUN","UNKNOWN","OTHER","NA","KNIFE","HANDS","FIREARM","FIRE","BLUNT_OBJECT","AUTOMATIC_HANDGUN","AUTOMATIC_FIREARM","ASPHYXIATION"],
    datasets: [
        {
        label: "data",
        data: numOccurancesAll,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: backgroundColors,
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleGraphTypeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedGraphType(selectedValue);
  };

  return (
    <div className="chart-container">
      <select onChange={handleGraphTypeChange} value={selectedGraphType}>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="bar">Bar Chart</option>
      </select>
      {selectedGraphType === "line" && <Line data={chartData} options={options} />}
      {selectedGraphType === "pie" && <Pie data={chartData} options={options} />}
      {selectedGraphType === "bar" && <Bar data={chartData} options={options} />}
    </div>
   );
}