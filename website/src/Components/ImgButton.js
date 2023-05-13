import React from "react";

import "../CSS/ImgButton.css"

export default function ImgButton(props) {
    return (

        <button title={props.text} className="custom-btn btn-16">
            <img src={props.logo} />
        </button>
    )
}