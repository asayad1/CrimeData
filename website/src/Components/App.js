import React, { useState } from 'react';
import MapOverlay from './MapOverlay';
import '../CSS/App.css';
import ButtonLayout from './ButtonLayout';
import Header from './Header';
import Graph from './graph'
import Sidebar from './Sidebar';
import ReactModal from 'react-modal';

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
	const [showGraph, setShowGraph] = useState(false);
	const [isChartModalOpen, setChartModalOpen] = useState(false); // Add this line
	const [selectedOption, setSelectedOption] = useState("");

	function openChartModal() {
		setChartModalOpen(true);
	}
	
	function closeChartModal() {
		setChartModalOpen(false);
	}

	// This is the function called when displaying charts
	function displayChart() {
		//alert("This displays a chart")
		setShowGraph(true);
		openChartModal();
		<Graph g={showGraph} />
	}

	// This is the function called when filtering data
	function filterData() {
		setIsopen(true);
	}
	// This is a function that toggles the heatmap
	function toggleHeatmap() {
		setIsHeatmap(!isHeatmap);
	}

	function handleDropdownChange(event) {
		const selectedValue = event.target.value;
		setSelectedOption(selectedValue);
	}

	return (
		<div className="main">
			<MapOverlay heatmap={isHeatmap}/>
			<Header />
			<ButtonLayout buttonFuncs={[displayChart , filterData, toggleHeatmap]}/>
			<Sidebar isOpen={isOpen} ToggleSidebar={setIsopen}/>
			{/* <ReactModal
				isOpen={isChartModalOpen}
				onRequestClose={closeChartModal}
				// Add any necessary modal styling or configuration props
			>
				{showGraph && <Graph showGraph={showGraph} />}
      		</ReactModal> */}

			{/* New code: ReactModal component */}
			<ReactModal
				isOpen={isChartModalOpen}
				onRequestClose={closeChartModal}
				// Add any necessary modal styling or configuration props
			>
				<div className="modal-content">
				{/* New code: Dropdown */}
				
				{/* Updated code: Show graph inside the modal */}
				{showGraph && <Graph />}
				</div>
      		</ReactModal>
		</div>
	);
}