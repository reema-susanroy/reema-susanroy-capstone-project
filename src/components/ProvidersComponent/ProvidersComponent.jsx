import { useState } from "react";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";
import { useNavigate } from "react-router-dom";

function ProvidersComponent({ serviceId }) {
    const server_url = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const [providerData, setProviderData] = useState();
    const [searchLocation, setSearchLocation] = useState("");
    const [filteredProviders, setFilteredProviders] = useState([]);
    const [defaultProviders, setDefaultProviders] = useState(true);
    const [successFilter, setSuccessFilter] = useState(false);
    const [isLoading,setIsLoading]=useState(true);


    useState(() => {
        const getProviders = async () => {
            try {
                // const providerData = await axios.get(`${server_url}/api/providers`);
                // setProviderData(providerData.data);
                const serviceProvider = await axios.get(`${server_url}/api/providers/${serviceId}`);
                const serviceProviderData=serviceProvider.data;
                console.log(serviceProviderData);
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
    },[])

    const handleSearch = () => {
        console.log("clicked")
        const filtered = providerData.filter(provider => provider.city === searchLocation);
        setFilteredProviders(filtered);
        console.log(filtered);
        setDefaultProviders(false);
        setSuccessFilter(true);

    };
    const handleKnowMore =(provider) => {
        // navigate(`/providers/:id`);
        console.log(provider)
        navigate(`/providers/${provider.id}`,{ state: { provider} });

    }

    if(isLoading){
       return <Loading />
    }
    console.log(providerData);
    return (
        <>
            <h3>Service Providers :</h3>
            <input type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {(defaultProviders ? providerData : []).map((provider) => (
                    <li key={provider.id}>
                        <p>Name: {provider.provider_name} </p>
                        {/* <p>Contact: {provider.contact_phone} </p>
                        <p>Email: {provider.contact_email} </p> */}
                        <p>City: {provider.city} </p>
                        <p>Rating: {provider.rating} </p>
                        <button onClick={() => handleKnowMore(provider)}>Know More..</button>
                    </li>
                ))}

                {successFilter && filteredProviders.map((provider) => (
                    <li key={provider.id}>
                        <p>Name: {provider.provider_name} </p>
                        {/* <p>Contact: {provider.contact_phone} </p>
                        <p>Email: {provider.contact_email} </p> */}
                        <p>City: {provider.city} </p>
                        <p>Rating: {provider.rating} </p>
                        <button onClick={() => handleKnowMore(provider)}>Know More..</button>
                    </li>
                ))}
            </ul>


        </>
    )
}

export default ProvidersComponent;