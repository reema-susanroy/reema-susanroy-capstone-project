import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import ServicesCards from "../../components/ServicesCards/ServicesCards";
import Loading from "../Loading/Loading";
import ErrorPage from "../ErrorPage/ErrorPage";

function ServicesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, sethasError] = useState(false);
    const [serviceData, setServiceData] = useState();

    useEffect(() => {
        const getServices = async () => {
            try {
                console.log(`${process.env.REACT_APP_BASE_URL}/api/services`);
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/services`);
                setIsLoading(false);
                sethasError(false);
                setServiceData(response.data);
            }
            catch (error) {
                sethasError(true);
                setIsLoading(false);
                console.log("Unable to fetch services from the database: " + error);
            }
        }
        getServices();
    },[])
    if(isLoading){
        return(
            <Loading />
        )
    }

    if(hasError){
        return(
            <ErrorPage />
        )
    }
    return (
        <>
            <main>
                <Hero />
                <ServicesCards serviceData={serviceData}/>
            </main>

        </>
    )
}

export default ServicesPage;