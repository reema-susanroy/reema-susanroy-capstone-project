import './Booking.scss';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { timeCalc } from '../../utils/TimeCalc';

function Booking() {
    const { id } = useParams(); //providerId
    const [userId, setUserId] = useState('');

    const navigate = useNavigate();
    const [providerDate, setProviderDate] = useState();
    const [provider , setProvider] =useState();
    const [selectedDate, setSelectedDate] = useState();
    const [description, setDescription] = useState();
    const [address, setAddress] = useState();
    const [errorMessage, setErrorMessage] = useState(false);
    const [uploadForm, setUploadForm] = useState(false);
    const [posterImage, setPosterImage] = useState(`${process.env.REACT_APP_BASE_URL}/images/image1.jpg`); //set a default placeholder image

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        getProvider();
        getAvailability();
    }, [])
    const getProvider = async () => {
        try {
            const provider = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/providers/provider/${id}`);
            const datesSet = provider.data;
            setProvider(datesSet[0]);
        }
        catch (error) {
            console.log("Unable to fetch provider details : " + error);
        }
    }

    const getAvailability = async () => {
        try {
            const availability = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/providers/booking/${id}/availability`);
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
    const handleChangeImage = (event) => {
        if (event.target.files.length > 0) {
            setPosterImage(event.target.files[0]);
        }
    }
    const handleCancel = () => {
        navigate(`/services/${provider.service_id}`);
        // navigate(-1);
    }
    const handleBook = async (event) => {
        event.preventDefault();
        if (!address || !selectedDate || !description) {
            setErrorMessage(true);
        } else {
            try {
                const formData = new FormData();
                formData.append("provider_id", id);
                formData.append("user_id", userId);
                formData.append("service_id", provider.service_id);
                formData.append("issue_description", description);
                formData.append("booked_on", timeCalc(selectedDate));
                formData.append("image", posterImage);

                await axios.post(`${process.env.REACT_APP_BASE_URL}/api/providers/${provider.id}/booking/confirm`,
                    formData);

            } catch (error) {
                console.log("Couldn't update the bookings table:" + error);
            }
            setUploadForm(true);
            setTimeout(() => {
                navigate("/")
            }, 1000)
        }
    }
    return (
        <>
        {
            provider &&
            <div className='booking__details--bgImage'>
            <h3 className='booking__details--header'>Confirm booking with <span> {provider.provider_name} </span> for <span>{provider.service_name} </span>service</h3>
            <form >
                <section className='booking__details--form'>
                    <section className='booking__details--form--section'>
                        <label className="booking__details--form--label">Choose a Date :
                            <select className="booking__details--form--input choose__date--option" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)}>
                                <option value="">Please choose an option</option>
                                {Array.isArray(providerDate) &&
                                    providerDate.map((data) => (
                                        <option key={data.id} value={data.date} disabled={data.status === 'booked'}>
                                            {timeCalc(data.date)} {data.status === 'booked' && '(Booked)'}
                                        </option>
                                    ))}
                            </select>
                        </label>
                        <label className="booking__details--form--label">Address :
                            <textarea className="booking__details--form--input" type="text" rows={4} value={address}
                                onChange={(e) => { handleAddressChange(e.target.value); }} />
                        </label>
                    </section>
                    <section className='booking__details--form--section'>
                        <label className="booking__details--form--label">Issue description :
                            <textarea className="booking__details--form--input" type="text" rows={4} value={description}
                                onChange={(e) => { handleDescriptionChange(e.target.value); }} />
                        </label>

                        <label htmlFor='image' className="booking__details--form--label">Upload an Image
                            <input onChange={handleChangeImage} className="booking__details--form--input" type="file" accept='image/*' id='posterImage' name='posterImage' />
                        </label>
                    </section>
                </section>
                <section className='booking__details--button'>
                    <button onClick={handleCancel} className='booking__details--button__item'> Cancel</button>
                    <button onClick={handleBook} className='booking__details--button__item'> Book</button>
                </section>

                { errorMessage &&
                    <p className='booking__details--error' >Kinldy enter the details</p>
                }
            </form>
            </div>
        }
            {uploadForm && (
                <div className="modal-overlay">
                    <div className="popup--modal">
                        <section className='modal__title-cont'>
                            <h2 className='modal__title--title'>Success</h2>
                            <p className='modal__title'>Your booking has confirmed! Taking to the homepage</p>
                        </section>
                    </div>
                </div>
            )}

        </>
    )
}

export default Booking;