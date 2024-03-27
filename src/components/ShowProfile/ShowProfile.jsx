import { useState } from "react";
import save from '../../assets/icons/save.svg';
import axios from "axios";

function ShowProfile({ profileData, userId }) {
    const [userName, setUserName] = useState(profileData.user_name);
    const [address, setAddress] = useState(profileData.user_address);
    const [email, setEmail] = useState(profileData.contact_email);
    const [phone, setPhone] = useState(profileData.contact_phone);
    const [city, setCity] = useState(profileData.city);
    const [country, setCountry] = useState(profileData.country);

    const handleUsernameChange = (value) => {
        setUserName(value);
    }
    const handleEmailChange = (value) => {
        setEmail(value);
    }
    const handleAddressChange = (value) => {
        setAddress(value);
    }
    const handlePhoneChange = (value) => {
        setPhone(value);
    }
    const handleCityChange = (value) => {
        setCity(value);
    }
    const handleCountryChange = (value) => {
        setCountry(value);
    }
    const handleSave = async () => {
        try {
            const sendData = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}`, {
                user_name: userName,
                user_address: address,
                city: city,
                country: country,
                contact_phone: phone,
                contact_email: email
            })
        } catch (error) {

        }
    }
    return (
        <>
            <form className="profile">
                <h3 className="profile__title">Edit information</h3>
                <section className="profile__data">
                    <div className="profile__data--cont">
                        <label className="profile__data--label"> Username
                            <input className="profile__data--item" type="text" value={userName} onChange={(e) => { handleUsernameChange(e.target.value); }} />
                        </label>
                        <label className="profile__data--label"> Email
                            <input className="profile__data--item" type="text" value={email} onChange={(e) => { handleEmailChange(e.target.value); }} />
                        </label>
                        <label className="profile__data--label"> Contact No:
                            <input className="profile__data--item" type="text" value={phone} onChange={(e) => { handlePhoneChange(e.target.value); }} />
                        </label>
                    </div>
                    <div className="profile__data--cont">
                        <label className="profile__data--label"> Address
                            <input className="profile__data--item" type="text" value={address} onChange={(e) => { handleAddressChange(e.target.value); }} />
                        </label>
                        <label className="profile__data--label"> City
                            <input className="profile__data--item" type="text" value={city} onChange={(e) => { handleCityChange(e.target.value); }} />
                        </label>
                        <label className="profile__data--label"> County
                            <input className="profile__data--item" type="text" value={country} onChange={(e) => { handleCountryChange(e.target.value); }} />
                        </label>
                    </div>

                </section>

                <section className="profile__save">
                    <button onClick={handleSave} className="profile__save--button">Save <span className="profile__save--cont"><img src={save} alt="save" /></span></button>
                    {/* <section >
                        <img src={save} alt="save" />
                    </section> */}
                </section>
            </form>

        </>
    )
}

export default ShowProfile;