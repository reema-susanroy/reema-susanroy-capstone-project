import axios from 'axios';
import { useState } from 'react';
import { timeCalc } from '../../utils/TimeCalc';
import view from '../../assets/icons/view.png';
import del from '../../assets/icons/delete.svg';

function ShowBooking({ bookingData, updateDelete, userId }) {
    const [viewBooking, setViewBooking] = useState(false);
    const [viewDetails, setViewDetails] = useState();

    console.log(bookingData);
    const handleDelete = async (bookingID) => {
        console.log("clicked");
        updateDelete(bookingID);
    }
    const handleEdit = async (bookingID) => {
        setViewBooking(true);
        try {
            const bookingDetails = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/manage-booking/${userId}/${bookingID}`);
            console.log(bookingDetails.data)
            setViewDetails(bookingDetails.data[0]);
        } catch (error) {
            console.log("Unable to fetch booking data :" + error);
        }
    }
    console.log(bookingData);
    return (
        <>
            {bookingData.length > 0 ?
                (<section className='dashboard__details'>
                    {bookingData.map((bookings, index) => (
                        <>
                            <li key={bookings.id} className={`dashboard__details--list ${(index % 2 == 0) ? 'backgroundBrown' : 'backgroundOffwhite'}`}>
                                <div className='data--container'>
                                    <section className='dashboard__details--list--label'>
                                        <p>Service</p>
                                        <p>Date</p>
                                        <p>Provider</p>
                                    </section>
                                    <section className='dashboard__details--list--data'>
                                        <p>: {bookings.service_name}</p>
                                        <p>: {timeCalc(bookings.booked_on)}</p>
                                        <p>: {bookings.provider_name}</p>
                                    </section>
                                </div>
                                
                                <section className='dashboard__image'>
                                <p className={`${(bookings.status === 'completed') ? 'green' : 'orange'}`}>{bookings.status}</p>

                                    <div className='dashboard__image--cont'>
                                        <img className='dashboard__image--cont-item' onClick={() => handleEdit(bookings.id)} src={view} alt="edit" />
                                    </div>
                                    <div className='dashboard__image--cont'>
                                        <img className='dashboard__image--cont-item' onClick={() => handleDelete(bookings.id)} src={del} alt="delete" />
                                    </div>
                                </section>
                            </li>
                        </>
                    ))}
                </section>) :
                (<div> <h2>No Bookings</h2></div>)
            }
            {
                viewBooking && viewDetails &&
                <>
                    {/* <h3 className='booking-details'>Here are the details</h3> */}
                    <div className='booking-details'>
                        <section className='booking-details__item'>
                            <p className='booking-details__label'>Issue Description : </p>
                            <p>{viewDetails.issue_description}</p>
                        </section>
                        <section className='booking-details__item'>
                            <p className='booking-details__label'>Uploaded Image : </p>
                            <div className='booking-details__cont'>
                                <img className='booking-details__cont--image' src={`${process.env.REACT_APP_BASE_URL}${viewDetails.image}`} alt='issue-image' />
                            </div>
                        </section>
                    </div>
                </>
            }
        </>
    )
}

export default ShowBooking;