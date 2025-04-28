import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { db } from '../config/Config';

import Placeholder1 from '../images/placeholders/placeholderimage1.png';
import Placeholder2 from '../images/placeholders/placeholderimage2.png';

import BBIcon from '../images/besterbuy_icon.svg';
import LightBBIcon from '../images/lightmode/light-besterbuy_icon.svg';
import migrateDocuments from '../Functions/MigrateDocuments';

import './itemstyles/itemcell.css'
import './itemstyles/light-itemcell.css'

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

    const handleMoveToCart = () => {
        migrateDocuments("scraped", "Cart", "name", itemName);
    };

    return (
        <div className={isLightMode ? "light-basic-item-container" : "basic-item-container"}>
            <div className="basic-item-wrapper">

                <div className="basic-item-brand">
                    <img className="brand-logo" src={isLightMode ? LightBBIcon : BBIcon} alt="Brand Logo" />
                </div>

                <div className="basic-image-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {imageSrc && itemName && itemCost && (
                        <img src={imageSrc} alt="Image 1" className="item-image" />
                    )}
                </div>

                {imageSrc && itemName && itemCost ? (

                    <div className="basic-item-data">

                        <Link className="basic-item-linker" to="/itempage" onClick={handleItemClick}>
                            <span className={isLightMode ? "light-basic-item-name" : "basic-item-name"}>{displayName ?? itemName}</span>
                        </Link>

                        <span className={isLightMode ? "light-basic-item-price" : "basic-item-price"}>
                            <span className="money-sign">$</span>
                            {itemCost}
                            {/*{itemSale !== undefined ? (itemCost - itemCost * (itemSale / 100)).toFixed(2) : itemCost.toFixed(2)}*/}
                        </span>

                        {itemSale !== undefined && (
                            <div className="discount-wrapper">
                                <span className={isLightMode ? "light-discount-noti" : "discount-noti"}>Save {itemSale}%</span>
                            </div>
                        )}




                        <button className={isLightMode ? "light-add-to-cart-btn" : "add-to-cart"} onClick={handleMoveToCart}>Add to Cart</button>
                    </div>
                ) : (

                    <div className="basic-item-data">

                        <Link className="basic-item-linker" to="/itempage">
                            <span className="basic-item-name">Samsung - 75" Class TU690T Crystal UHD 4K Smart Tizen TV</span>
                        </Link>

                        <div className="item-quantity-wrapper">
                            <span className="item-quantity">12 in stock</span>
                        </div>

                        <span className="basic-item-price"><span className="money-sign">$</span>1999.99</span>

                        <div className="discount-wrapper">
                            <span className={isLightMode ? "light-discount-noti" : "discount-noti"}>Save 10%</span>
                        </div>

                        <button className={isLightMode ? "light-add-to-cart-btn" : "add-to-cart"} onClick={handleMoveToCart}>Add to Cart</button>
                    </div>
                )}

            </div>
        </div>
    );
}

export default ItemCell;