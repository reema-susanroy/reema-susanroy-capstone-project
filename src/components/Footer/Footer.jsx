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
                        <h3 className='footer--content__label'>Contact Us</h3>
                        <p className='footer--content__data'>Email : <Link to="mailto:serverbuddy@gmail.com" className='footer--content__email'>serverbuddy@gmail.com</Link></p>
                        <p className='footer--content__data'> Contact No : +1(534)853 4956</p>
                    </section>
                    <section className='footer__social'>
                        <h3 className='footer--content__label'>Connect</h3>
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