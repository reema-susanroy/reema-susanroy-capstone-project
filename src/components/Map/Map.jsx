import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import pin from "../../assets/images/pin.png";
import axios from "axios";
import { calculateDistance } from '../../utils/calculateDistance';
import './Map.scss';
import Loading from "../../pages/Loading/Loading";
import ShowProvider from "../../components/ShowProvider/ShowProvider";
import ProvidersComponent from "../ProvidersComponent/ProvidersComponent";

export default function Map({ serviceId }) {
  let nearbyProviders;
  const [city, setCity] = useState();
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

  const handleCityChange = (value) => {
    setCity(value);
  }

  //User input city is sent to openStreetMap free api to calculate latitude and longitude.
  useEffect(()=>{
    const getUserData =async ()=>{
      try{
        const getUserLocation= await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
        const canadaData = (getUserLocation.data).filter(entry => entry.display_name.includes("Canada"));
        setUserLat(canadaData[0].lat);
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
        setProviders(providerData.data);
        setIsLoading(false);

      } catch (error) {
        console.log("Unable to fetch providers: " + error);
      }
    }
    getProviders();
  }, [])

  if (!isLoading) {

    //Calculate the user's distance from the providers using Haversine formula
    nearbyProviders = providers.map((provider) => {
      if (calculateDistance(userLat, userLon, provider.latitude, provider.longitude) <= selectedCategory) {
        return provider;
      }
      return null;
    }).filter(provider => provider !== null);
  }

  const handleProviderClick = () => {
    setShowProvider(true);
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }
  return (
    <>
      <div className="map-provider-container">
        <div className="map-provider-container__dimension" >
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
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            mapStyle={mapStyle}
            // onDblClick={handleAddClick}
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