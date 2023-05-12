import React, { useLayoutEffect, useRef , useState,useEffect} from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Heatmap from 'ol/layer/Heatmap';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Overlay } from 'ol';
import axios from 'axios';


const OpenLayersHeatmap = () => {
  const mapRef = useRef(null);
  const [data, setData] = useState([]);

  const points2 = data.map(row => [row[12], row[11]]);
  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://127.0.0.1:5000/api/data')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {  
    if (mapRef.current) {
      const points = points2

      const heatmapLayer = new Heatmap({
        source: new VectorSource({
          features: points.map((point) => {
            return new Feature({
              geometry: new Point(fromLonLat(point)),
            });
          }),
        }),
        blur: 5,
        radius: 2,
        gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
      });

      const pointLayer = new VectorLayer({
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

      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM({attributions: ''}),
          }),
          pointLayer,
          heatmapLayer
        ],
        view: new View({
          center: fromLonLat([-76.6122, 39.2904]),
          zoom: 11.7,
        }),
      });
      return () => {
        map.setTarget(null);
      };
    }
  }, [points2]);

  return <div ref={mapRef} style={{ height: '100vh', width: '100vw' }}></div>;
};

export default OpenLayersHeatmap;
