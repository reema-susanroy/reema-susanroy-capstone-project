import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import pin from "../../assets/images/pin.png";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import {calculateDistance} from '../../utils/calculateDistance';
import './Map.scss';
import Loading from "../../pages/Loading/Loading";
import ShowProvider from "../ShowProvider/ShowProvider";
import ProvidersComponent from "../ProvidersComponent/ProvidersComponent";
// mapboxgl.workerClass =
//   require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

  // mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Map({serviceId}) {
  let nearbyProviders;
  const [userId, setUserId] = useState('');
  const [userData, setUserData] =useState();
  const [userLat, setUserLat]=useState();
  const [userLon, setUserLon] = useState();
  const [providers, setProviders] =useState();
  const [isLoading , setIsLoading] =useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(20);
  const [viewport, setViewport] = useState({});
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v12"
  );
  const [showProvider, setShowProvider] =useState(false);
  let flag = "servicePage";
  
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

useEffect(()=>{
  const getProviders = async() =>{
    try{
      const providerData = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/providers/${serviceId}`);
      // console.log(providerData.data);
      setProviders(providerData.data);
      setIsLoading(false);
      
    }catch(error){
      console.log("Unable to fetch providers: "+ error);
    }
  }
  getProviders();
}, [])
console.log(providers);

if(!isLoading){
  nearbyProviders = providers.map((provider) => {
    if (calculateDistance(userLocation.latitude, userLocation.longitude, provider.latitude, provider.longitude) <= selectedCategory) {
      return provider;
    }
    // Return null for providers outside the selected category
    return null;
  }).filter(provider => provider !== null);
  
  console.log(nearbyProviders)
}

const handleProviderClick =()=>{
  setShowProvider(true);
  console.log(selectedList);
}
console.log(showProvider);
//   useEffect(() => {
    
//   }, [nearbyProviders]);

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

  if(isLoading){
    return(
      <Loading />
    )
  }
  return (
    <>
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
              {/* <option value="1">Radius 10</option> */}
              {/* <option value="20">Radius 20</option> */}
              <option value="20">Radius 20</option>
              <option value="40">Radius 40</option>
              <option value="60">Radius 60</option>
              <option value="100">Radius 100</option>
            </select>
            <span className="map__filter-arrow"> </span>
          </div>
        </div>
      </div>
      <div>
        <p>Attention! Currently available only in Vancouver.</p> 
      </div>
    
      <ReactMapGL
  initialViewState={{

    latitude: 49.21960831, 
    longitude: -122.90846252 ,
    zoom: 8,
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
      <div onClick={handleProviderClick}>
        <h3>{selectedList.provider_name}</h3>
        <p>Latitude: {selectedList.latitude}</p>
        <p>Longitude: {selectedList.longitude}</p>
      </div>
    </Popup>
  )}
</ReactMapGL>     
    </div>


      {showProvider &&
        // <ShowProvider selectedList={selectedList}/>
        // <ProvidersComponent serviceId={selectedList.service_id} provider = {selectedList} flag={flag} />
        <ShowProvider selectedList={selectedList} flag={flag}/>

      }
      </>
  );
}