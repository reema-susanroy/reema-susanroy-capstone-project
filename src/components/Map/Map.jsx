import { useState,useEffect } from "react";
// import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
    console.log("here")
    useEffect(() => {
        const map = L.map('map').setView([49.2827, -123.1207], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        const burnabyMarker = L.marker([49.2827, -122.9786],).addTo(map);
        burnabyMarker.bindPopup('<b>Burnaby</b><br />This is a marker for Burnaby.');
    
        return () => {
          // Cleanup when the component unmounts
          map.remove();
        };
      }, []);
    
      return <div className='map' id="map" />;
}

export default Map;
