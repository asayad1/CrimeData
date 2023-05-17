import React, { useState } from 'react';
import MapOverlay from './MapOverlay';
import '../CSS/App.css';
import ButtonLayout from './ButtonLayout';
import Header from './Header';
import Graph from './graph'
import Sidebar from './Sidebar';

export default function App() {
/*
		<MapOverlay/>
		<Header />
		<Graph/>
		<ButtonLayout />
*/		
	// This holds the state between toggling points and heatmaps
	const [isHeatmap, setIsHeatmap] = useState(false);
	const [isOpen, setIsopen] = useState(false);
	const [filterDatas,setFilterData] = useState('');
	const [filterData2,setFilterData2] = useState('');
	const [filterData3,setFilterData3] = useState('');

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


	return (
		<div className="main">
			<MapOverlay heatmap={isHeatmap} filters={filterDatas} filters2={filterData2} filters3={filterData3}/>
			<Header />
			<ButtonLayout buttonFuncs={[displayChart, filterData, toggleHeatmap]}/>
			<Sidebar isOpen={isOpen} ToggleSidebar={setIsopen} onDataChanged={handleDataChange} onDataChanged2={handleDataChange2} onDataChanged3={handleDataChange3}/>
			<Graph />
		</div>
	);
}