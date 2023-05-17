import React, { useState, useEffect } from 'react';
import MapOverlay from './MapOverlay';
import '../CSS/App.css';
import ButtonLayout from './ButtonLayout';
import Header from './Header';
import Graph from './graph'
import Sidebar from './Sidebar';
import axios from "axios"
import GenPDF from './Report';

export default function App() {
	// This holds the state between toggling points and heatmaps
	const [isHeatmap, setIsHeatmap] = useState(false);
	const [isOpen, setIsopen] = useState(false);
	const [filterDatas,setFilterData] = useState('');
	const [filterData2,setFilterData2] = useState('');
	const [filterData3,setFilterData3] = useState('');
	const [data, setData] = useState([]);

	// Query the database 
	axios.get('http://127.0.0.1:5000/api/data')
		.then(response => setData(response.data))
		.catch(error => console.error(error));
	axios.get()
		

	//function called for moving the weapon type filters to mapOverlay
	const handleDataChange = (newData) => {
		setFilterData(newData);
	};
	//function called for moving the crime type filters to mapOverlay
	const handleDataChange2 = (newData) => {
		setFilterData2(newData);
	};
	const handleDataChange3 = (newData) => {
		setFilterData3(newData);
	};
	// This is the function called when displaying charts
	function displayChart() {
		alert("This displays a chart")
	}

	// This is the function called when filtering data
	function filterData() {
		setIsopen(true);
	}
	// This is a function that toggles the heatmap
	function toggleHeatmap() {
		setIsHeatmap(!isHeatmap);
	}

	// Downloads a PDF
	function downloadPDF() {
		
		// Query the database
		let filtered_data = data.slice(0, 10000);
		if(JSON.stringify(filterDatas) !== '[]'){
			let i = 0
			for(i; i < filterDatas.length; i++) {
			  filtered_data = filtered_data.filter((item) => filterDatas.includes(item[4]))
			}
		  }
		  if(JSON.stringify(filterData2) !== '[]'){
			let i = 0
			for(i; i < filterData2.length; i++) {
			  filtered_data = filtered_data.filter((item) => filterData2.includes(item[3]))
			}
		  }
		  if(JSON.stringify(filterData3) !== '[]'){
			let i = 0
			for(i; i < filterData3.length; i++) {
			  filtered_data = filtered_data.filter((item) => filterData3.includes(item[9]))
			}
		  }

		GenPDF(filtered_data);
	}

	return (
		<div className="main">
			<MapOverlay heatmap={isHeatmap} filters={filterDatas} filters2={filterData2} filters3={filterData3}/>
			<Header />
			<ButtonLayout buttonFuncs={[displayChart, filterData, toggleHeatmap, downloadPDF]}/>
			<Sidebar isOpen={isOpen} ToggleSidebar={setIsopen} onDataChanged={handleDataChange} onDataChanged2={handleDataChange2} onDataChanged3={handleDataChange3}/>
		</div>
	);
}