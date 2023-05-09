import React, { useState, useEffect } from 'react';
import MapOverlay from './MapOverlay';
import '../CSS/App.css';
import ButtonLayout from './ButtonLayout';
import axios from 'axios';

export default function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
	  // Fetch data from the backend API
	  axios.get('http://127.0.0.1:5000/api/data')
		//.then(response => setData(response.data))
		.then(response => setData(response.data))
		.catch(error => console.error(error));
	  
	}, []);
	const [income, setIncomeData] = useState([]);
	useEffect(() => {
	  // Fetch data from the backend API
	  axios.get('http://127.0.0.1:5000/api/data2')
		//.then(response => setData(response.data))
		.then(response => setIncomeData(response.data))
		.catch(error => console.error(error));
	}, []);
  
	
	return (
	<div className="main">
		<MapOverlay />
		<ButtonLayout />
	</div>
	);
}