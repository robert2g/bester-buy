import React from 'react';
import Placeholder1 from '../images/placeholders/placeholderimage1.png'
import {Link} from "react-router-dom";

import './itemstyles/searchitem.css'
import './itemstyles/light-searchitem.css'
import {useTheme} from "../ThemeContext";
const SearchItem = ({ ItemName, ItemCost, ItemImage }) => {
    const { isLightMode } = useTheme();

    return (
        <div className={isLightMode ? "light-mini-item-container" : "mini-item-container"}>
            <div className="mini-item-wrapper">
                {ItemImage && ItemImage.length > 0 ? (
                    <img className="mini-item-image" src={ItemImage} alt={`Item Image 1`} />
                ) : (
                    <img className="mini-item-image" src={Placeholder1} alt="Placeholder Image" />
                )}
                <div className={isLightMode ? "light-mini-item-divider" : "mini-item-divider"}></div>
                <span className={isLightMode ? "light-mini-item-name" : "mini-item-name"}>{ItemName}</span>
                <span className={isLightMode ? "light-mini-item-price" : "mini-item-price"}>${ItemCost}</span>
            </div>
        </div>
    );
};

export default SearchItem;