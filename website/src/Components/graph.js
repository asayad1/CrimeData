import React, { useState, useEffect } from "react";
import axios from 'axios';
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import { Line, Pie,Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

export default function Graph() {
  const [data, setData] = useState([]);
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
  const typeWeapon =  ["PERSONAL_WEAPONS","HANDGUN","UNKNOWN","OTHER","NA","KNIFE","HANDS","FIREARM","FIRE","BLUNT_OBJECT","AUTOMATIC_HANDGUN","AUTOMATIC_FIREARM","ASPHYXIATION","NULL"]
  const numOccurancesAll = []
  let i = 0
  for (i; i < typeWeapon.length; i++) {
    const filteredData1 = data.filter((item) => item[4] === typeWeapon[i]);
    const numOccurrences1 = filteredData1.length;
    numOccurancesAll.push(numOccurrences1)
  }
  const chartData = {
    labels: ["PERSONAL_WEAPONS","HANDGUN","UNKNOWN","OTHER","NA","KNIFE","HANDS","FIREARM","FIRE","BLUNT_OBJECT","AUTOMATIC_HANDGUN","AUTOMATIC_FIREARM","ASPHYXIATION","NULL"],
    datasets: [
        {
        label: "data",
        data: numOccurancesAll,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className="chart-container">
      <Pie data={chartData} options={options}/>
    </div>
   );
}