import React, { useState } from 'react';
import MapOverlay from './MapOverlay';
import '../CSS/App.css';
import ButtonLayout from './ButtonLayout';

export default function App() {
	return (
	<div className="main">
		<MapOverlay />
		<ButtonLayout />
	</div>
	);
}