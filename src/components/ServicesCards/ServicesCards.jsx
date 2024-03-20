import ServicesListItem from '../ServicesListItem/ServicesListItem';
function ServicesCards({serviceData}){

    return(
        <>
        {Array.isArray(serviceData) && serviceData.map((services) => (
            <ServicesListItem key={services.id} services={services}/>
            // < key={services.id} services={services} />
          ))}
        </>
    )
}
export default ServicesCards;