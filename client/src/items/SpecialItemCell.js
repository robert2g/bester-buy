import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Placeholder1 from '../images/placeholders/placeholderimage1.png'
import Placeholder2 from '../images/placeholders/placeholderimage2.png'

import BBIcon from '../images/besterbuy_icon.svg';
import LightBBIcon from '../images/lightmode/light-besterbuy_icon.svg';
import migrateDocuments from '../Functions/MigrateDocuments';

import './itemstyles/specialitemcell.css'

import {useTheme} from "../ThemeContext";

function ItemCell({ imageSrc, itemImages, itemQuantity, itemName, itemCost, itemSale, itemDescription , onAddToCart, setName, setQuantity, setPrice, setSale, setImages, setDescription }) {
    const { isLightMode } = useTheme();
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    const salePrice = itemSale !== undefined
        ? (itemCost - itemCost * (itemSale / 100))
        : itemCost;

    const handleItemClick = () => {
        setName(itemName);
        setQuantity(itemQuantity);
        setImages(itemImages);
        if (itemSale !== undefined) {
            setPrice(parseFloat(salePrice));
        }
        setPrice(itemCost);
        setSale(itemSale);
        setDescription(itemDescription);
    }
    
    let displayName;
    if (itemName.length > 100) {
        displayName = itemName.slice(0, 100);
    }

    const handlemoveToCart = () => {
        migrateDocuments("scraped", "Cart", "name", itemName);
    };

    // Placeholder2 can be set up later depending on how you did your side just lmk - might need to be talked about with BE team
    return (
        <div className={isLightMode ? "light-basic-item-container" : "special-basic-item-container"}>
            <div className="special-basic-item-wrapper">

                <div className="special-basic-image-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {imageSrc && itemName && itemCost && (
                        <img src={imageSrc} alt="Image 1" className="special-item-image" />
                    )}
                </div>

                {imageSrc && itemName && itemCost ? (

                    <div className="special-basic-item-data">

                        <Link className="special-basic-item-linker" to="/itempage" onClick={handleItemClick}>
                            <span className={isLightMode ? "light-basic-item-name" : "special-basic-item-name"}>{displayName ?? itemName}</span>
                        </Link>


                    </div>
                ) : (

                    <div className="special-basic-item-data">

                        <Link className="special-basic-item-linker" to="/itempage">
                            <span className="special-basic-item-name">Samsung - 75" Class TU690T Crystal UHD 4K Smart Tizen TV</span>
                        </Link>
                        

                    </div>
                )}

            </div>
        </div>
    );
}

export default ItemCell;