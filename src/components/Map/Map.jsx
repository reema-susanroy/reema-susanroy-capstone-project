import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import pin from "../../assets/images/pin.png";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import {calculateDistance} from '../../utils/calculateDistance';
import './Map.scss';
// mapboxgl.workerClass =
//   require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

  // mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Map() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] =useState();
  const [userLat, setUserLat]=useState();
  const [userLon, setUserLon] = useState();

  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(20);
  const [viewport, setViewport] = useState({});
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v12"
  );

  
  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
        setUserId(storedUserId);
    }
    // console.log(userId);
});

useEffect(()=>{
  const getUser = async () =>{
    try{
      const data=await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}`);
      console.log(data.data[0])
      setUserData(data.data[0]);
    }catch(error){
      console.log("Cn't fetch user data :"+error);
    }

    }
      getUser();
},[userId])


const userLocation = { latitude: 49.28505325 , longitude: -122.79459381 };
// useEffect(()=>{
//   const getUserData =async ()=>{
//     try{
//       const getUserLocation= await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${userData.city}`);
//       console.log(getUserLocation.data[0].lat);
//       setUserLat(getUserLocation.data[0].lat);
//       console.log(getUserLocation.data[0].lon);
//       setUserLon(getUserLocation.data[0].lon);
//     }
//     catch(error){
//       console.log("Unable to fetch longitude and latitude : "+error);
//     }
//   }
//   getUserData();
// }, [])

const providers = [
  { id: 1, name: 'Provider 1', latitude: 49.24377441  , longitude: -122.98169708},
  { id: 2, name: 'Provider 2', latitude: 49.21960831  , longitude: -122.90846252},
  { id: 3, name: 'Provider 3', latitude: 43.85487366  , longitude: -79.51236725},
  { id: 4, name: 'Provider 4', latitude:  49.10460281  , longitude:  -122.82350922},
  { id: 5, name: 'Provider 5', latitude:  49.26356506  , longitude:  -123.13857269},
  { id: 6, name: 'Provider 6', latitude:  49.09020996  , longitude: -123.06526947},
];

const nearbyProviders = providers.filter(provider =>
  calculateDistance(userLocation.latitude, userLocation.longitude, provider.latitude, provider.longitude) <= selectedCategory
);

  useEffect(() => {
    
  }, [nearbyProviders]);

  const handleAddClick = (e) => {
    const { lng, lat } = e.lngLat;
    console.log(lng, lat);
      };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
    } catch (error) {
    }
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="map__filter">
        <div className="map__filter-top">
        </div>
        <div className="map__filter-bott">
          <div className="map__filter-selector">
            <select
              className="map__filter-select"
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="40">Radius 40</option>
              <option value="60">Radius 60</option>
              <option value="80">Radius 80</option>
              <option value="100">Radius 100</option>
            </select>
            <span className="map__filter-arrow"> </span>
          </div>
        </div>
      </div>
      <div>
        <p>Disclamier! Currently available only in Vancouver and Toronto.</p>
      </div>
    
      <ReactMapGL
  initialViewState={{

    latitude: 49.28505325, 
    longitude: -122.79459381 ,
    // latitude: 49.24377441,
    // longitude: -122.98169708,
    zoom: 10,
  }}
  {...viewport}
  onViewportChange={(newViewport) => {
    setViewport(newViewport);
  }}
  mapboxAccessToken={
    "pk.eyJ1IjoiYXNodXRrb3ZhIiwiYSI6ImNsaGduYnVtNzBhNmgzZ3Joc3Y4aDZ5Zm4ifQ.chMAXW-muUbStSja3v5htA"
  }
  mapStyle={mapStyle}
  onDblClick={handleAddClick}
>
  {nearbyProviders.map((provider) => (
    <Marker
      key={provider.id}
      latitude={provider.latitude}
      longitude={provider.longitude}
    >
      <img
        src={pin}
        alt="provider-pin"
        className="provider-pin"
        onClick={() => {
          setSelectedList(provider);
          setPopupOpen(true);
        }}
      />
    </Marker>
  ))}

  {popupOpen && selectedList && (
    <Popup
      latitude={selectedList.latitude}
      longitude={selectedList.longitude}
      onClose={() => {
        setPopupOpen(false);
      }}
      closeOnClick={false}
      anchor="top"
    >
      <div>
        <h3>{selectedList.name}</h3>
        <p>Latitude: {selectedList.latitude}</p>
        <p>Longitude: {selectedList.longitude}</p>
      </div>
    </Popup>
  )}
</ReactMapGL>


      {/* <ReactMapGL
        initialViewState={{
          latitude: 49.24377441,
          longitude: -122.98169708,
          zoom: 12,
        }}
        {...viewport}
        onViewportChange={(newViewport) => {
          setViewport(newViewport);
        }}
        mapboxAccessToken={
          "pk.eyJ1IjoiYXNodXRrb3ZhIiwiYSI6ImNsaGduYnVtNzBhNmgzZ3Joc3Y4aDZ5Zm4ifQ.chMAXW-muUbStSja3v5htA"
        }
        mapStyle={mapStyle}
        onDblClick={handleAddClick}
      >
         nearbyProviders.forEach(provider => {
                <React.Fragment >
              <Marker
                latitude= {49.24377441}
                longitude= {-122.98169708}
                onClick={(values) => {
                  setPopupOpen();
                }}
              >
               </Marker>

              {popupOpen && (
                <Popup
                  latitude={selectedList?.lat}
                  longitude={selectedList?.lng}
                  onClose={() => {
                    setPopupOpen(false);
                  }}
                  closeOnClick={false}
                  anchor="top"
                > 
                </Popup>
              )}
            </React.Fragment>
            });
      </ReactMapGL> */}
      
    </div>
  );
}


// import { useState,useEffect } from "react";
// // import ReactMapGL, { Marker, Popup } from 'react-map-gl';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// function Map() {
//     console.log("here")
//     useEffect(() => {
//         const map = L.map('map').setView([49.2827, -123.1207], 13);
//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
//         const burnabyMarker = L.marker([49.2827, -122.9786],).addTo(map);
//         burnabyMarker.bindPopup('<b>Burnaby</b><br />This is a marker for Burnaby.');
    
//         return () => {
//           // Cleanup when the component unmounts
//           map.remove();
//         };
//       }, []);
    
//       return <div className='map' id="map" />;
// }

// export default Map;
