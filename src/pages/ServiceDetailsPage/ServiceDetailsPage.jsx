import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";
import './ServiceDetailsPage.scss';

function ServiceDetailsPage() {
    const { serviceId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, sethasError] = useState(false);
    const [serviceData, setServiceData] = useState();

    useEffect(() => {
        const getServiceData = async (id) => {
            try {
                const response = await axios.get(`http://localhost:8080/api/services/${serviceId}`);
                console.log(response.data)
                setServiceData(response.data);
                setIsLoading(false);
                sethasError(false);
            }
            catch (error) {
                sethasError(true);
                setIsLoading(false);
                console.log("Unable to fetch services from the database: " + error);
            }
        }
        getServiceData(serviceId);
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
            <div className="service">
                <div className="service__details">
                    <h1 className="service__details--title">{serviceData.service_name}</h1>
                    <p className="service__details--description">{serviceData.service_description}</p>
                    {/* </div> */}
                    <div className="service-cards__cont">
                        <img className="service-cards__image" src={`http://localhost:8080/${serviceData.service_image}`} />
                    </div>
                </div>
            </div>
            <div className="service__location"> 
                <h3 className="service__location--pin">Enter Zipcode to find providers near you : </h3>
                <form>
                    <input type="text" name="input" placeholder="V3K 3K7"/>
                </form>
            </div>
        </>

    )
}
export default ServiceDetailsPage;