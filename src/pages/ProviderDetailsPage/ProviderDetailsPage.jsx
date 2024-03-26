import { useEffect, useState } from 'react';
import './ProviderDetailsPage.scss'
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { TimeFormat } from '../../utils/TimeFormat';
import Loading from "../Loading/Loading";
import star from '../../assets/icons/star.svg'
import fullstar from '../../assets/icons/full-star.svg'
import star1 from '../../assets/icons/star-1.png'
import star2 from '../../assets/icons/star-2.png'
import black from '../../assets/icons/blac-star.png'



function ProviderDetailsPage() {
    const location = useLocation();
    const { provider } = location.state;
    console.log(provider)
    const { id } = useParams(); //serviceid

    const [isLoading, setIsLoading] = useState(true);
    const [reviewContent, setReviewContent] = useState();
    const [isFavorite, setIsFavorite] = useState(provider.isFavorite);
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        const getReviews = async () => {
            try {
                const review = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/providers/${provider.id}/reviews`);
                console.log("hi");
                // const favorite = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}/providers/${id}/favorite`);
                // const reviewData = review.data;
                console.log(review.data);
                setIsLoading(false);
                setReviewContent(review.data);

            } catch (error) {
                setIsLoading(false);
                console.log("Error while fecthing reviews: " + error);
            }
        }
        getReviews();
    }, []);

    const serviceList = Object.entries(provider.pricing).map(([serviceName, price]) => ({
        serviceName,
        price
    }));

    const toggleFavorite = async () => {
        console.log("like")
        try {
          // Update the favorite status in the database
          await axios.put(`${process.env.REACT_APP_BASE_URL}/api/providers/${provider.id}/favorite`, { 
            // user_id : userId,
            // provider_id:provider.id,
            isFavorite : !isFavorite
           });
        console.log("liked")
          setIsFavorite(!isFavorite);
        } catch (error) {
          console.error('Error toggling favorite status:', error);
        }
      };

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
    const handleGoBack = () => {
        navigate(`/services/${id}`)
    }
    const handleBook = () => {
        navigate(`/booking/${provider.id}`, { state: { provider } });

    }
    if(isLoading){
        return (
            <Loading />
        )
    }
    console.log(provider.pricing)
    return (
        <>
            <div className="providerDetails">
                <section className='providerDetails__data'>

                    <h2 className="providerDetails__name padding">{provider.provider_name}</h2>
                    <section>
                        <div className='provider--Details__container'>
                            <div className='provider--Details__container--experience'>
                                <p className="providerDetails__data--service padding"> Expertise: {provider.service_name}</p>
                                <p className="providerDetails__data--exp padding"> Experience : </p>
                            </div>
                            <div>
                                <p className="providerDetails__data--contact padding"> Contact Details:</p>
                                <p className="providerDetails__data--contact--value padding">Phone: {provider.contact_phone}</p>
                                <p className="providerDetails__data--contact--value padding">Email: {provider.contact_email}</p>
                            </div>
                        </div>


                        <ul>
                            {serviceList.map((service, index) => (
                                <li className='service__provided--list padding' key={index}>
                                    <strong>{service.serviceName}</strong>: {service.price}
                                </li>
                            ))}
                        </ul>


                    </section>


                </section>
                <section className='providerDetails__avatar--cont'>
                    {/* <p className="providerDetails__data--avatar"> </p> */}
                    <div className="providerDetails__data--avatar--cont">
                        <img className='providerDetails__data--avatar--img' src={`${process.env.REACT_APP_BASE_URL}${provider.provider_image}`} />
                    </div>
                </section>
                <section>
                    <div className='providerDetails__favorite--cont'>
                        <img onClick={toggleFavorite} src={isFavorite ? black : star} alt="favorite" />
                    </div>
                </section>
            </div>
            <section className='provider__reviews'>
                <h3 className='provider__reviews--review'>Reviews</h3>
                {Array.isArray(reviewContent) && reviewContent.map((review, index) => (
                    <li key={index} className='provider__reviews__list'>
                        <div className='provider__reviews__list--cont'>
                            <div className='provider__reviews__list--image padding'></div>
                            <div className='provider__reviews__list--details'>
                                <div className='provider__reviews__list--details--data'>
                                    <p className='provider__reviews__list--name padding'>{review.user_name}</p>
                                    <p className='provider__reviews__list--date padding'>{TimeFormat(review.created_at)}</p>

                                </div>
                                <div className='provider__reviews__list--dateCont'>
                                    <p className='provider__reviews__list--review padding'>{review.user_review}</p>

                                </div>
                            </div>

                        </div>
                    </li>
                ))}
            </section>
            <section className='button__cont'>
                <button className='button__cont--item' onClick={handleGoBack}>Go Back</button>
                {/* <Link to = {`/booking/${provider.id}`}  > */}
                <button className='button__cont--item' onClick={handleBook}>Book</button>
                {/* </Link> */}
            </section>
        </>
    )
}

export default ProviderDetailsPage;
