function ShowFavorite({showFavorites, favoriteData}){

    return(
        <>
        {
            favoriteData.length>0  ?
            (<section className='dashboard__details'>
                {favoriteData.map((favorites) => (
                    <>
                        <li key={favorites.id} className='dashboard__details--list'>
                            <section className='dashboard__details--list--label'>
                                <p>Service</p>
                                <p>Date</p>
                                <p>Provider</p>
                            </section>

                            <section className='dashboard__details--list--data'>
                                <p>: {favorites.service_name}</p>
                                {/* <p>: {timeCalc(favorites.booked_on)}</p> */}
                                <p>: {favorites.provider_name}</p>
                            </section>
                        </li>
                        {/* <section className='dashboard__image'>
                            <div className='dashboard__image--cont'>
                                <img src={edit} alt="edit" />
                            </div>
                            <div className='dashboard__image--cont'>
                                <img src={del} alt="delete" />
                            </div>
                        </section> */}
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
export default ShowFavorite;