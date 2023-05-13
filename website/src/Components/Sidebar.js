import React, { useState } from 'react';
import "../CSS/Sidebar.css"

export default function Sidebar(props) {

    return (
            <div className="container-fluid mt-3">
                    <div className={`sidebar ${props.isOpen == true ? 'active' : ''}`}>
                        <div className="sd-header">
                            <h3 className="mb-0"> <b>Select Crime Filters</b></h3>
                            <div className="btn btn-primary" onClick={props.ToggleSidebar}><b>X</b><i className="fa fa-times"></i></div>
                        </div>

                        <div className="sd-body">
                            <ul>
                                <li><a className="sd-link">Menu Item 1</a></li>
                                <li><a className="sd-link">Menu Item 2</a></li>
                                <li><a className="sd-link">Menu Item 3</a></li>
                                <li><a className="sd-link">Menu Item 4</a></li>
                                <li><a className="sd-link">Menu Item 5</a></li>
                                <li><a className="sd-link">Menu Item 6</a></li>
                                <li><a className="sd-link">Menu Item 7</a></li>
                                <li><a className="sd-link">Menu Item 8</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={`sidebar-overlay ${props.isOpen == true ? 'active' : ''}`} onClick={props.ToggleSidebar}></div>
           </div>
    )
}
