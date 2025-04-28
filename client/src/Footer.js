import {Link} from "react-router-dom";

import Socials from './footer/Socials';
import EmailSubmission from './footer/EmailSubmission';
import Directory from './footer/Directory';

import LightBBwm from './images/lightmode/light-besterbuy_wordmark.svg'
import BBwm from './images/besterbuy_wordmark.svg';

import {useTheme} from "./ThemeContext";

function Footer() {
    const { isLightMode } = useTheme();
    return (
            <div className={isLightMode ? "light-footer-container" : "footer-container"}>

                <div className="footer-wrapper">
                    <div className="footer-header">
                        <div className="wordmark-container">
                            <img className="besterbuy-wordmark-footer"
                                 src={isLightMode ? LightBBwm : BBwm}
                                 alt={"Company Image"}/>
                        </div>
                        <Socials/>
                    </div>
                    <div className="footer-body">
                        {/*<EmailSubmission/>*/}
                        <Directory/>
                    </div>
                </div>

                <div className={isLightMode ? "light-company-tail" : "company-tail"}>
                    <div className={isLightMode ? "light-tail-container" : "tail-container"}>
                        <div className="tail-wrapper">
                            <p className={isLightMode ? "light-company-text" : "company-text"}>© 2023 BesterBuy. All Rights Reserved.</p>

                            <Link to="/nopage" className={isLightMode ? "light-tail-router-link" : "tail-router-link"}>
                                <p>Privacy Policy</p>
                            </Link>

                            <Link to="/nopage" className={isLightMode ? "light-tail-router-link" : "tail-router-link"}>
                                <p>Cookie Policy</p>
                            </Link>

                            <Link to="/nopage" className={isLightMode ? "light-tail-router-link" : "tail-router-link"}>
                                <p>Terms of Use</p>
                            </Link>

                        </div>
                    </div>
                </div>

            </div>
    );
}

export default Footer;