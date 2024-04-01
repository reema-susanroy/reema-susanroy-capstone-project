import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import pin from "../../assets/images/pin.png";
import axios from "axios";
import mapboxgl from "mapbox-gl";
import { calculateDistance } from '../../utils/calculateDistance';
import './Map.scss';
import Loading from "../../pages/Loading/Loading";
import ShowProvider from "../ShowProvider/ShowProvider";
import ProvidersComponent from "../ProvidersComponent/ProvidersComponent";
// mapboxgl.workerClass =
//   require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

// mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Map({ serviceId }) {
  let nearbyProviders;
  const [userId, setUserId] = useState('');
  const [city, setCity] = useState("Coquitlam");
  const [userData, setUserData] = useState();
  const [userLat, setUserLat] = useState();
  const [userLon, setUserLon] = useState();
  const [providers, setProviders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(20);
  const [viewport, setViewport] = useState({});
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v12"
  );
  const [showProvider, setShowProvider] = useState(false);
  let flag = "servicePage";

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
    // console.log(userId);
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}`);
        console.log(data.data[0])
        setUserData(data.data[0]);
      } catch (error) {
        console.log("Cn't fetch user data :" + error);
      }

    }
    getUser();
  }, [userId])
  const handleCityChange = (value) => {
    setCity(value);
  }

  // const userLocation = { latitude: 49.28505325, longitude: -122.79459381 };
  useEffect(()=>{
    const getUserData =async ()=>{
      console.log("hi")
      try{
        const getUserLocation= await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
        console.log(getUserLocation.data);
        const canadaData = (getUserLocation.data).filter(entry => entry.display_name.includes("Canada"));
        console.log(canadaData);
        // console.log(getUserLocation.data[0].lat);
        // setUserLat(getUserLocation.data[0].lat);
        // console.log(getUserLocation.data[0].lon);
        // setUserLon(getUserLocation.data[0].lon);
        console.log(canadaData[0].lat);
        setUserLat(canadaData[0].lat);
        console.log(canadaData[0].lon);
        setUserLon(canadaData[0].lon);
      }
      catch(error){
        console.log("Unable to fetch longitude and latitude : "+error);
      }
    }
    getUserData();
  },[city])

  useEffect(() => {
    const getProviders = async () => {
      try {
        const providerData = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/providers/${serviceId}`);
        // console.log(providerData.data);
        setProviders(providerData.data);
        setIsLoading(false);

      } catch (error) {
        console.log("Unable to fetch providers: " + error);
      }
    }
    getProviders();
  }, [])
  console.log(providers);

  if (!isLoading) {
    nearbyProviders = providers.map((provider) => {
      // if (calculateDistance(userLocation.latitude, userLocation.longitude, provider.latitude, provider.longitude) <= selectedCategory) {
      if (calculateDistance(userLat, userLon, provider.latitude, provider.longitude) <= selectedCategory) {
        return provider;
      }
      // Return null for providers outside the selected category
      return null;
    }).filter(provider => provider !== null);

    console.log(nearbyProviders)
  }

  const handleProviderClick = () => {
    setShowProvider(true);
    console.log(selectedList);
  }
  console.log(showProvider);

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

  if (isLoading) {
    return (
      <Loading />
    )
  }
  return (
    <>
      <div className="map-provider-container">

        <div

          style={{ width: "100%", height: "calc(100% - 100px)" }}

        >
          <div className="map__filter">
            <div>
              <label className="map__filter-label">Enter your City :
                <input className="map__filter-select" type="text" placeholder="City" value={city}
                  onChange={(e) => { handleCityChange(e.target.value); }} />
              </label>

            </div>
            <div className="map__filter-bott">

              <label>Search providers near you : </label>
              <div className="map__filter-selector">
                <select
                  className="map__filter-select"
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  {/* <option value="1">Radius 10</option> */}
                  {/* <option value="20">Radius 20</option> */}
                  <option value="20">Within 20Km</option>
                  <option value="40">Within 40Km</option>
                  <option value="60">Within 60Km</option>
                  <option value="100">Within 100Km</option>
                </select>
                <span className="map__filter-arrow"> </span>
              </div>
            </div>
          </div>
          <div>
            <p className="map__notice">Attention! Currently available only in Lower Main land British Columbia.</p>
          </div>

          <ReactMapGL style={{ width: "100%", height: "80%" }}
            initialViewState={{

              latitude: 49.21960831,
              longitude: -122.90846252,
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
                <div onClick={handleProviderClick} className="map__popup">
                  <h3>{selectedList.provider_name}</h3>
                  <p>Latitude: {selectedList.latitude}</p>
                  <p>Longitude: {selectedList.longitude}</p>
                </div>
              </Popup>
            )}
          </ReactMapGL>

          {showProvider &&
            <>
              <div className="show--provider">
                <ShowProvider selectedList={selectedList} flag={flag} />
              </div>
            </>
          }
        </div>
      </div>
    </>
  );
}