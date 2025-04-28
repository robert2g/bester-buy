import {Link} from "react-router-dom";
import {useTheme} from "../ThemeContext";

function Directory() {
    const { isLightMode } = useTheme();
    return (
        <div className="directory-container">
            <div className="directory-column">
                <h3 className="column-title">SHOP</h3>
                <Link className="router-link" to="/querypage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Appliances</a>
                </Link>

                <Link className="router-link" to="/querypage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Computers</a>
                </Link>

                <Link className="router-link" to="/querypage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Phones</a>
                </Link>

                <Link className="router-link" to="/querypage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Video</a>
                </Link>

                <Link className="router-link" to="/querypage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Audio</a>
                </Link>

                <Link className="router-link" to="/querypage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Office</a>
                </Link>

                <Link className="router-link" to="/querypage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Gaming</a>
                </Link>

                <Link className="router-link" to="/querypage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Wearables</a>
                </Link>

                <Link className="router-link" to="/querypage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Sale</a>
                </Link>
            </div>

            <div className="directory-column">
                <h3 className="column-title">SUPPORT</h3>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Help Center</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Track an Order</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Return Policy</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Shipping</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Promotions</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>FAQs</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Account</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Feedback</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Privacy Notice</a>
                </Link>
            </div>

            <div className="directory-column">
                <h3 className="column-title">COMPANY</h3>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>About Us</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Store Locations</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>BB Careers</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Corporate Sales</a>
                </Link>

                <Link className="router-link" to="/nopage">
                    <a className={isLightMode ? "light-column-link" : "column-link"}>Site Map</a>
                </Link>
            </div>
        </div>
    );
}

export default Directory;