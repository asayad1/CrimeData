import React, { useLayoutEffect, useRef } from 'react';
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
import 'react-bootstrap';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bootstrap from 'bootstrap/dist/js/bootstrap.js';

function formatCoordinate(coordinate) {
  coordinate = toLonLat(coordinate);
  return `
    <table width="200px" font="Monaco">
      <tbody>
        <tr><th>Day:</th><td>5/11/23</td></tr>
        <tr><th>Time:</th><td>10:29 am</td></tr>
        <tr><th>Crime:</th><td>robbery</td></tr>
        <tr><th>Weapon:</th><td>gun</td></tr>
        <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
        <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
      </tbody>
    </table>`;
}

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

      const element = document.getElementById('popup');
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
        popup.setPosition([
          coordinate[0],
          coordinate[1],
        ]);

        popover = new bootstrap.Popover(element, {
          container: element.parentElement,
          content: formatCoordinate(coordinate),
          html: true,
          offset: [0, 20],
          placement: 'top',
          sanitize: false,
          backgound: 'tomato'
        });
        popover.show();
      });

      map.on('pointermove', function (event) {
        const type = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit';
        map.getViewport().style.cursor = type;
      });

    }
  }, []);

  return <div ref={mapRef} style={{ height: '100vh', width: '100vw' }}><div id="popup"></div></div>;
};

export default OpenLayersHeatmap;
