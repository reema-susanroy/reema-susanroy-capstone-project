import pin from '../../assets/images/pin.png';
import { useNavigate } from 'react-router-dom';

function ShowProvider({ selectedList ,flag }) {
    const navigate =useNavigate();

    const handleKnowMore = () => {
        // navigate(`/providers/${provider.id}`, { state: { provider } });
        navigate(`/providers/${selectedList.id}`, {state : {flag}});
    }

    return (
        <>
            <div className="providerDetails">
                <section className='providerDetails__data'>

                    {/* <h2 className="providerDetails__name padding">{selectedList.provider_name}</h2> */}

                    <li onClick={handleKnowMore} key={selectedList.id} className="provider--list__items">

                        <div className="provider--list__items-wrap">
                            <div className='provider--list__items-provider' >
                                <img className='provider--list-__items-provider-img' src={`${process.env.REACT_APP_BASE_URL}${selectedList.provider_image}`} alt="provider-image" />
                            </div>
                            <div>
                                <div className="provider--lists__items-nameCont">
                                    <span>{selectedList.provider_name} </span>
                                    <div className="provider--lis__items-rating"><p>Rating: {selectedList.rating} </p></div>
                                </div>
                                <div className="">
                                    <div className="provider--list__items-wrapper">
                                        <div className='provider--list__items-cont' >
                                            <img className='provider--list-__items-img' src={pin} alt="location" />
                                        </div>
                                        <span>{selectedList.city} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                </section>
            </div>
                </>
                )
}

export default ShowProvider;