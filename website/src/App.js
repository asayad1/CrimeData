import React, { useState } from 'react';
import './App.css';
import Map from "./Map/Map.js";
import {Feature} from 'ol/index.js';
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "./Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {Point} from 'ol/geom.js';

// example crime coordinates
const point1 = new Point([-76.6451, 39.3191]); 
const point2 = new Point([-76.5866, 39.3358]);

const App = () => {
  const [center, setCenter] = useState([-76.6122, 39.2904]); // baltimore
  const [zoom, setZoom] = useState(11.7);
return (
  <div>
      <div className="sidebar">
        <button class="nice-button">
          <span>Display Food Security</span>
        </button>
        
        <button class="nice-button">
          <span>Toggle</span>
        </button>
        <br></br>
        <button class="nice-button">
          <span>Toggle</span>
        </button>
      </div>
      <div className="main">
        <table cellSpacing="0" cellPadding="0" width="100%">
          <tbody>
            <tr>
              <td>
                <div className="header">
                  <br/>
                  <h2>CMSC 447 - Baltimore Crime Data Visualization Tool</h2>
                </div>
                <div id="map" className="map">
                  <div id="popup"></div>
                  <Map center={fromLonLat(center)} zoom={zoom}>
                    <Layers>
                      <TileLayer
                        source={osm()}
                        zIndex={0}
                      />
                      <VectorLayer
                        source={vector({ features: [new Feature(point1) ]})}
                        style={{'circle-radius': 4, 'circle-fill-color': 'red'}}
                        zIndex={1}
                      />
                      <VectorLayer
                        source={vector({ features: [new Feature(point2)] })}
                        style={{'circle-radius': 4, 'circle-fill-color': 'red'}}
                        zIndex={2}
                      />
                    </Layers>
                  </Map>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
  </div>
  );
}
export default App;
