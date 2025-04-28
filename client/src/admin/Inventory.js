import React, {useEffect, useState} from 'react';
import { db } from '../config/Config';
import { doc, updateDoc } from "firebase/firestore";
import Modal from 'react-modal';
import {useNavigate} from "react-router-dom";
import ExitIcon from "../images/cross.svg";
import {collection, getDocs} from "firebase/firestore";
import {useTheme} from "../ThemeContext";

import './adminstyles/inventory.css';
import './adminstyles/light-inventory.css';
import LightExitIcon from "../images/light-cross.svg";
import {FormControlLabel, FormGroup} from "@mui/material";
import {Switch} from "antd";

const AddItem = ({ onAdd }) => {
    const { isLightMode } = useTheme();
    const [key, setKey] = useState('');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState();
    const [input5, setInput5] = useState();
    const [input6, setInput6] = useState('');
    const [input7, setInput7] = useState('');
    const [input8, setInput8] = useState('');
    const [input9, setInput9] = useState('');

    const handleChange = (event, setText) => {
        setText(event.target.value);
    };

    const addFunc = async () => {

        const arrayOfImages = input8.split(',');
        console.log(arrayOfImages);

        const imagesObject = {};
        arrayOfImages.forEach((url, index) => {
            imagesObject[index] = url.trim(); // Trim to remove leading/trailing whitespaces
        });

        const data = {
            id: key,
            name: input1,
            department: input2,
            category: input3,
            brand: input4,
            price: parseFloat(input5),
            sale: input6,
            quantity: parseInt(input7, 10),
            images: imagesObject,
            description: input9
        };
        onAdd(data);

        await db.collection('scraped').doc(key).set(data);
    };

    return (
        <div className="add-container">
            <div className={isLightMode ? "light-inventory-inputs" : "inventory-inputs"}>
                <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                       type="text"
                       value={key}
                       onChange={(event) => handleChange(event, setKey)}
                       placeholder="Product ID"/>

                <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                       type="text"
                       value={input1}
                       onChange={(event) => handleChange(event, setInput1)}
                       placeholder="Product Name"/>

                <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                       type="text"
                       value={input2}
                       onChange={(event) => handleChange(event, setInput2)}
                       placeholder="Department"/>

                <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                       type="text"
                       value={input3}
                       onChange={(event) => handleChange(event, setInput3)}
                       placeholder="Category"/>

                <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                       type="text"
                       value={input4}
                       onChange={(event) => handleChange(event, setInput4)}
                       placeholder="Brand"/>

                <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                       type="text"
                       value={input5}
                       onChange={(event) => handleChange(event, setInput5)}
                       placeholder="Price"/>

                <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                       type="text"
                       value={input6}
                       onChange={(event) => handleChange(event, setInput6)}
                       placeholder="Sale"/>

                <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                       type="text"
                       value={input7}
                       onChange={(event) => handleChange(event, setInput7)}
                       placeholder="Quantity Available"/>

                <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                       type="text"
                       value={input8}
                       onChange={(event) => handleChange(event, setInput8)}
                       placeholder="Image URL"/>

                <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                       type="text"
                       value={input9}
                       onChange={(event) => handleChange(event, setInput9)}
                       placeholder="Description"/>

                <button className={isLightMode ? "light-add-button" : "add-button"} onClick={addFunc}>Add Item</button>
            </div>
        </div>
    );
}

const DeleteItem = ({ onDelete }) => {
    const { isLightMode } = useTheme();
    const [input, setInput] = useState('');

    const deleteFunc = async () => {
        onDelete(input);
    };
    const handleChange = (event, setText) => {
        setText(event.target.value);
    };

    return (
        <div className="delete-container">
            <div className={isLightMode ? "light-inventory-inputs" : "inventory-inputs"}>
                <input className={isLightMode ? "light-inventory-input-box2" : "inventory-input-box2"}
                       type="text" value={input}
                       onChange={(event) => handleChange(event, setInput)}
                       placeholder="Product ID"/>
                <button className={isLightMode ? "light-delete-button" : "delete-button"} onClick={deleteFunc}>Delete Item</button>
            </div>
        </div>
    );
}


function InvTable() {
    const { isLightMode } = useTheme();
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalOpenDel, setIsModalOpenDel] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [applySale, setApplySale] = useState(false);
    const [saleApplied, setSaleApplied] = useState(false);

    const openModalAdd = () => {
        setIsModalOpenAdd(true);
    };

    const closeModalAdd = () => {
        setIsModalOpenAdd(false);
    };

    const openModalDel = () => {
        setIsModalOpenDel(true);
    };

    const closeModalDel = () => {
        setIsModalOpenDel(false);
    };

    const handleAddInventoryClickAdd = () => {
        openModalAdd();
    };

    const handleAddInventoryClickDel = () => {
        openModalDel();
    };

    const openModalEdit = () => {
        setIsModalOpenEdit(true);
    };

    const closeModalEdit = () => {
        setIsModalOpenEdit(false);
    };

    const handleAddInventoryClickEdit = (order) => {
        openModalEdit();
        setSelectedOrder(order);
    };

    const handleAddItem = (newItem) => {
        setOrders((prevOrders) => [... prevOrders, newItem]);
        closeModalAdd();
    }

    const handleDeleteItem = async (itemID) => {
        await db.collection('scraped').doc(itemID).delete();
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== itemID));
        closeModalDel();
    }

    const handleUpdateOrder = async (event) => {
        event.preventDefault();
        try {
            await db.collection('scraped').doc(selectedOrder.id).update(selectedOrder);
            setOrders((prevOrders) => {
                return prevOrders.map((order) =>
                    order.id === selectedOrder.id ? selectedOrder : order
                );
            });
            closeModalEdit();
        } catch (error) {
            alert('Error updating order');
        }
    };

    const handleImagesChange = (e) => {
        const inputValue = e.target.value;

        try {
            const updatedImages = JSON.parse(inputValue);

            if (updatedImages && typeof updatedImages === 'object') {
                setSelectedOrder({
                    ...selectedOrder,
                    images: updatedImages,
                });
            } else {
                throw new Error('Invalid JSON structure');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            // Handle the error (e.g., show a message to the user)
        }
    };



    const fetchOrder = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'scraped'));
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            // Update each order's price based on sale and switch status
            const updatedOrders = data.map(order => {
                const updatedOrder = { ...order };

                if (applySale && order.sale) {
                    // Truncate itemCost to 2 decimal places
                    updatedOrder.price = (order.price - order.price * (order.sale / 100)).toFixed(2);

                    // Update the actual value in the Firebase collection
                    const orderDocRef = doc(db, 'scraped', order.id);
                    updateDoc(orderDocRef, { price: updatedOrder.price });
                }

                return updatedOrder;
            });

            setOrders(updatedOrders);
        } catch (error) {
            alert('Error fetching orders');
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [applySale, db]);

    const handleSaleToggle = () => {
        setApplySale((prevValue) => !prevValue);
        setSaleApplied(true); // Set the state to indicate that the sale has been applied
    };

    return (
        <div className="inventory-dash-container">
            <Modal className="modal-form" isOpen={isModalOpenAdd} onRequestClose={closeModalAdd} contentLabel="Add Inventory Modal" ariaHideApp={false}>
                <div className={isLightMode ? "light-add-inventory-form-container" : "add-inventory-form-container"}>
                    <span className={isLightMode ? "light-modal-header" : "modal-header"}>Add an Item</span>
                    <AddItem onAdd={handleAddItem}/>
                    <button className={isLightMode ? "light-add-inventory-exit-btn" : "add-inventory-exit-btn"} onClick={closeModalAdd}>
                        <img className={"add-exit-icon"} src={isLightMode ? LightExitIcon : ExitIcon} alt={"Exit Button"}/>
                    </button>

                </div>
            </Modal>

            <Modal className="modal-form" isOpen={isModalOpenDel} onRequestClose={closeModalDel} contentLabel="Add Inventory Modal" ariaHideApp={false}>
                <div className={isLightMode ? "light-del-inventory-form-container" : "del-inventory-form-container"}>
                    <span className={isLightMode ? "light-modal-header" : "modal-header"}>Delete an Item</span>
                    <DeleteItem onDelete={handleDeleteItem}/>
                    <button className={isLightMode ? "light-del-inventory-exit-btn" : "del-inventory-exit-btn"} onClick={closeModalDel}>
                        <img className={"add-exit-icon"} src={isLightMode ? LightExitIcon : ExitIcon} alt={"Exit Button"}/>
                    </button>

                </div>
            </Modal>

            <div className={isLightMode ? "light-inventory-list-table" : "inventory-list-table"}>
                <div className={isLightMode ? "light-inventory-table-header-frame" : "inventory-table-header-frame"}>
                    <span className={isLightMode ? "light-inventory-table-header" : "inventory-table-header"}>Item Inventory</span>
                    <div className="inventory-header-buttons">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={applySale}
                                        onChange={handleSaleToggle}
                                        disabled={saleApplied}
                                        />
                                }
                                    label="Apply Sale"
                                />

                        </FormGroup>
                        <button className={isLightMode ? "light-add-inventory-button" : "add-inventory-button"} onClick={handleAddInventoryClickAdd}>Add Item</button>
                        <button className={isLightMode ? "light-del-inventory-exit" : "del-inventory-exit"} onClick={handleAddInventoryClickDel}>Del Item</button>
                    </div>
                </div>

                <table className={isLightMode ? "light-inventory-table-container" : "inventory-table-container"}>
                    <thead className="inventory-table-body-header">
                    <tr className={isLightMode ? "light-orders-table-descriptors" : "orders-table-descriptors"}>
                        <th style={{ width: '250px'}}>Product ID</th>
                        <th style={{ width: '500px'}}>Product Name</th>
                        <th style={{ width: '100px'}}>Price</th>
                        <th style={{ width: '100px'}}>Sale</th>
                        <th style={{ width: '100px'}}>Quantity Available</th>
                        <th style={{ width: '200px'}}>Edit</th>
                    </tr>

                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.name}</td>
                                <td>${order.price}</td>
                                <td>{order.sale}</td>
                                <td>{order.quantity}</td>
                                <td>
                                    <button
                                        className={isLightMode ? "light-edit-inventory-button" : "edit-inventory-button"}
                                        onClick={() => handleAddInventoryClickEdit(order)}
                                    >Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <Modal className="modal-form" isOpen={isModalOpenEdit} onRequestClose={closeModalEdit} contentLabel="Add Inventory Modal" ariaHideApp={false}>
                        <div className={isLightMode ? "light-edit-inventory-form-container2" : "edit-inventory-form-container2"}>
                            <button className={isLightMode ? "light-add-inventory-exit" : "add-inventory-exit"} onClick={closeModalEdit}>
                                <img className={"add-exit-icon"} src={isLightMode ? LightExitIcon : ExitIcon} alt={"Search Glass"}/>
                            </button>
                            <span className={isLightMode ? "light-modal-header" : "modal-header"}>Edit Item</span>
                            {selectedOrder && (
                                <form className="edit-form" onSubmit={(e) => handleUpdateOrder(e)}>
                                    <div className="edit-container">
                                        <div className={isLightMode ? "light-inventory-inputs" : "inventory-inputs"}>
                                            <label>ID:</label>
                                            <input
                                                className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                                type="text"
                                                value={selectedOrder.id}
                                                disabled
                                            />
                                            <label>Product Name:</label>
                                            <input
                                                className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                                type="text"
                                                value={selectedOrder.name}
                                                onChange={(e) => setSelectedOrder({ ...selectedOrder, name: e.target.value })}
                                            />
                                            <label>Department:</label>
                                            <input
                                                className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                                type="text"
                                                value={selectedOrder.department}
                                                onChange={(e) => setSelectedOrder({ ...selectedOrder, department: e.target.value })}
                                            />
                                            <label>Category:</label>
                                            <input
                                                className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                                type="text"
                                                value={selectedOrder.category}
                                                onChange={(e) => setSelectedOrder({ ...selectedOrder, category: e.target.value })}
                                            />
                                            <label>Brand:</label>
                                            <input
                                                className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                                type="text"
                                                value={selectedOrder.brand}
                                                onChange={(e) => setSelectedOrder({ ...selectedOrder, brand: e.target.value })}
                                            />
                                            <label>Price:</label>
                                            <input
                                                className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                                type="text"
                                                value={selectedOrder.price}
                                                onChange={(e) => setSelectedOrder({ ...selectedOrder, price: e.target.value })}
                                            />
                                            <label>Sale:</label>
                                            <input
                                                className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                                type="text"
                                                value={selectedOrder.sale}
                                                onChange={(e) => setSelectedOrder({ ...selectedOrder, sale: e.target.value })}
                                            />
                                            <label>Quantity Available:</label>
                                            <input
                                                className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                                type="text"
                                                value={selectedOrder.quantity}
                                                onChange={(e) => setSelectedOrder({ ...selectedOrder, quantity: e.target.value })}
                                            />
                                            <label>Image URL:</label>
                                            <input
                                                className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                                type="text"
                                                value={JSON.stringify(selectedOrder.images, null, 2)}
                                                onChange={handleImagesChange}
                                            />
                                            <label>Description:</label>
                                            <input
                                                className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                                type="text"
                                                value={selectedOrder.description}
                                                onChange={(e) => setSelectedOrder({ ...selectedOrder, specs: e.target.value })}
                                            />
                                            <button className={isLightMode ? "light-update-button" : "update-button"} type="submit">
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </Modal>
                </table>
            </div>
        </div>
    );
}

function Inventory() {
    const { isLightMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={isLightMode ? "light-inventory-page-container" : "inventory-page-container"}>
            <div className={isLightMode ? "light-inventory-page-header" : "inventory-page-header"}>
                <span className={isLightMode ? "light-inventory-table-header" : "inventory-table-header"}>Site Inventory Dashboard</span>
            </div>
            <InvTable />
        </div>
    )
}

export default Inventory;