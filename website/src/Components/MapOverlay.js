import React, { useLayoutEffect, useRef } from 'react';
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


const OpenLayersHeatmap = () => {
  const mapRef = useRef(null);

  useLayoutEffect(() => {
    if (mapRef.current) {
      const points = [
        [-76.6122, 39.2904],
        [-76.6053, 39.2835],
        [-76.5932, 39.2881],
        [-76.6023, 39.2915],
        [-76.5959, 39.2831],
        [-76.5959, 39.2801],
        [-76.5959, 39.2801],
        [-76.5959, 39.2801],
        [-76.5959, 39.2801]
      ];

      const heatmapLayer = new Heatmap({
        source: new VectorSource({
          features: points.map((point) => {
            return new Feature({
              geometry: new Point(fromLonLat(point)),
            });
          }),
        }),
        blur: 20,
        radius: 10,
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
    }
  }, []);



  
  return <div ref={mapRef} style={{ height: '100vh', width: '100vw' }}></div>;
};

export default OpenLayersHeatmap;
