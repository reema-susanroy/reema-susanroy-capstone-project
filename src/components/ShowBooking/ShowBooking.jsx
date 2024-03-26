import { timeCalc } from '../../utils/TimeCalc';
import edit from '../../assets/icons/edit.svg';
import del from '../../assets/icons/delete.svg';

function ShowBooking({ showBooking, bookingData }) {
    return (
        <>
        {
            bookingData.length>0  ?
            (<section className='dashboard__details'>
                {bookingData.map((bookings) => (
                    <>
                        <li key={bookings.id} className='dashboard__details--list'>
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
                            {/* <p>Service : {bookings.service_name}</p>
                        <p>Date: {timeCalc(bookings.booked_on)}</p>
                        <p>Provider: {bookings.provider_name}</p> */}
                        </li>
                        <section className='dashboard__image'>
                            <div className='dashboard__image--cont'>
                                <img src={edit} alt="edit" />
                            </div>
                            <div className='dashboard__image--cont'>
                                <img src={del} alt="delete" />
                            </div>
                        </section>
                    </>
                ))}

            </section>) :
            (
                <div> 
                    <h2>No Bookings</h2></div>
            )
        }
            
        </>
    )
}

export default ShowBooking;