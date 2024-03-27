import './Booking.scss';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { timeCalc } from '../../utils/TimeCalc';

function Booking() {
    const location = useLocation();
    const { provider } = location.state;
    const { id } = useParams();
    const [userId, setUserId] = useState('');

    const navigate=useNavigate();
    const [providerDate, setProviderDate] = useState();
    const [selectedDate, setSelectedDate] = useState(provider.created_at);
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [errorMessage , setErrorMessage] =useState(false);
    const [uploadForm, setUploadForm] = useState(false);
    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        getAvailability();
    }, [])
    const getAvailability = async () => {
        try {
            const availability = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/providers/booking/${provider.id}/availability`);
            const datesSet = availability.data;
            setProviderDate(datesSet);
        }
        catch (error) {
            console.log("Unable to fetch availability details : " + error);
        }
    }
    const handleDateChange = (value) => {
        setSelectedDate(value);
    }
    const handleDescriptionChange = (value) => {
        setDescription(value);
    };
    const handleAddressChange = (value) => {
        setAddress(value);
    }
    const handleCancel=()=>{
        navigate(`/services/${provider.service_id}`);
    }
    const handleBook =async (event) =>{
        event.preventDefault();
        if(!address || !selectedDate || !description){
            console.log("here?")
            setErrorMessage(true);
        }else{
            try{
                const updateBooking = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/providers/${provider.id}/booking/confirm`, 
                {
                    provider_id: provider.id,
                    user_id: userId,
                    service_id: provider.service_id,
                    issue_description: description,
                    booked_on: timeCalc(selectedDate),
                  }
                );
                setTimeout(()=>{
                    navigate("/services")
                },2000)
            }catch(error){
                console.log("Couldn't update the bookings table:" + error);
            }
            setUploadForm(true);
        }
    }
    return (
        <>
            <h3>Confirm booking with <span> {provider.provider_name} </span> for <span>{provider.service_name} </span>service</h3>
        <form>
            <section className='booking__details--form'>
                <label className="booking__deatils--form--label">Choose a Date :
                    <select className="booking__deatils--form--input choose__date--option" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)}>
                    <option value="">Please choose an option</option>
                        {Array.isArray(providerDate) &&
                            providerDate.map((data) => (
                                <option key={data.id} value={data.date} disabled={data.status === 'booked'}>
                                    {timeCalc(data.date)} {data.status === 'booked' && '(Booked)'}
                                </option>
                            ))}
                    </select>
                </label>
                <label className="booking__deatils--form--label">Address :
                    <textarea className="booking__deatils--form--input" type="text" rows={4} value={address}
                        onChange={(e) => { handleAddressChange(e.target.value); }} />
                </label>
                <label className="booking__deatils--form--label">Issue description :
                    <textarea className="booking__deatils--form--input" type="text" rows={4} value={description}
                        onChange={(e) => { handleDescriptionChange(e.target.value); }} />
                </label>
            </section>
            <button onClick={handleCancel}> Cancel</button>
            <button onClick={handleBook}> Book</button>
        </form>

        {uploadForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <section className='modal__title-cont'>
                            <h2 className='modal__title--title'>Success</h2>
                            <p className='modal__title'>Your booking has confirmed! Taking to homepage</p>
                        </section>
                    </div>
                </div>
            )}

        </>
    )
}

export default Booking;