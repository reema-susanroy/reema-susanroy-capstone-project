import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";
import { useNavigate } from "react-router-dom";
import './ProvidersComponent.scss'
import pin from '../../assets/images/pin.png'

function ProvidersComponent({ serviceId , flag}) {
    const server_url = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const [providerData, setProviderData] = useState();
    const [searchLocation, setSearchLocation] = useState("");
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [defaultProviders, setDefaultProviders] = useState(true);
    const [successFilter, setSuccessFilter] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    useState(() => {
        const getProviders = async () => {
            try {
                const serviceProvider = await axios.get(`${server_url}/api/providers/${serviceId}`);
                const serviceProviderData = serviceProvider.data;
                setProviderData(serviceProviderData);
                setDefaultProviders(true);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
        getProviders();
    }, [])

    useEffect(() => {
        const handleSearch = () => {
            if (searchLocation.trim() === "") {
                setDefaultProviders(true);
                setSuccessFilter(false);
                setNotFound(false);
            } else {
                const filtered = providerData.filter(provider => provider.city === searchLocation);
                if (filtered.length === 0) {
                    setNotFound(true);
                }
                else {
                    setFilteredProviders(filtered);
                    setDefaultProviders(false);
                    setSuccessFilter(true);
                    setNotFound(false);
                }
            }
        };
        handleSearch();
    }, [searchLocation, providerData, serviceId]);


    const handleKnowMore = (provider) => {
        // navigate(`/providers/${provider.id}`, { state: { provider } });
        navigate(`/providers/${provider.id}`, {state : {flag}});
    }

    if (isLoading) {
        return <Loading />
    }
    return (
        <>
            <section className="provider--component">
                <h3>Service Providers</h3>
                <div className="provider--component--input">
                    <input className='input' type="text" value={searchLocation} placeholder="Search by City" onChange={(e) => setSearchLocation(e.target.value)} />
                    {/* <button onClick={handleSearch}>Search</button> */}
                </div>
            </section>

            <ul className="provider--list">
                {(defaultProviders ? providerData : []).map((provider) => (
                    <li key={provider.id} className="provider--list__items" onClick={() => handleKnowMore(provider)}>

                        <div className="provider--list__items-wrap">
                            <div className='provider--list__items-provider' >
                                <img className='provider--list-__items-provider-img' src={`${process.env.REACT_APP_BASE_URL}${provider.provider_image}`} alt="provider-image" />
                            </div>
                            <div className="provider--list__items-container">
                                <div className="provider--lists__items-nameCont">
                                    <span>{provider.provider_name} </span>
                                    <div className="provider--lis__items-rating"><p>Rating: {provider.rating} </p></div>
                                </div>
                                <div className="">
                                    <div className="provider--list__items-wrapper">
                                        <div className='provider--list__items-cont' >
                                            <img className='provider--list-__items-img' src={pin} alt="location" />
                                        </div>
                                        <span>{provider.city} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}

                {successFilter && filteredProviders.map((provider) => (
                    <li key={provider.id} className="provider--list__items" onClick={() => handleKnowMore(provider)}>
                        <div className="provider--list__items-wrap">
                            <div className='provider--list__items-provider' >
                                <img className='provider--list-__items-provider-img' src={`${process.env.REACT_APP_BASE_URL}${provider.provider_image}`} alt="provider-image" />
                            </div>
                            <div>
                                <div className="provider--lists__items-nameCont">
                                    <span>{provider.provider_name} </span>
                                    <div className="provider--lis__items-rating"><p>Rating: {provider.rating} </p></div>
                                </div>
                                <div className="">
                                    <div className="provider--list__items-wrapper">
                                        <div className='provider--list__items-cont' >
                                            <img className='provider--list-__items-img' src={pin} alt="location" />
                                        </div>
                                        <span>{provider.city} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {notFound &&
                <div>
                    <p>Sorry, we are not available in this loaction yet. Coming soon.</p>
                </div>
            }
        </>
    )
}

export default ProvidersComponent;