import React, { useState } from 'react';
import MapOverlay from './MapOverlay';
import '../CSS/App.css';
import ButtonLayout from './ButtonLayout';
import Header from './Header';
import Graph from './graph'

export default function App() {
/*
		<MapOverlay/>
		<Header />
		<Graph/>
		<ButtonLayout />
*/		
	// This holds the state between toggling points and heatmaps
	const [isHeatmap, setIsHeatmap] = useState(false);
	
	// This is the function called when displaying charts
	function displayChart() {
		alert("This displays a chart")
	}

	// This is the function called when filtering data
	function filterData() {
		alert("This clicked the filter data button.")
	}
	// This is a function that toggles the heatmap
	function toggleHeatmap() {
		setIsHeatmap(!isHeatmap);
	}


	return (
		<div className="main">
			<MapOverlay heatmap={isHeatmap}/>
			<Header />
			<ButtonLayout buttonFuncs={[displayChart, filterData, toggleHeatmap]}/>
			<Graph />
		</div>
	);
}