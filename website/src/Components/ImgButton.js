import React from "react";
import "../CSS/ImgButton.css"

export default function ImgButton() {
    return (
        <button className="custom-btn btn-16">
            <img src={require("../Images/steam.png")} />
        </button>
    )
}