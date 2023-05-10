import React from "react";
import ImgButton from './ImgButton';
import "../CSS/ButtonLayout.css"

export default function ButtonLayout() {
    return (
		<div className='mybuttons'>
			<ImgButton text="create graph" logo={require("../Images/graph.png")} />
			<ImgButton text="filter data" logo={require("../Images/filter.png")} />
			<ImgButton text="toggle features" logo={require("../Images/pin.png")} />
		</div>
		
    )
}