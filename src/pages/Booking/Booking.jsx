import './Booking.scss';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Booking() {
    const location = useLocation();
    const { provider } = location.state;
    console.log(provider)
    const { id } = useParams();

    const navigate=useNavigate();
    const [providerDate, setProviderDate] = useState();
    const [selectedDate, setSelectedDate] = useState(provider.created_at);
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [errorMessage , setErrorMessage] =useState(false);
    const [uploadForm, setUploadForm] = useState(false);


    useEffect(() => {
        getAvailability();
    }, [])
    const getAvailability = async () => {
        try {
            const availability = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/providers/booking/${provider.id}/availability`);
            const datesSet = availability.data;
            setProviderDate(datesSet);
            // console.log(providerDate)
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

    const handleBook =async (event) =>{
        event.preventDefault();
        console.log("clicked")
        console.log(address + selectedDate + description);
        if(!address || !selectedDate || !description){
            console.log("here?")
            setErrorMessage(true);
        }else{
            try{
                console.log("2")
                const updateBooking = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/providers/${provider.id}/booking/confirm`, 
                {
                    provider_id: provider.id,
                    user_id: 1,
                    service_id: provider.service_id,
                    issue_description: description,
                    booked_on: timeCalc(selectedDate),
                  }
                );
                // setTimeout(()=>{
                //     navigate("/")
                // },3000)
            }catch(error){
                console.log("3")
                console.log("Couldn't update the bookings table:" + error);
            }
            setUploadForm(true);
        }
    }

    const closePopup =() =>{

    }
    const timeCalc = (data) => {
        const date = new Date(data)
        const utcString = date.toISOString();
        const month = new Date(utcString).getUTCMonth() + 1;
        const dateValue = new Date(utcString).getUTCDate();
        const year = new Date(utcString).getUTCFullYear();
        return (`${year}/${month}/${dateValue}`);
    }
    // console.log(providerDate)
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

            <button onClick={handleBook}> Book</button>
        </form>

        {uploadForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <section className='modal__title-cont'>
                            <h2 className='modal__title--title'>Success</h2>
                            <p className='modal__title'>Your booking has confirmed! Taking to homepage</p>
                            {/* <button onClick={closePopup} className='modal__button'>OK</button> */}
                        </section>
                    </div>
                </div>
            )}

        </>
    )
}

export default Booking;