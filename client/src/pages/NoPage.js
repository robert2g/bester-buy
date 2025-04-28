import {Link} from "react-router-dom";

import './pagestyles/nopage.css';
import BBIcon from '../images/besterbuy_icon.svg';
function NoPage() {
    return (
        <div className="nopage-container">
            <div className="nopage-wrapper">
                <p className="nopage-code">404</p>
                <p className="nopage-text">This page has not been created, yet...</p>
                <Link to="/">
                    <img className="nopage-image" src={BBIcon} alt="Bester Buy Icon"/>
                </Link>
            </div>
        </div>
    );
}

export default NoPage;