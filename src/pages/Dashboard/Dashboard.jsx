import axios from 'axios';
import './Dashboard.scss';
import { useEffect, useState } from 'react';
import ShowBooking from '../../components/ShowBooking/ShowBooking';
import ShowProfile from '../../components/ShowProfile/ShowProfile';
import ShowFavorite from '../../components/ShowFavorite/ShowFavorite';

function Dashboard() {
    const [userId, setUserId] = useState('');
    const [bookingData, setBookingData] = useState([]);
    const [favoriteData, setFavoriteData] = useState([]);
    const [profileData, setProfileData] = useState([]);

    const [showBooking, setShowBooking] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        const storedUserId = sessionStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleProfile = async() => {
        try {
            const userDetails = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/${userId}`);
            console.log(userDetails.data[0])
            setProfileData(userDetails.data[0]);
            setShowProfile(true);
            setShowFavorites(false);
            setShowBooking(false);
        } catch (error) {
            console.log("Unable to load the user details: "+error);
        }
    }
    const handleFavorites = async () => {
        try {
            const favoriteDetails = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/providers/users/favorite`);
            console.log(favoriteDetails.data)
            setFavoriteData(favoriteDetails.data);
            setShowProfile(false);
            setShowFavorites(true);
            setShowBooking(false);
        } catch (error) {
            // if(error.message)
            console.log("unable to fetch favorites: " + error)
        }

    }
    const handleBooking = async () => {
        try {
            const bookingDetails = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/manage-booking/${userId}`);
            console.log(bookingDetails.data)
            setBookingData(bookingDetails.data);
            setShowBooking(true);
            setShowProfile(false);
            setShowFavorites(false);
        } catch (error) {
            console.log("Unable to fetch booking data :" + error);
        }

    }

    const updateDelete = async(bookingId) =>{
        console.log("came here")
        try{
            const deleteBooking = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/users/manage-booking/${bookingId}`)
            console.log(deleteBooking);
            handleBooking();
        }catch(error){
            console.log("Unable to delete the booking: "+error);
        }
    }
    return (
        <>
            <h2>My Dashboard</h2>

            {userId ? (
                <div>
                    <p> ID: {userId}</p>
                </div>
            ) : (
                <p>Please login to view profile</p>
            )}

            <section className="dashboard__cards">
                <h3 className="dashboard__cards--item" onClick={handleProfile}>Edit Profile</h3>

                <h3 className="dashboard__cards--item" onClick={handleBooking}>Manage Bookings</h3>

                <h3 className="dashboard__cards--item" onClick={handleFavorites}>Favorites</h3>
            </section>

            {showBooking && !showProfile && !showFavorites &&
                <ShowBooking showBooking={showBooking} bookingData={bookingData} updateDelete={updateDelete}/>
            }
            {!showBooking && showProfile && !showFavorites &&
                <ShowProfile showProfile={showProfile} profileData={profileData} userId={userId}/>
            }
            {!showBooking && !showProfile && showFavorites &&
                <ShowFavorite showFavorites={showFavorites} favoriteData={favoriteData} />
            }
        </>
    )
}
export default Dashboard;