import Instagram from '../images/instagram-icon.svg';
import LightInstagram from '../images/lightmode/light-instagram-icon.svg';

import Facebook from '../images/facebook-icon.svg';
import LightFacebook from '../images/lightmode/light-facebook-icon.svg'

import Xitter from '../images/x-icon.svg';
import LightXitter from '../images/lightmode/light-x-icon.svg'

import Youtube from '../images/youtube-icon.svg';
import LightYoutube from '../images/lightmode/light-youtube-icon.svg'

import TikTok from '../images/tiktok-icon.svg';
import LightTikTok from '../images/lightmode/light-tiktok-icon.svg'

import {useTheme} from "../ThemeContext";
function Socials() {
    const { isLightMode } = useTheme();
    return (
        <div className="social-links">
            <div className="social-container">
                <div className="social-wrapper">
                    <a href=""><img className="social-image" src={isLightMode ? LightInstagram : Instagram} alt={"Instagram"}/></a>
                </div>
                <div className="social-wrapper">
                    <a href=""><img className="social-image" src={isLightMode ? LightFacebook : Facebook} alt={"Facebook"}/></a>
                </div>
                <div className="social-wrapper">
                    <a href=""><img className="social-image" src={isLightMode ? LightXitter : Xitter} alt={"X"}/></a>
                </div>
                <div className="social-wrapper">
                    <a href=""><img className="social-image" src={isLightMode ? LightTikTok : TikTok} alt={"TikTok"}/></a>
                </div>
                <div className="social-wrapper">
                    <a href=""><img className="social-image" src={isLightMode ? LightYoutube : Youtube} alt={"Youtube"}/></a>
                </div>
            </div>
        </div>
    );
}

export default Socials;
