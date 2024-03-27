import { Link } from "react-router-dom";

function ShowFavorite({ showFavorites, favoriteData }) {
    let flag = "dashboard";

    return (
        <>
            {
                favoriteData.length > 0 ?
                    (<section className='dashboard__details'>
                        {favoriteData.map((favorites) => (
                            <>
                                <Link to= {`/providers/${favorites.id}`} state= {{flag} }>
                                    <li key={favorites.id} className='dashboard__details--list'>
                                        <section className='dashboard__details--list--label'>
                                            <div className="dashboard__details--list--image">
                                                <img className="dashboard__details--list--image--src" src={`${process.env.REACT_APP_BASE_URL}${favorites.provider_image}`} alt={"provider-image"} />
                                            </div>
                                        </section>

                                        <section className='dashboard__details--list--data'>
                                            <p>{favorites.provider_name}</p>
                                        </section>
                                    </li>
                                </Link>
                            </>
                        ))}

                    </section>) :
                    (
                        <div>
                            <h2>No Favorites</h2></div>
                    )
            }

        </>
    )
}
export default ShowFavorite;