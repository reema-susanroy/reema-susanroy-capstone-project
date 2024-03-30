import { useState } from 'react';
import { useEffect } from 'react';
import ServicesListItem from '../ServicesListItem/ServicesListItem';
function ServicesCards({ serviceData }) {
    const [searchLocation, setSearchLocation] = useState("");
    const [successFilter, setSuccessFilter] = useState(false);
    const [filteredService, setFilteredService] = useState([]);
    useEffect(() => {
        const handleSearch = () => {
            if (searchLocation.trim() === "") {
                setSearchLocation("");
                setSuccessFilter(false);
            } else {
                const filtered = serviceData.filter(service => service.service_name.toLowerCase() === searchLocation.toLowerCase());
                console.log(filtered);
                if (filtered.length === 0) {
                    setSuccessFilter(false);
                }
                else {
                    setFilteredService(filtered);
                    setSuccessFilter(true);
                }
            }
        };
        handleSearch();
    }, [searchLocation, serviceData]);

    return (
        <>
            <div className='service'>
                <p className='service__slogan'>What service are you looking for? </p>
                <form className='service__search'>
                    <label htmlFor='search' />
                    <input className="input" id="search" name='input' placeholder='Search...' onChange={(e) => setSearchLocation(e.target.value)} />
                </form>
            </div>
            <article className="service-grid">
                {successFilter ?
                    (filteredService.map((services) => (
                        <ServicesListItem key={services.id} services={services} />
                    )))
                    :
                    (Array.isArray(serviceData) && serviceData.map((services) => (
                        <ServicesListItem key={services.id} services={services} />
                    )))
                }
            </article>
        </>
    )
}
export default ServicesCards;