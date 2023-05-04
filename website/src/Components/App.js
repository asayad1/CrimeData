import React, { useState } from 'react';
import MapOverlay from './MapOverlay';
import ImgButton from './ImgButton';
import '../CSS/App.css';


export default function App() {
	return (
	<div className="main">
		<MapOverlay />
		<div className='mybuttons'>
			<ImgButton />
			<ImgButton />
			<ImgButton />
		</div>
		
	</div>
	);
}