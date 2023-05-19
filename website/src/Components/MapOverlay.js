import React, { useLayoutEffect, useRef , useState,useEffect, memo} from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Heatmap from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Overlay } from 'ol';
import axios from 'axios';
import 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';
import "../CSS/MapOverlay.css"

function formatCoordinate(coordinate, info) {
  if(info) {
    coordinate = toLonLat(coordinate);
    return `
      <table style="width: 200px; font: Monaco; background-color: #e0e5ec">
        <tbody>
          <tr><th>Date:</th><td>${info[1].slice(0, 10)}</td></tr>
          <tr><th>Time:</th><td>${info[1].slice(11, -3)}</td></tr>
          <tr><th>Crime:</th><td>${info[3]}</td></tr>
        </tbody>
      </table>`;
  }
  return `<h1>error</h1>`;
}

const OpenLayersHeatmap = (props) => {
  const mapRef = useRef(null);
  const popUpRef = useRef(null);
  const [data, setData] = useState([]);

  let points2 = null
  points2 = data.slice(0, 5000)
  if(JSON.stringify(props.filters) !== '[]'){
    let i = 0
    for(i; i < props.filters.length; i++) {
      points2 = points2.filter((item) => props.filters.includes(item[4]))
    }
  }
  if(JSON.stringify(props.filters2) !== '[]'){
    let i = 0
    for(i; i < props.filters2.length; i++) {
      points2 = points2.filter((item) => props.filters2.includes(item[3]))
    }
  }
  if(JSON.stringify(props.filters3) !== '[]'){
    let i = 0
    for(i; i < props.filters3.length; i++) {
      points2 = points2.filter((item) => props.filters3.includes(item[9]))
    }
  }
  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://127.0.0.1:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {  
    if (mapRef.current) {
      const points = points2.map(row => [row[12], row[11]])
      let map; 

      if (props.heatmap) {
      let heatmapLayer = new Heatmap({
        source: new VectorSource({
          features: points.map((point) => {
            return new Feature({
              geometry: new Point(fromLonLat(point)),
            });
          }),
        }),
        blur: 5,
        radius: 3.5,
        gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
      });

      map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM({attributions: ''}),
          }),
          heatmapLayer
        ],
        view: new View({
          center: fromLonLat([-76.6122, 39.2904]),
          zoom: 11.7,
        }),
      });
    } else {

      let pointLayer = new VectorLayer({
        source: new VectorSource({
          features: points.map((point) => {
            return new Feature({
              geometry: new Point(fromLonLat(point)),
            });
          }),
        }),
        style: {
          'circle-fill-color': 'red',
          'circle-radius': 4,
        }
      });

      map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM({attributions: ''}),
          }),
          pointLayer
        ],
        view: new View({
          center: fromLonLat([-76.6122, 39.2904]),
          zoom: 11.7,
        }),
      });
    
      const element = popUpRef.current
      const popup = new Overlay({
        element: element,
        stopEvent: false,
      });
      map.addOverlay(popup);

      let popover;
      map.on('click', function (event) {
        if (popover) {
          popover.dispose();
          popover = undefined;
        }
        const feature = map.getFeaturesAtPixel(event.pixel)[0];
        if (!feature) {
          return;
        }
        const coordinate = feature.getGeometry().getCoordinates();
        let lon = Number(toLonLat(coordinate)[0].toFixed(6))
        let lat = Number(toLonLat(coordinate)[1].toFixed(6))
        const found_point = data.slice(0, 5000).filter(item => item[12] === lon).filter(item => item[11] === lat)[0];

        popup.setPosition([
          coordinate[0],
          coordinate[1],
        ]);
        
        popover = new bootstrap.Popover(element, {
          container: element.parentElement,
          content: formatCoordinate(coordinate, found_point),
          html: true,
          offset: [0, 20],
          placement: 'top',
          sanitize: false
        });
        popover.show();

      });

      map.on('pointermove', function (event) {
        const type = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit';
        map.getViewport().style.cursor = type;
      });
    }
      
      return () => {
        map.setTarget(null);
      };
    }
  }, [points2]);

  return <div ref={mapRef} style={{ height: '100vh', width: '100vw' }}><div ref={popUpRef}></div></div>;
};

export default memo(OpenLayersHeatmap);