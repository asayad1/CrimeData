import React from "react";
import ImgButton from './ImgButton';
import "../CSS/ButtonLayout.css"

export default function ButtonLayout() {
    return (
		<div className='mybuttons'>
			<ImgButton logo={require("../Images/graph.png")} />
			<ImgButton logo={require("../Images/filter.png")} />
			<ImgButton logo={require("../Images/pin.png")} />
		</div>
		
    )
}