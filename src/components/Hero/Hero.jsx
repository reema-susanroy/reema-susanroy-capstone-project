import './Hero.scss';
function Hero() {

    return (
        <>
            <section className='hero__section'>
                <section className='hero__section--slogan'>
                    <h1 className='homepage'>SERVICE BUDDY</h1>
                    <p className='homepage__slogan'>Your companion for all your home service needs!</p>
                </section>
            </section>
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