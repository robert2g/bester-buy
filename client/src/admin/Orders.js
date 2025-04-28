import React, {useEffect, useState} from 'react';
import {collection, getDocs} from "firebase/firestore";
import {db} from "../config/Config";
import {useTheme} from "../ThemeContext";

import "./adminstyles/orders.css";
import "./adminstyles/light-orders.css";

function SortByCheckbox() {
    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);

    const handleCheckboxChange = (checkboxNumber) => {
        switch (checkboxNumber) {
            case 1:
                setChecked1(!isChecked1);
                break;
            case 2:
                setChecked2(!isChecked2);
                break;
            case 3:
                setChecked3(!isChecked3);
                break;
            default:
                break;
        }
    };

    return (
        <div className="orders-checkbox">
            <label>
                <input
                    type="checkbox"
                    checked={isChecked1}
                    onChange={() => handleCheckboxChange(1)}
                />
                Order date
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked2}
                    onChange={() => handleCheckboxChange(2)}
                />
                Customer
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={isChecked3}
                    onChange={() => handleCheckboxChange(3)}
                />
                Price
            </label>
        </div>
    )
}

function OrdersTable() {
    const { isLightMode } = useTheme();
    const [selectedOption, setSelectedOption] = useState('Option 1');
    const [orders, setOrders] = useState([]);

    const fetchOrders = async() => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Orders'));
            const data = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setOrders(data);
        } catch (error) {
            alert('Error fetching orders');
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const sortOrders = () => {
        switch(selectedOption) {
            case 'Option 1':
                return [...orders].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            case 'Option 2':
                return [...orders].sort((a, b) => a.customer.localeCompare(b.customer));
            case 'Option 3':
                return [...orders].sort((a, b) => b.totalPayment - a.totalPayment);
            case 'Option 4':
                return [...orders].sort((a, b) => a.totalPayment - b.totalPayment);
            default:
                return orders;
        }
    }

    const sortedOrders = sortOrders();

    return (
        <div className={isLightMode ? "light-orders-list-table" : "orders-list-table"}>
            <div className={isLightMode ? "light-orders-list-table-header" : "orders-list-table-header"}>
                <span className={isLightMode ? "light-orders-list-table-header-text" : "orders-list-table-header-text"}>Order History</span>

                <div className="dropdown-container">
                    <span className={isLightMode ? "light-orders-sorting-by" : "orders-sorting-by"}>Sort by: </span>

                    <select className={isLightMode ? "light-orders-sorting-dropdown" : "orders-sorting-dropdown"} value={selectedOption} onChange={handleOptionChange}>
                        <option value="Option 1">Order Date</option>
                        <option value="Option 2">Customer</option>
                        <option value="Option 3">Price H-L</option>
                        <option value="Option 4">Price L-H</option>
                    </select>
                </div>
            </div>

            <table className={isLightMode ? "light-orders-table-container" : "orders-table-container"}>

                <thead>
                <tr className={isLightMode ? "light-orders-table-descriptors" : "orders-table-descriptors"}>
                    <th>Order ID</th>
                    <th>Total Payment</th>
                    <th>Discount Code</th>
                    <th>Customer</th>
                    <th className="td-date">Date/Time</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {sortedOrders.map((order) => (
                    <tr key = {order.orderID}>
                        <td>{order.orderID}</td>
                        <td>${order.totalPayment}</td>
                        <td>{order.discountCode}</td>
                        <td>{order.customer}</td>
                        <td>{order.timestamp}</td>
                        <td>{order.status}</td>
                    </tr>
                ))}
                </tbody>

            </table>

        </div>
    )
}


function Orders() {
    const { isLightMode } = useTheme();
    return (
        <div className={isLightMode ? "light-orders-container" : "orders-container"}>

            <div className={isLightMode ? 'light-orders-header' : 'orders-header'}>
                <span>Orders Dashboard</span>
            </div>

            <OrdersTable />

        </div>
    );
}

export default Orders;