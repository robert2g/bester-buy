import React, {useEffect, useState} from 'react';
import { db } from '../config/Config';

import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill} from 'react-icons/bs'
import {collection, getDocs} from "firebase/firestore";
import {useTheme} from "../ThemeContext";

import "./adminstyles/dashboard.css";
import "./adminstyles/light-dashboard.css";
function Dashboard() {
    const { isLightMode } = useTheme();
    const [code, setCode] = useState('');
    const [percent, setPercent] = useState('');
    const [discounts, setDiscounts] = useState([]);
    const [error, setError] = useState('');
    const [products, setProducts] = useState('');
    const [customers, setCustomers] = useState('');
    const [orders, setOrders] = useState('');

    const generateDiscount = async () => {
        if (code.trim() === '' || percent.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        const percentValue = parseInt(percent, 10);

        if (isNaN(percentValue) || percentValue < 1 || percentValue > 100) {
            alert('Please enter a valid percentage between 1 and 100.');
            return;
        }

        const newDiscount = {
            code: code,
            percent: percentValue,
            createdAt: new Date().toLocaleString(),
        };

        await db.collection('discountCodes').doc(code).set(newDiscount);

        setDiscounts((prevDiscounts) => [... prevDiscounts, newDiscount]);
        setCode('');
        setPercent('');
        setError('');

    };


    const handleCancel = () => {
        setCode('');
        setPercent('');
        setError('');
    };

    const fetchCodes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'discountCodes'));
            const codes = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setDiscounts(codes);
        } catch (error) {
            console.error('Error fetching codes:', error);
        }
    }

    const fetchDashData = async () => {
        const productSnapshot = await db.collection('scraped').get();
        const numProducts = productSnapshot.size;

        const customerSnapshot = await db.collection('Users').get();
        const numCustomers = customerSnapshot.size;

        const orderSnapshot = await db.collection('Orders').get();
        const numOrders = orderSnapshot.size;

        setProducts(numProducts);
        setCustomers(numCustomers);
        setOrders(numOrders);
    }


    useEffect(() => {
        fetchCodes();
        fetchDashData();
    }, []);

    return (
        <div className='dashboard-container'>

            <div className={isLightMode ? "light-dashboard-header" : 'dashboard-header'}>
                <span>Administrative Dashboard</span>
            </div>

            <div className='main-cards'>
                <div className={isLightMode ? 'light-card' : 'card'}>
                    <div className={isLightMode ? 'light-card-inner' : 'card-inner'}>
                        <h3 className={isLightMode ? 'light-card-title' : "card-title"}>Products</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <span className={isLightMode ? "light-card-data-amount" : "card-data-amount"}>{products}</span>
                </div>
                <div className={isLightMode ? 'light-card' : 'card'}>
                    <div className={isLightMode ? 'light-card-inner' : 'card-inner'}>
                        <h3 className={isLightMode ? 'light-card-title' : "card-title"}>Categories</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <span className={isLightMode ? "light-card-data-amount" : "card-data-amount"}>6</span>
                </div>
                <div className={isLightMode ? 'light-card' : 'card'}>
                    <div className={isLightMode ? 'light-card-inner' : 'card-inner'}>
                        <h3 className={isLightMode ? 'light-card-title' : "card-title"}>Customers</h3>
                        <BsPeopleFill className='card-icon'/>
                    </div>
                    <span className={isLightMode ? "light-card-data-amount" : "card-data-amount"}>{customers}</span>
                </div>
                <div className={isLightMode ? 'light-card' : 'card'}>
                    <div className={isLightMode ? 'light-card-inner' : 'card-inner'}>
                        <h3 className={isLightMode ? 'light-card-title' : "card-title"}>Orders</h3>
                        <BsFillBellFill className='card-icon'/>
                    </div>
                    <span className={isLightMode ? "light-card-data-amount" : "card-data-amount"}>{orders}</span>
                </div>
            </div>


            <div className={isLightMode ? "light-dash-functions-header" : "dash-functions-header"}>
                <span className="dash-header-text">Discount Functions</span>
            </div>

            <div className="dash-functions-seperator">
                <div className={isLightMode ? "light-dash-discount-container" : "dash-discount-container"}>
                    <div className={isLightMode ? "light-dash-form-title" : "dash-form-title"}>Generate a Discount Code</div>

                    <div className="dash-form-group">
                        <label className="dash-form-label" htmlFor="code">Discount Code (6 characters):</label>
                        <input
                            className={isLightMode ? "light-dash-form-input" : "dash-form-input"}
                            type="text"
                            id="code"
                            maxLength="6"
                            placeholder="Enter code..."
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <div className="dash-form-group">
                        <label className="dash-form-label" htmlFor="percent">Discount Percentage:</label>
                        <input
                            className={isLightMode ? "light-dash-form-input" : "dash-form-input"}
                            type="number"
                            id="percent"
                            min="1"
                            max="100"
                            placeholder="Enter percentage..."
                            value={percent}
                            onChange={(e) => setPercent(e.target.value)}
                        />
                    </div>

                    <span className={isLightMode ? "light-dash-form-noti" : "dash-form-noti"}>
                        STORE POLICY: Discount limit of 25%, unless stated otherwise by management.</span>

                    <div className="dash-form-buttons">
                        <button className={isLightMode ? "light-dash-form-button" : "dash-form-button"} onClick={handleCancel}>Cancel</button>
                        <button className={isLightMode ? "light-dash-form-button" : "dash-form-button"} onClick={generateDiscount}>Generate</button>
                    </div>
                </div>

                <div className={isLightMode ? "light-dash-discount-table" : "dash-discount-table"}>
                    <table className={isLightMode ? "light-discount-table-container" : "discount-table-container"}>
                        <thead>
                        <tr className={isLightMode ? "light-dash-table-descriptors" : "dash-table-descriptors"}>
                            <th>Discount Code</th>
                            <th>Creation Date</th>
                            <th>Discount Percentage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {discounts.map((discount) => (
                            <tr key={discount.code}>
                                <td>{discount.code}</td>
                                <td>{discount.createdAt}</td>
                                <td>{discount.percent}%</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;