import { Link } from 'react-router-dom';
import './ServiceListItem.scss';

function ServicesListItem({ services }) {
    return (
        <>
            <article className='service-cont'>
                <li key={services.id} className="service-cards">
                    <Link to={`/services/${services.id}`} className="service-card">
                        <div className="service-cards__cont">
                            <img className="service-cards__image" src={`${process.env.REACT_APP_BASE_URL}/${services.service_image}`} />
                            <div class="service-cards__name">{services.service_name}</div>
                        </div>
                    </Link>
                </li>
            </article>
        </>
    )
}

export default ServicesListItem;