import React, { useState, useEffect } from 'react';
import MapOverlay from './MapOverlay';
import '../CSS/App.css';
import ButtonLayout from './ButtonLayout';
import Header from './Header';
import Graph from './graph'

export default function App() {
	//<MapOverlay data1={points2}/>
	//<MapOverlay data1={points2}/>
		//<Header />
		//<ButtonLayout />
		//<Graph/>
	return (
	<div className="main">
		<MapOverlay/>
		<Header />
		<Graph/>
		<ButtonLayout />
		
	</div>
	);
}
