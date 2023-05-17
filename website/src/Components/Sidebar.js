import React, { useState,useEffect  } from 'react';
import "../CSS/Sidebar.css"

export default function Sidebar(props) {
    const [entries, setEntries] = useState(["PERSONAL_WEAPONS","HANDGUN","UNKNOWN","OTHER","NA","KNIFE","HANDS","FIREARM","FIRE","BLUNT_OBJECT","AUTOMATIC_HANDGUN","AUTOMATIC_FIREARM","ASPHYXIATION","NULL"]);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [entries2, setEntries2] = useState(["COMMON ASSAULT","BURGLARY","LARCENY FROM AUTO","AUTO THEFT","AGG. ASSAULT","LARCENY","ROBBERY","ROBBERY - COMMERCIAL","RAPE","SHOOTING","ROBBERY - CARJACKING","ARSON","HOMICIDE"])
    const [selectedEntries2, setSelectedEntries2] = useState([]);
    const [entries3, setEntries3] = useState(["CENTRAL","EASTERN","SOUTHEAST","SOUTHERN","NORTHERN","NORTHEAST","SOUTHWEST","NORTHWEST","WESTERN","SD5"])
    const [selectedEntries3, setSelectedEntries3] = useState([]);
    const [clicked, setClicked] = useState(false);

    function handleEntryClick(entry) {
        if(!clicked){
            setClicked(true);
        }else{
            if (selectedEntries.includes(entry)) {
                setSelectedEntries(selectedEntries.filter(e => e !== entry));
            } else {
                setSelectedEntries([...selectedEntries, entry]);
            }
        }
      }
    function handleEntryClick2(entry) {
        if(!clicked){
            setClicked(true);
        }else{
            if (selectedEntries2.includes(entry)) {
                setSelectedEntries2(selectedEntries2.filter(e => e !== entry));
            } else {
                setSelectedEntries2([...selectedEntries2, entry]);
            }
        }
      }
    function handleEntryClick3(entry) {
        if(!clicked){
            setClicked(true);
        }else{
            if (selectedEntries3.includes(entry)) {
                setSelectedEntries3(selectedEntries3.filter(e => e !== entry));
            } else {
            setSelectedEntries3([...selectedEntries3, entry]);
            }
        }
    }
    useEffect(() => {
        props.onDataChanged(selectedEntries);
        props.onDataChanged2(selectedEntries2);
        props.onDataChanged3(selectedEntries3)
    }, [selectedEntries,selectedEntries2,selectedEntries3,props.onDataChanged]);

    return (
            <div className="container-fluid mt-3">
                    <div className={`sidebar ${props.isOpen === true ? 'active' : ''}`}>
                        <div className="sd-header">
                            <h3 className="mb-0"> <b>Select Crime Filters</b></h3>
                            <div className="btn btn-primary" onClick={props.ToggleSidebar}><b>X</b><i className="fa fa-times"></i></div>
                        </div>

                        <div className="sd-body">
                            <ul>
                                <li><a className="sd-link">Weapon Type</a></li>
                                <li>{entries.map(entry => (
                                    <button key={entry} onClick={() => handleEntryClick(entry)}>
                                    {entry}
                                    </button>
                                ))}</li>
                                <li>{selectedEntries.map(entry => (
                                    <span key={entry}>{entry}, </span>
                                ))}</li>

                                <li><a className="sd-link">Crime Type</a></li>
                                <li>{entries2.map(entry => (
                                    <button key={entry} onClick={() => handleEntryClick2(entry)}>
                                    {entry}
                                    </button>
                                ))}</li>
                                <li>{selectedEntries2.map(entry => (
                                    <span key={entry}>{entry}, </span>
                                ))}</li>

                                <li><a className="sd-link">District</a></li>
                                <li>{entries3.map(entry => (
                                    <button key={entry} onClick={() => handleEntryClick3(entry)}>
                                    {entry}
                                    </button>
                                ))}</li>
                                <li>{selectedEntries3.map(entry => (
                                    <span key={entry}>{entry}, </span>
                                ))}</li>
                            </ul>
                        </div>
                    </div>
                    <div className={`sidebar-overlay ${props.isOpen === true ? 'active' : ''}`} onClick={props.ToggleSidebar}></div>
           </div>
    )
}
