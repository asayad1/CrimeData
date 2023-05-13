import React from "react";
import ImgButton from './ImgButton';
import "../CSS/ButtonLayout.css"

export default function ButtonLayout(props) {
    return (
		<div classNamWe='mybuttons'>
			<ImgButton text="create graph" logo={require("../Images/graph.png")} func={props.buttonFuncs[0]} />
			<ImgButton text="filter data" logo={require("../Images/filter.png")} func={props.buttonFuncs[1]}/>
			<ImgButton text="toggle features" logo={require("../Images/pin.png")} func={props.buttonFuncs[2]}/>
		</div>
		
    )
}