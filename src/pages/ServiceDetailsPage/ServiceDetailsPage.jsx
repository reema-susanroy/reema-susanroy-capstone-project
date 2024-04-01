import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import './ServiceDetailsPage.scss';
import Map from "../../components/Map/Map";

function ServiceDetailsPage() {
    const { serviceId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, sethasError] = useState(false);
    const [serviceData, setServiceData] = useState();
    const getServiceData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/services/${serviceId}`);
            setServiceData(response.data);
            setIsLoading(false);
            sethasError(false);
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
            <div className="service background-color">
                <section className="service__container">
                    <div className="service__details">
                            <div className="service__details--cont">
                                <div>
                                <h1 className="service__details--title padding">{serviceData.service_name}</h1>
                                <p className="service__details--description padding">{serviceData.service_need}</p>
                                <h3 className="service__provided padding">+ Services Include</h3>
                                <ul>
                                    {serviceData.service_provided.map((providedService, index) => (
                                        <li className='service__provided--list padding' key={index}>{providedService}</li>
                                    ))}
                                </ul>
                                </div>
                            </div>
                        <div className="service__background">
                            <img className='service__background--image' src={`${process.env.REACT_APP_BASE_URL}/${serviceData.service_image}`} alt="serviceImage" />
                        </div>
                    </div>
                </section>
            </div>
            <div className="map__container">
                <Map serviceId={serviceData.id} />
            </div>
        </>
    )
}
export default ServiceDetailsPage;