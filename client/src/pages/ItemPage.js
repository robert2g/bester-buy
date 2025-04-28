import '../pages/pagestyles/itempage.css';
import '../pages/pagestyles/light-itempage.css';
import React, {useEffect, useState} from "react";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import migrateDocuments from '../Functions/MigrateDocuments';
function ItemPage({name, quantity, price, sale, images, description}) {
    const {isLightMode} = useTheme();
    const navigate = useNavigate();
    const arrayOfImages = Object.values(images);
    const handleMoveToCart = () => {
        migrateDocuments("scraped", "Cart", "name", name);
    }
    const [mainImage, setMainImage] = useState(arrayOfImages[0]);

    useEffect(() => {
        setMainImage(arrayOfImages[0]);
    }, [name])

    const handleImageClick = (index) => {
        setMainImage(arrayOfImages[index]);
    }

    useEffect(() => {
        console.log("Name:", name);
        console.log("Quantity:", quantity);
        console.log("Price:", price);
        console.log("Images:", images);
        console.log("sale:", sale);
        console.log("Description:", description);
        // Check if parameters are falsy, indicating a page refresh
        const isPageRefreshed =
            (name === null || name === '') &&
            (quantity === null || quantity === '') &&
            (price === null || price === '') &&
            (sale === null || sale === '' ) &&
            (Array.isArray(images) && images.length === 0) &&
            (description === null || description === '');

        console.log("Is Page Refreshed:", isPageRefreshed);

        if (isPageRefreshed) {
            // Redirect to the homepage
            navigate("/");
        }
    }, [name, quantity, price, sale, images, description, navigate]);

    return (
        <div className={isLightMode ? "light-item-page-container" : "item-page-container"}>
            <div className="item-page-wrapper">

                <div className={isLightMode ? "light-item-page-header" : "item-page-header"}>
                    <span className={isLightMode ? "light-item-header-text" : "item-header-text"}></span>
                </div>

                <div className="item-data-block">

                    <div className="item-images-column">
                        <div className="item-images-wrapper">
                            {arrayOfImages.map((image, index) => (
                                <button onClick={() => handleImageClick(index)} index={index} className={isLightMode ? "light-page-item-image-frame" : "page-item-image-frame"}>
                                    <img className="page-item-image" index={index} src={image}/>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="item-window-image">
                        <div className="item-window-frame">
                            <img className="item-big-image" src={mainImage} alt="BEEG IMAGE"/>
                        </div>
                    </div>

                    <div className="item-purchase-column">

                        <div className={isLightMode ? "light-item-name-box" : "item-name-box"}>
                            <span className="item-name-text">{name}</span>
                        </div>

                        <div className={isLightMode ? "light-item-quantity-box" : "item-quantity-box"}>
                            <span className="item-name-text">{quantity} left in stock</span>
                        </div>

                        <div className={isLightMode ? "light-item-price-data" : "item-price-data"}>
                            <span className="item-price"><span className="item-price-sign">$</span>{price}</span>
                        </div>

                        <div className="item-discount-wrapper">
                            {sale !== undefined && (
                                <span className={isLightMode ? "light-discount-noti" : "discount-noti"} >Save {sale}%
                                </span>
                            )}
                        </div>

                        <div className={isLightMode ? "light-item-specs-box" : "item-specs-box"}>
                            <div className="item-about-description">
                                <span className={isLightMode ? "light-item-description" : "item-description"}>{description}</span>
                            </div>
                        </div>

                        <button className={isLightMode ? "light-page-add-to-cart" : "page-add-to-cart"} onClick={handleMoveToCart}>Add to Cart</button>

                    </div>

                </div>

                <div className={isLightMode ? "light-item-about-header" : "item-about-header"}>
                    <span className={isLightMode ? "light-item-about-text" : "item-about-text"}>Item Description</span>
                </div>

                <div className="item-about-description">
                    <span className={isLightMode ? "light-item-description" : "item-description"}>{description}</span>
                </div>

            </div>
        </div>
    );

}
export default ItemPage;