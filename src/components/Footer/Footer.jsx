import './Footer.scss'
import instagram from '../../assets/icons/instagram.png';
import facebook from '../../assets/icons/facebook.png';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <>
            <footer className="footer">

                <section className='footer--content'>
                    <section>
                        <h3>Contact Us</h3>
                        <p>Email</p>
                        <p> Contact No</p>
                    </section>

                    {/* <section className='footer__copy'>
                <p className="footer-copyright-icon">©</p>
                <p className="footer-copyright">Server Buddy. All Right Reserved.</p>
                </section> */}

                    <section className='footer__social'>
                        <h3>Connect</h3>
                        <div className="footer__social--icons">
                            <Link to="https://www.instagram.com" target="_blank" >
                                <img className="footer__social--iconimages" src={instagram} alt="instagram" />
                            </Link>
                            <Link to="https://www.facebook.com" target="_blank" >
                                <img className="footer__social--iconimages" src={facebook} alt="facebook" />
                            </Link>
                        </div>
                    </section>
                </section>

                <section className='footer__copy'>
                    <p className="footer-copyright-icon">©</p>
                    <p className="footer-copyright">Server Buddy. All Right Reserved.</p>
                </section>



            </footer>
        </>
    )
}
export default Footer;