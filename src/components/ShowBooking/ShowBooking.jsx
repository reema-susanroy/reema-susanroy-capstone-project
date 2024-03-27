import { timeCalc } from '../../utils/TimeCalc';
import edit from '../../assets/icons/edit.svg';
import del from '../../assets/icons/delete.svg';

function ShowBooking({bookingData, updateDelete }) {
    console.log(bookingData);
    const handleDelete= async(bookingID) =>{
        console.log("clicked");
        updateDelete(bookingID);
    }
    return (
        <>
            {
                bookingData.length > 0 ?
                    (<section className='dashboard__details'>
                        {bookingData.map((bookings) => (
                            <>
                                <li key={bookings.id} className='dashboard__details--list'>
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
                                        {/* <div className='dashboard__image--cont'>
                                            <img onClick={handleEdit} src={edit} alt="edit" />
                                        </div> */}
                                        <div className='dashboard__image--cont'>
                                            <img onClick={() => handleDelete(bookings.id)} src={del} alt="delete" />
                                        </div>
                                    </section>
                                </li>
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