import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import './ServiceDetailsPage.scss';
// import Map from "../../components/Map/Map";
// import { useNavigate } from "react-router-dom";
// import ProvidersPage from "../ProvidersPage/ProvidersPage";
import ProvidersComponent from "../../components/ProvidersComponent/ProvidersComponent";

function ServiceDetailsPage() {
    const { serviceId } = useParams();
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, sethasError] = useState(false);
    const [serviceData, setServiceData] = useState();
    // const [dataFetched, setDataFetched] = useState(false);
    // const [serviceProvided, setServiceProvided] = useState();

    const getServiceData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/services/${serviceId}`);
            setServiceData(response.data);
            // setServiceProvided(response.data.service_provided)
            setIsLoading(false);
            sethasError(false);
            // setDataFetched(true);
        }
        catch (error) {
            sethasError(true);
            setIsLoading(false);
            console.log("Unable to fetch services from the database: " + error);
        }
    };

    useEffect(() => {
        getServiceData();
    }, [serviceId])

    // const handleLook = () => {
    //     navigate('/providers');
    // }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if (hasError) {
        return (
            <ErrorPage />
        )
    }

    return (
        <>
            <div className="service">
                <section className="service__container">

                    {/* <div> */}
                        <div className="service__details">
                            <div className="service__details--cont">
                                <h1 className="service__details--title padding">{serviceData.service_name}</h1>
                                <p className="service__details--description padding">{serviceData.service_description}</p>
                                <p className="service__details--description padding">{serviceData.service_need}</p>
                            </div>
                            <div className="service__background">
                                <img className='service__background--image' src={`${process.env.REACT_APP_BASE_URL}/${serviceData.service_image}`} alt="serviceImage" />
                            </div>
                            {/* <div className="service-cards__cont">
                                <img className="service-cards__image" src={`http://localhost:8080/${serviceData.service_image}`} />
                            </div> */}
                        </div>
                        
                    {/* </div> */}
                    {/* <div className="service__background">
                        <img src={image} alt="service-image"/>
                    </div> */}
                </section>
                <div>
                            <h3 className="service__provided padding">+ Services Include</h3>
                            <ul>
                                {serviceData.service_provided.map((providedService, index) => (
                                    <li className='service__provided--list padding' key={index}>{providedService}</li>
                                ))}
                            </ul>
                            {/* </div> */}
                        </div>
                {/* <div>
                    <h3 className="service__rate padding">+ Rate Plan</h3>
                    <h3 className="service__professional padding">+ See Professtionals</h3>
                </div> */}
            </div>

            <ProvidersComponent serviceId={serviceData.id} />
            {/* <div className="service__location"  style={{ display: 'flex' }}>
                <button className="service__location--pin" onClick={handleLook}>Look for professional</button>
                <form>
                    <input type="text" name="input" placeholder="V3K 3K7 or city" />
                </form>
            </div> */}


            {/* <div className="service__location">
                <h3 className="service__location--pin">Enter loation to find providers near you : </h3>
                <form>
                    <input type="text" name="input" placeholder="V3K 3K7 or city" />
                </form>
            </div> */}

            {/* <div className="map__container">

                <Map />

            </div> */}
        </>

    )
}
export default ServiceDetailsPage;