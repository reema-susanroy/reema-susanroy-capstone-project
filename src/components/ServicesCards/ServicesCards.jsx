import ServicesListItem from '../ServicesListItem/ServicesListItem';
function ServicesCards({serviceData}){

    return(
        <article className="service-grid">
        {Array.isArray(serviceData) && serviceData.map((services) => (
            <ServicesListItem key={services.id} services={services}/>
            // < key={services.id} services={services} />
          ))}
        </article>
    )
}
export default ServicesCards;