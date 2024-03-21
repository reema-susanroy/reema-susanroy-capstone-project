import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ProviderDetailsPage() {
    const location = useLocation();
    let resultName;
    const { provider } = location.state;
    console.log(provider)
    const { providerId } = useParams();
   
   
    // const getServiceName = () => {
    //     console.log(provider.service_id)
    //     switch (provider.service_id) {
    //         case 1: resultName = "Plumbing";
    //         break;
    //         case 2: resultName = 'Electrical';
    //         break;
    //         case 3: resultName = 'Cleaning';
    //         break;
    //         case 4: resultName = 'Landscaping';
    //         break;
    //         case 5: resultName = 'Painting';
    //         break;
    //         case 6: resultName = 'HVAC';
    //         break;
    //         case 7: resultName = 'Roofing';
    //         break;
    //         case 8: resultName = 'Carpentry';
    //         break;
    //     }
    // }
    // getServiceName();
console.log(resultName)
    return (
        <>
            <h2>{provider.provider_name}</h2>
            <p> Expert in : {provider.service_name}</p>
            <p> Experience : </p>
            <p> Contact Details:</p>
                <p>Phone: {provider.contact_phone}</p>
                <p>Email: {provider.contact_email}</p>

        </>
    )
}

export default ProviderDetailsPage;
