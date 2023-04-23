import React, { useState } from 'react';
import './App.css';
import Map from "./Map/Map.js";
import {Feature, Overlay} from 'ol/index.js';
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "./Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {Point} from 'ol/geom.js';
import FeatureStyles from "./Features/Styles";
import mapConfig from "./config.json";


const markersLonLat = [[-76.6451, 39.3191], [-76.5866, 39.3358]];
const geojsonObject = mapConfig.geojsonObject;

function addMarkers(lonLatArray) {
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    return feature;
  });
  return features;
}

const App = () => {
  const [center, setCenter] = useState([-76.6122, 39.2904]); // baltimore
  const [zoom, setZoom] = useState(11.7);
  const [features, setFeatures] = useState(addMarkers(markersLonLat));
return (
  <div>
      <div className="sidebar">
        <button className="custom-btn btn-16">
          <span>Display Food Security</span>
        </button>
        
        <button className="custom-btn btn-16">
          <span>Display Crime</span>
        </button>
        
        <button className="custom-btn btn-7">
          <span>Download Report</span>
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
                      <TileLayer source={osm()} zIndex={0} />
                      <VectorLayer source={vector({ features })} style={{'circle-radius': 4, 'circle-fill-color': 'red'}} />
                      <VectorLayer
                        source={vector({
                          features: new GeoJSON().readFeatures(geojsonObject, {
                            featureProjection: get("EPSG:3857"),
                          }),
                        })}
                        style={FeatureStyles.MultiPolygon}
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
