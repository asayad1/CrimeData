import React, { useState } from 'react';
import MapOverlay from './MapOverlay';
import '../CSS/App.css';
import ButtonLayout from './ButtonLayout';
import Header from './Header';

export default function App() {
	return (
	<div className="main">
		<MapOverlay />
		<Header />
		<ButtonLayout />
	</div>
	);
}
