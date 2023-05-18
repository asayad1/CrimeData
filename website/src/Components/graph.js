import React, { useState, useEffect } from "react";
import axios from 'axios';
import Chart from 'chart.js/auto';
import { CategoryScale } from "chart.js";
import { Line, Pie,Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

const backgroundColors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#000000','#B0BF1A','#36454F','#2E2D88','#301934']

export default function Graph() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedGraphType, setSelectedGraphType] = useState("line");
  const [selectedDataType, setSelectedDataType] = useState("Crimes");
  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://127.0.0.1:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
      axios.get('http://127.0.0.1:5000/api/data2')
      .then(response => setData2(response.data))
      .catch(error => console.error(error));  
  }, []);

  //how to create the data for Graphs by weapon type
  //<Pie data={chartData} options={options}/>
  //<Line data={chartData} options={options}/>
  //<Bar data={chartData} options={options}/>
  const typeWeapon =  ["PERSONAL_WEAPONS","HANDGUN","UNKNOWN","OTHER","NA","KNIFE","HANDS","FIREARM","FIRE","BLUNT_OBJECT","AUTOMATIC_HANDGUN","AUTOMATIC_FIREARM","ASPHYXIATION"]
  const numOccurancesAll = []
  for (let i = 0; i < typeWeapon.length; i++) {
    const filteredData1 = data.filter((item) => item[4] === typeWeapon[i]);
    const numOccurrences1 = filteredData1.length;
    numOccurancesAll.push(numOccurrences1)
  }
  const typeCrime =  ["COMMON ASSAULT","BURGLARY","LARCENY FROM AUTO","AUTO THEFT","AGG. ASSAULT","LARCENY","ROBBERY","ROBBERY - COMMERCIAL","RAPE","SHOOTING","ROBBERY - CARJACKING","ARSON","HOMICIDE"]
  const numOccurancesCrimeAll = []
  for (let i = 0; i < typeCrime.length; i++) {
    let filteredData2 = data.filter((item) => item[3] === typeCrime[i]);
    const numOccurrences2 = filteredData2.length;
    numOccurancesCrimeAll.push(numOccurrences2)
  }
  const DistrictCrime = ["CENTRAL","EASTERN","SOUTHEAST","SOUTHERN","NORTHERN","NORTHEAST","SOUTHWEST","NORTHWEST","WESTERN","SD5"]
  const numOccurancesDistrictAll = []
  for (let i = 0; i < DistrictCrime.length; i++) {
    let filteredData3 = data.filter((item) => item[9] === DistrictCrime[i]);
    const numOccurrences3 = filteredData3.length;
    numOccurancesDistrictAll.push(numOccurrences3)
  }
  const TimeCrime = ["00:00:00+00","01:00:00+00","02:00:00+00","03:00:00+00","04:00:00+00","05:00:00+00","06:00:00+00","07:00:00+00","08:00:00+00","09:00:00+00","10:00:00+00","11:00:00+00","12:00:00+00","13:00:00+00","14:00:00+00","15:00:00+00","16:00:00+00","17:00:00+00","18:00:00+00","19:00:00+00","20:00:00+00","21:00:00+00","22:00:00+00","23:00:00+00","24:00:00+00"]
  const numOccurancesTimeAll = []
  for (let i = 0; i < TimeCrime.length-1; i++) {
    let filteredData4 = data.filter( item => {
      const time = new Date(item[1]).toTimeString().slice(0, 8);
    
      return  time >= TimeCrime[i] && time <= TimeCrime[i+1]
    });
    const numOccurrences4 = filteredData4.length;
    numOccurancesTimeAll.push(numOccurrences4)
  }
  const Neighborhoods = ['Allendale/Irvington/S. Hilton','Beechfield/Ten Hills/West Hills','Belair-Edison','Brooklyn/Curtis Bay/Hawkins Point','Canton','Cedonia/Frankford','Cherry Hill','Chinquapin Park/Belvedere','Claremont/Armistead','Clifton-Berea',
  'Cross-Country/Cheswolde','Dickeyville/Franklintown','Dorchester/Ashburton','Downtown/Seton Hill','Edmondson Village','Fells Point','Forest Park/Walbrook','Glen-Fallstaff','Greater Charles Village/Barclay','Greater Govans','Greater Mondawmin',
  'Greater Roland Park/Poplar Hill','Greater Rosemont','Greenmount East','Hamilton', 'Harbor East/Little Italy', 'Harford/Echodale','Highlandtown','Howard Park/West Arlington','Inner Harbor/Federal Hill','Lauraville','Loch Raven','Madison/East End','Medfield/Hampden/Woodberry/Remington',
  'Midtown','Midway/Coldstream','Morrell Park/Violetville','Mount Washington/Coldspring','North Baltimore/Guilford/Homeland','Northwood','Oldtown/Middle East','Orangeville/East Highlandtown','Patterson Park North & East','Penn North/Reservoir Hill',
  'Pimlico/Arlington/Hilltop','Poppleton/The Terraces/Hollins Market','Sandtown-Winchester/Harlem Park','South Baltimore','Southeastern','Southern Park Heights','Southwest Baltimore','The Waverlies','Upton/Druid Heights','Washington Village/Pigtown','Westport/Mount Winans/Lakeland']
  const MoneyNeighborhoodsAll = []
  for (let i = 0; i < Neighborhoods.length; i++) {
    let point = data2.map(item => [item[1],item[2]])
    let neigh = point.map(item => item[0])
    let inc = point.map(item => item[1])
    if (neigh[i] === Neighborhoods[i]){
      MoneyNeighborhoodsAll.push(inc[i])
    }
  }
  const chartData = {
    labels: typeWeapon,
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
  const chartDataCrime = {
    labels: typeCrime,
    datasets: [
      {
        label: "data",
        data: numOccurancesCrimeAll,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: backgroundColors,
        tension: 0.1,
      },
    ],
  };
  const chartDataDistrict = {
    labels: DistrictCrime,
    datasets: [
      {
        label: "data",
        data: numOccurancesDistrictAll,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: backgroundColors,
        tension: 0.1,
      },
    ],
  };
  const chartDataTime = {
    labels: TimeCrime,
    datasets: [
      {
        label: "data",
        data: numOccurancesTimeAll,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: backgroundColors,
        tension: 0.1,
      },
    ],
  };
  const chartDataIncome = {
    labels: Neighborhoods,
    datasets: [
      {
        label: "data",
        data: MoneyNeighborhoodsAll,
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
  const handleGraphDataChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDataType(selectedValue);
  };

  return (
    <div className="chart-container">
      <select onChange={handleGraphDataChange} value={selectedDataType}>
        <option value="Crimes">Types of Crime</option>
        <option value="Weapons">Weapons in Crimes</option>
        <option value="Districts">Crimes by District</option>
        <option value="Time">Crimes by Time</option>
        <option value="Income">Income by Neighborhoods</option>
      </select>
      <select onChange={handleGraphTypeChange} value={selectedGraphType}>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="bar">Bar Chart</option>
      </select>
      {selectedGraphType === "line" && selectedDataType === "Weapons"&& <Line data={chartData} options={options} />}
      {selectedGraphType === "pie" && selectedDataType === "Weapons"&& <Pie data={chartData} options={options} />}
      {selectedGraphType === "bar" && selectedDataType === "Weapons"&& <Bar data={chartData} options={options} />}
      {selectedGraphType === "line" && selectedDataType === "Crimes"&& <Line data={chartDataCrime} options={options} />}
      {selectedGraphType === "pie" && selectedDataType === "Crimes"&& <Pie data={chartDataCrime} options={options} />}
      {selectedGraphType === "bar" && selectedDataType === "Crimes"&& <Bar data={chartDataCrime} options={options} />}
      {selectedGraphType === "line" && selectedDataType === "Districts"&& <Line data={chartDataDistrict} options={options} />}
      {selectedGraphType === "pie" && selectedDataType === "Districts"&& <Pie data={chartDataDistrict} options={options} />}
      {selectedGraphType === "bar" && selectedDataType === "Districts"&& <Bar data={chartDataDistrict} options={options} />}
      {selectedGraphType === "line" && selectedDataType === "Time"&& <Line data={chartDataTime} options={options} />}
      {selectedGraphType === "pie" && selectedDataType === "Time"&& <Pie data={chartDataTime} options={options} />}
      {selectedGraphType === "bar" && selectedDataType === "Time"&& <Bar data={chartDataTime} options={options} />}
      {selectedGraphType === "line" && selectedDataType === "Income"&& <Line data={chartDataIncome} options={options} />}
      {selectedGraphType === "pie" && selectedDataType === "Income"&& <Pie data={chartDataIncome} options={options} />}
      {selectedGraphType === "bar" && selectedDataType === "Income"&& <Bar data={chartDataIncome} options={options} />}
    </div>
   );
}