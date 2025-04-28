import React, { useState, useEffect } from 'react';
import './pagestyles/cart.css';
import './pagestyles/light-cart.css'
import ItemCart from "../items/ItemCart";
import {useTheme} from "../ThemeContext";
import {db,auth} from "../config/Config";

function Cart() {

    const [items, setItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const { isLightMode } = useTheme();
    const currentDate = new Date();
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});
    const formattedDate = currentDate.toLocaleString();
    const [discountSaved , setSaved] = useState(0);
  
    useEffect(() => {
        const unsubscribe = db.collection("Cart").onSnapshot((snapshot) => {
            const itemsData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setItems(itemsData);
          
            // Calculate subtotal based on the 'price' field of each document
            const subtotalValue = itemsData.reduce((acc, item) => acc + (item.price * item.quantity), 0);
            setSubtotal(subtotalValue);

            // Calculate totalValue here after subtotal has been updated
            const subtotalNumber = Number(subtotalValue);
            let taxValue = 0;
            if (!isNaN(subtotalNumber)) {
                taxValue = (subtotalNumber * 0.0825).toFixed(2);
            }
            setTotalValue(subtotalNumber + parseFloat(taxValue));
        });
    
        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await db.collection("Cart").get();
            setItems(data.docs.map(doc => ({...doc.data(), id: doc.id})));
        };
        fetchData();
    }, []);

    const subtotalNumber = Number(subtotal);
    let taxValue = 0;
    if (!isNaN(subtotalNumber)) {
        taxValue = subtotalNumber * .0825;
    }
    const [totalValue, setTotalValue] = useState(subtotalNumber + taxValue);

    const [discountCode, setDiscountCode] = useState('');

    const handleDiscountCodeChange = (e) => {
        const input = e.target.value;
        if (input.length <= 6) {
            setDiscountCode(input);
        } else {
            // Display an alert for an invalid input
            alert('Discount code must be 6 characters or less.');
        }
    };

    useEffect(() => {
        setTotalValue(subtotal + taxValue);
    }, [subtotal, taxValue]);

    const [discountApplied, setDiscountApplied] = useState(false);

    const applyDiscount = async () => {
        if (discountApplied) {
            // If discount is already applied, do nothing
            return;
        }

        try {
            const discountCodeSnapshot = await db.collection("discountCodes").where("code", "==", discountCode).get();

            if (!discountCodeSnapshot.empty) {
                const discountCodeDoc = discountCodeSnapshot.docs[0];
                const percentValue = discountCodeDoc.data().percent;
                setTotalValue((prevTotal) => prevTotal - (prevTotal * (percentValue / 100)));
                setDiscountApplied(true);
                setSaved((totalValue * (percentValue / 100)));

                console.log(`Discount code ${discountCode} applied! Discount percent: ${percentValue}`);
            } else {
                alert('Invalid discount code.');
            }
        } catch (error) {
            console.error("Error applying discount:", error);
        }
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                db.collection("Users").doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        setUserData(doc.data());
                    } else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
            } else {
                setUser(null);
            }
        });
    }, []);

    const placeOrder = async () => {
        try {
            let userActive;
    
            if (userData.username && userData.username.trim() !== "") {
                // If username is not empty or only contains whitespace
                userActive = userData.username;
            } else {
                // If username is empty or contains only whitespace
                userActive = "Guest";
            }
    
            // Iterate over items in the cart
            for (const cartItem of items) {
                const { name, quantity } = cartItem;
            
                // Find the corresponding item in the "scraped" collection
                const scrapedItemRef = db.collection("scraped").where("name", "==", name);
                const scrapedItemSnapshot = await scrapedItemRef.get();
            
                if (!scrapedItemSnapshot.empty) {
                    // Update the quantity in the "scraped" collection
                    const scrapedItemDoc = scrapedItemSnapshot.docs[0];
                    const scrapedItemData = scrapedItemDoc.data();
                    const updatedQuantity = scrapedItemData.quantity - quantity;
            
                    if (updatedQuantity >= 0) {
                        // Update the quantity only if it won't go below zero
                        await scrapedItemDoc.ref.update({ quantity: updatedQuantity });
                    } else {
                        console.warn(`Quantity for item "${name}" would go below zero. Skipping update.`);
                    }
                } else {
                    console.warn(`Item "${name}" not found in the "scraped" collection.`);
                }
            }
    
            // Continue with the rest of the order placement logic...
            const orderRef = await db.collection("Orders").add({
                customer: userActive,
                discountCode: discountCode,
                status: "placed",
                timestamp: formattedDate,
                totalPayment: totalValue.toFixed(2),
                // Add any other fields you may want for an order
                // For example, you might want to include the items in the order, subtotal, etc.
            });
    
            const docId = orderRef.id;
            orderRef.update({
                orderID: docId,
            });
    
            console.log("Order placed successfully. Order ID:", orderRef.id);
    
            // Delete all documents in the "Cart" collection
            const cartSnapshot = await db.collection("Cart").get();

            const deletePromises = cartSnapshot.docs.map((doc) => db.collection("Cart").doc(doc.id).delete());
            await Promise.all(deletePromises);

            console.log("Cart cleared after placing the order.");
    
            // Redirect to the index page after placing the order
            window.location.href = '/'; // You can replace '/' with the desired path
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    const convertImagesToArray = (images) => {
        if (Array.isArray(images)) {
            return images; // Already an array, no need to convert
        }

        // Convert object properties to an array of images
        return Object.values(images);
    };

    return (
        <div className="cart-func-container">
            <div className="cart-func-wrapper">

                <div className="cart-func-header">
                    <span className={isLightMode ? "light-cart-func-header-text" : "cart-func-header-text"}>Your Cart Items</span>
                </div>

                <div className={isLightMode ? "light-cart-header-separator" : "cart-header-separator"}></div>

                <div className="cart-items-container">
                    {items.map(item => (
                        <ItemCart
                            key={item.id}
                            itemName={item.name}
                            itemCost={item.price}
                            itemImg={convertImagesToArray(item.images)}
                        />
                    ))}
                    <div className={isLightMode ? "light-cart-header-separator" : "cart-header-separator"}></div>
                    <div className="cart-items-purchase">
                        <div className={isLightMode ? "light-cart-subtotal" : "cart-subtotal"}>
                            <span>Subtotal:</span>
                            <span className={isLightMode ? "light-cart-subtotal-price" : "cart-subtotal-price"}>${Number(subtotal).toFixed(2)}</span>

                        </div>
                        <div className={isLightMode ? "light-cart-tax" : "cart-tax"}>
                            <span>Taxes (8.25%):</span>
                            <span className={isLightMode ? "light-cart-tax-price" : "cart-tax-price"}>${Number(taxValue).toFixed(2)}</span>               
                        </div>

                        <div className="cart-discount-container">

                            <label className={isLightMode ? "light-cart-tax" : "cart-tax"}
                                   htmlFor="discountCode">
                                Discount:
                            </label>

                            <input
                                className={isLightMode ? "light-cart-discount-input" : "cart-discount-input"}
                                type="text"
                                id="discountCode"
                                placeholder="Enter discount code..."
                                value={discountCode}
                                onChange={handleDiscountCodeChange}
                            />
                            <button className={isLightMode ? "light-cart-discount-button" : "cart-discount-button"} onClick={applyDiscount}>Apply</button>
                        </div>

                        <div className={isLightMode ? "light-cart-purchase-separator" : "cart-purchase-separator"}></div>

                        <div className={isLightMode ? "light-cart-discount-deduction" : "cart-discount-deduction"}>
                            <span>Saved:</span>
                            <span className={isLightMode ? "light-cart-tax-price" : "cart-tax-price"}>${discountSaved.toFixed(2)}</span>
                        </div>

                        <div className={isLightMode ? "light-cart-total" : "cart-total"}>
                            <span>Total:</span>
                            <span className="cart-total-price">${Number(totalValue).toFixed(2)}</span>
                        </div>
                        
                        <button className={isLightMode ? "light-cart-checkout-button" : "cart-checkout-button"} onClick={placeOrder}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;