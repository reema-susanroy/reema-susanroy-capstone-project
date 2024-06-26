import { useEffect, useState } from 'react';
import './ProviderDetailsPage.scss'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { TimeFormat } from '../../utils/TimeFormat';
import Loading from "../Loading/Loading";
import star from '../../assets/icons/star.svg'
import black from '../../assets/icons/blac-star.png'
import LoginPopUp from '../../components/LoginPopUp/LoginPopUp';
import { useAuth } from '../../utils/AuthContext';

//To fetch details of selected provider based on :id from url and disply on the UI.
function ProviderDetailsPage() {
    const { login } = useAuth();
    const { id } = useParams(); //providerId
    const [provider, setProvider] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [reviewContent, setReviewContent] = useState();
    const [isFavorite, setIsFavorite] = useState();
    const [pricing, setPricing] = useState();
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [loggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    });

    useEffect(() => {
        const getProviderData = async () => {
            try {
                const providerData = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/providers/provider/${id}`)
                setProvider(providerData.data[0]);
                setIsFavorite(providerData.data[0].isFavorite);
                setPricing(providerData.data[0].pricing);
                setIsLoading(false);
            } catch (error) {
                console.log("Unable to load provider details :" + error);
            }
        }
        getProviderData();
    }, [id])

    //To fetch and display reviews of the provider from reviews table.
    useEffect(() => {
        const getReviews = async () => {
            try {
                const review = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/providers/${id}/reviews`);
                setIsLoading(false);
                setReviewContent(review.data);
            } catch (error) {
                setIsLoading(false);
                console.log("Error while fecthing reviews: " + error);
            }
        }
        getReviews();
    }, [id]);

    const serviceList = pricing && Object.entries(pricing).map(([serviceName, price]) => ({
        serviceName,
        price
    }));

    const toggleFavorite = async () => {
        if(userId !==""){
            try {
                await axios.put(`${process.env.REACT_APP_BASE_URL}/api/providers/${id}/favorite`, {
                    isFavorite: !isFavorite
                });
                setIsFavorite(!isFavorite);
            } catch (error) {
                console.error('Error toggling favorite status:', error);
            }
        }else{
            setLoggedIn(false); 
        }
        
    };

    const handleGoBack = () => {
        navigate(-1);
    }
    const handleBook = () => {
        if (userId !== '') {
            setLoggedIn(true);
            navigate(`/booking/${id}`);
            login();
        } else {
            setLoggedIn(false);
        }
    }
    const closePopup = () => {
        setLoggedIn(true);
    }
    if (isLoading) {
        return (
            <Loading />
        )
    }
    return (
        <>
            {provider && (
                <div className="providerDetails">
                    <section className='providerDetails__data'>
                        <section className='providerDetails__avatar--cont'>
                            <div className="providerDetails__data--avatar--cont">
                                <img className='providerDetails__data--avatar--img' src={`${process.env.REACT_APP_BASE_URL}${provider.provider_image}`} alt="provider"/>
                            </div>
                            {/* {userId && */}
                            <div className='providerDetails__favorite--cont'>
                                <img onClick={toggleFavorite} src={isFavorite ? black : star} alt="favorite" />
                            </div>
                            {/* } */}
                        </section>
                        <h2 className="providerDetails__name padding">{provider.provider_name}</h2>
                        <section className='provider--details'>
                            <div className='provider--Details__container'>
                                <div className='provider--Details__container--experience'>
                                    <p className="providerDetails__data--data padding"> Expertise: {provider.service_name}</p>
                                    <p className="providerDetails__data--data padding"> Experience : {provider.experience}</p>
                                    <p className="providerDetails__data--data padding"> Contact Details:</p>
                                    <p className="providerDetails__data--data--value padding">Phone: {provider.contact_phone}</p>
                                    <p className="providerDetails__data--data--value padding">Email: {provider.contact_email}</p>
                                </div>
                            </div>
                            <ul>
                                <p className="providerDetails__data--data" >Service Charge:</p>
                                {serviceList.map((service, index) => (
                                    <li className='providerDetails__provided--list padding' key={index}>
                                        {service.serviceName} : {service.price}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </section>
                </div>
            )}
            <section className='provider__reviews'>
                <h3 className='provider__reviews--review'>Reviews</h3>
                {Array.isArray(reviewContent) && reviewContent.map((review, index) => (
                    <li key={index} className={`provider__reviews__list ${(index % 2 === 0) ? 'backgroundTeal' : 'backgroundWhite'}`}>
                        <div className='provider__reviews__list--cont'>
                            <div className='provider__reviews__list--image padding'></div>
                            <div className='provider__reviews__list--details'>
                                <div className='provider__reviews__list--details--data'>
                                    <p className={`provider__reviews__list--name padding ${(index % 2 === 0) ? 'backgroundTeal' : 'backgroundWhite'}`}>{review.user_name}</p>
                                    <p className='provider__reviews__list--date padding'>{TimeFormat(review.created_at)}</p>
                                </div>
                                <div className='provider__reviews__list--dateCont'>
                                    <p className={`provider__reviews__list--review padding ${(index % 2 === 0) ? 'backgroundTeal' : 'backgroundWhite'}`}>{review.user_review}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </section>
            <section className='button__cont'>
                <button className='button__cont--item' onClick={handleGoBack}>Go Back</button>
                <button className='button__cont--item' onClick={handleBook}>Book</button>
            </section>
            {(loggedIn === false) &&
                <section className='login--popup'>
                    <LoginPopUp provider={provider} providerId={id} onClose={closePopup} />
                </section>
            }
        </>
    )
}

export default ProviderDetailsPage;
