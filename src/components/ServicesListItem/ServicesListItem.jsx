import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ServiceListItem.scss';

function ServicesListItem({ services }) {
    const navigate = useNavigate;
    const base_url = process.env.REACT_APP_BASE_URL;
    console.log("serviceID :: " + services.id);
    // const handleService = () =>{
    //     navigate('/services/:id');
    // }
    return (
        <>
            <article className='service-cont'>
                <li key={services.id} className="service-cards">
                    <Link to={`/services/${services.id}`} className="service-card">
                        {/* <h3 className="service-cards__name">{services.service_name}</h3> */}
                        <div className="service-cards__cont">
                            <img className="service-cards__image" src={`http://localhost:8080/${services.service_image}`} />
                            <div class="service-cards__name">{services.service_name}</div>
                        </div>
                        {/* <p>{services.service_description}</p> */}
                    </Link>
                </li>


            </article>
        </>
    )
}

export default ServicesListItem;