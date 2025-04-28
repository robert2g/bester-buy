import React, { useState } from 'react';

import './itemstyles/itemcart.css';
import './itemstyles/light-itemcart.css';

import ExitIcon from "../images/cross.svg";
import LightExitIcon from '../images/light-cross.svg';

import {db} from "../config/Config";
import {useTheme} from "../ThemeContext";

function ItemCart({ imageSrc, itemName, itemCost, onAddToCart, itemImg}) {
    const {isLightMode} = useTheme();
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(itemCost);

    console.log(itemCost)

    const handleRemoveFromCart = () => {
        // Access Firestore and remove document based on the "name" field
        db.collection("Cart").where('name', '==', itemName)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    };

    const handleIncrease = () => {
        // Fetch the current quantity from the "Scraped" collection
        db.collection("scraped").where('name', '==', itemName).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const maxAllowedQuantity = doc.data().quantity; // Assuming there is a 'quantity' field in the document
                    if (quantity < maxAllowedQuantity) {
                        setQuantity(quantity + 1);
                        updateQuantityInFirestore(quantity + 1);
                    } else {
                        // Handle the case where the quantity is already at the maximum allowed value
                        console.warn(`Quantity cannot exceed ${maxAllowedQuantity}.`);
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching document: ", error);
            });
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            updateQuantityInFirestore(quantity - 1);
        }
    };

    const updateQuantityInFirestore = (newQuantity) => {
        db.collection("Cart")
            .where('name', '==', itemName)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const newTotalPrice = itemCost * newQuantity;
                    doc.ref.update({ quantity: newQuantity });
                    setTotalPrice(newTotalPrice);
                });
            })
            .catch((error) => {
                console.error("Error updating quantity: ", error);
            });
    };

    return (
        <div className={isLightMode ? "light-cart-item-container" : "cart-item-container"}>
            <div className="cart-item-wrapper">
                <div className="cart-item-image-frame">
                    <img className="cart-item-image" src={itemImg} alt="Item image"/>
                </div>

                <div className="cart-item-data-container">
                    <div className="cart-item-name">
                        <a className={isLightMode ? "light-cart-item-name-text" : "cart-item-name-text"} href="/itempage">{itemName} </a> {/*makes sure to refresh page.*/}
                    </div>

                    <div className="cart-item-quantity">
                        <button className={isLightMode ? "light-cart-quantity-button" : "cart-quantity-button"} onClick={handleDecrease}>-</button>
                        <div className={isLightMode ? "light-cart-quantity-number" : "cart-quantity-number"}>{quantity}</div>
                        <button className={isLightMode ? "light-cart-quantity-button" : "cart-quantity-button"} onClick={handleIncrease}>+</button>
                    </div>
                </div>

                <div className="cart-item-purchase-container">
                    <button className={isLightMode ? "light-cart-remove-button" : "cart-remove-button"} onClick={handleRemoveFromCart}>
                        <img className={"cart-exit-icon"} src={isLightMode ? LightExitIcon : ExitIcon} alt={"Search Glass"}/>
                    </button>
                    <span className={isLightMode ? "light-cart-item-cost" : "cart-item-cost"}>${totalPrice}</span>
                </div>
            </div>
        </div>
    );
}

export default ItemCart;