import React, {useState} from 'react';
import {Link} from "react-router-dom";

import './itemstyles/itemslab.css'
import './itemstyles/light-itemslab.css'

import {useTheme} from "../ThemeContext";
import migrateDocuments from "../Functions/MigrateDocuments";
function ItemSlab({imageSrc, name, price, sale, quantity, description, images, setName, setQuantity, setImages, setPrice, setSale, setDescription}) {
    const [isHovered, setHovered] = useState(false);
    const { isLightMode } = useTheme();
    const handleMouseEnter = () => {
        setHovered(true);
    };


    const handleMoveToCart = () => {
        migrateDocuments("scraped", "Cart", "name", name);
    }
    const handleMouseLeave = () => {
        setHovered(false);
    };

    const handleItemClick = () => {
        setName(name);
        setQuantity(quantity);
        setImages(images);
        setPrice(price);
        setSale(sale);
        setDescription(description)
    }

    return (
        <div className={isLightMode ? "light-slab-item-container" : "slab-item-container"}>
            <div className="slab-item-image-frame">
                <img className="slab-image" src={imageSrc}/>
            </div>

            <div className="slab-item-data">

                <Link className={isLightMode ? "light-slab-item-name" : "slab-item-name"} to="/itempage" onClick={handleItemClick}>
                    {name}
                </Link>

                <div className="">
                    <div className={isLightMode ? "light-slab-item-about-description" : "slab-item-about-description"}>
                        <span className="slab-item-description">{description}</span>
                    </div>
                </div>
            </div>

            <div className="slab-item-purchase">

                <div className={isLightMode ? "light-slab-quantity-box" : "slab-quantity-box"}>
                    <span className="slab-item-name-text">{quantity} in stock</span>
                </div>

                <span className={isLightMode ? "light-slab-item-price" : "slab-item-price"}><span className="slab-money-sign">$</span>{price}</span>

                <div className="slab-discount-wrapper">
                    {sale !== undefined && (
                        <span className={isLightMode ? "light-discount-noti" : "discount-noti"} >Save {sale}%
                        </span>
                    )}
                </div>

                <button className={isLightMode ? "light-slab-add-to-cart" : "slab-add-to-cart"} onClick={handleMoveToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

export default ItemSlab;