import { useState } from "react";
import axios from "axios";

function ProvidersPage(){
const server_url= process.env.REACT_APP_BASE_URL;
    useState(()=> {
        const getProviders= async () =>{
            console.log(`${server_url}/api/providers`);
            console.log(`${process.env.REACT_APP_BASE_URL}/api/providers`);

            try{
                const providerData= await axios.get(`${server_url}/api/providers`);
                console.log(providerData);
            }
            catch(error){
                console.log(error);
            }
        }
        getProviders();
    })
    return (
        <>
        <h2>Service Providers :</h2>


        </>
    )
}

export default ProvidersPage;