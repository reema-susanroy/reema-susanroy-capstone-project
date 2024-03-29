import './Hero.scss';
function Hero() {

    return (
        <>

            <div className="hero__section"></div>
            <div className="hero-content">
                <div className="hero__section--slogan">
                    {/* <div > */}
                    <div className='hero__section--slogan__card'>
                        <div className='hero__section--slogan__container'>
                            <h1 className='homepage'>SERVICE BUDDY</h1>
                            <p className='homepage__slogan'>Your companion for all your home service needs!</p>

                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>

            {/* <section className='hero__section'>
                <section className='hero__section--slogan'>
                    <h1 className='homepage'>SERVICE BUDDY</h1>
                    <p className='homepage__slogan'>Your companion for all your home service needs!</p>
                </section>
            </section> */}
            <div className='service'>
                <p className='service__slogan'>What service are you looking for? </p>
                <form className='service__search'>
                    <label htmlFor='search' />
                    <input className="input" id="search" name='input' placeholder='Search' />
                </form>
            </div>
        </>
    )
}

export default Hero;