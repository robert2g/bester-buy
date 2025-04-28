import React, {useEffect, useState} from 'react';
import {db, auth} from "../config/Config";
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";
import {collection, getDocs} from "firebase/firestore";
import {useTheme} from "../ThemeContext";

import ExitIcon from "../images/cross.svg";
import LightExitIcon from "../images/light-cross.svg";

import './adminstyles/users.css';
import './adminstyles/light-users.css';

const AddUser = ({ onAdd }) => {
    const { isLightMode } = useTheme();
    const [message, setMessage] = useState('');
    const [key, setKey] = useState('');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');

    const handleChange = (event, setText) => {
        setText(event.target.value);
    };

    const addFunc = async () => {
        const data = {
            uid: key,
            username: input1,
            email: input2,
            password: input3
        };
        onAdd(data);
        const res = await db.collection('Users').doc(key).set(data);
    };


        return (
            <div className="add-container">
                <div className={isLightMode ? "light-inventory-inputs" : "inventory-inputs"}>

                    <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                        type="text"
                        value={key}
                        onChange={(event) =>
                            handleChange(event, setKey)} placeholder="User ID"
                    />

                    <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                           type="text"
                           value={input1}
                           onChange={(event) =>
                               handleChange(event, setInput1)} placeholder="Username"
                    />

                    <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                           type="text"
                           value={input2}
                           onChange={(event) =>
                               handleChange(event, setInput2)} placeholder="Email"
                    />

                    <input className={isLightMode ? "light-inventory-input-box" : "inventory-input-box"}
                           type="text"
                           value={input3}
                           onChange={(event) =>
                               handleChange(event, setInput3)} placeholder="Password"
                    />
                    <button className={isLightMode ? "light-add-button" : "add-button"} onClick={addFunc}>Add User</button>
                </div>
            </div>

        );
}

const DeleteUser = ({ onDelete }) => {
    const { isLightMode } = useTheme();
    const [message, setMessage] = useState('');
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
                       type="text"
                       value={input}
                       onChange={(event) =>
                           handleChange(event, setInput)} placeholder="User to delete"/>
                <button className={isLightMode ? "light-delete-button" : "delete-button"} onClick={deleteFunc}>Delete User</button>
            </div>
        </div>
    );
}

function UsersTable() {
    const { isLightMode } = useTheme();
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [isModalOpenDel, setIsModalOpenDel] = useState(false);
    const [users, setUsers] = useState([]);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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
    }

    const closeModalEdit = () => {
        setIsModalOpenEdit(false);
    }

    const handleAddInventoryClickEdit = (user) => {
        openModalEdit();
        setSelectedUser(user);
    }

    const handleAddUser = (newUser) => {
        setUsers((prevUsers) => [... prevUsers, newUser]);
        closeModalAdd();
    }

    const handleDeleteUser = async (uid) => {
        await db.collection('Users').doc(uid).delete();
        setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
        closeModalDel();
    }

    const handleUpdateUser = async (event) => {
        event.preventDefault();
        try {
            await db.collection('Users').doc(selectedUser.uid).update(selectedUser);
            setUsers((prevUsers) => {
                return prevUsers.map((user) =>
                    user.uid === selectedUser.id ? selectedUser : user
                );
            });
            closeModalEdit();
        } catch (error) {
            alert('Error updating order');
        }
    };


    const fetchUsers = async() => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Users'));
            const data = querySnapshot.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }));
            setUsers(data);
        } catch (error) {
            alert('Error fetching users');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={isLightMode ? "light-users-list-table" : "users-list-table"}>

            <Modal className="modal-form" isOpen={isModalOpenAdd} onRequestClose={closeModalAdd} contentLabel="Add Inventory Modal" ariaHideApp={false}>
                <div className={isLightMode ? "light-add-inventory-form-container" : "add-inventory-form-container"}>
                    <span className={isLightMode ? "light-modal-header" : "modal-header"}>Add a User</span>
                    <AddUser onAdd={handleAddUser}/>
                    <button className={isLightMode ? "light-add-inventory-exit-btn" : "add-inventory-exit-btn"} onClick={closeModalAdd}>
                        <img className={"add-exit-icon"} src={isLightMode ? LightExitIcon : ExitIcon} alt={"Search Glass"}/>
                    </button>

                </div>
            </Modal>

            <Modal className="modal-form" isOpen={isModalOpenDel} onRequestClose={closeModalDel} contentLabel="Add Inventory Modal" ariaHideApp={false}>
                <div className={isLightMode ? "light-del-inventory-form-container" : "del-inventory-form-container"}>
                    <span className={isLightMode ? "light-modal-header" : "modal-header"}>Delete a User</span>
                    <DeleteUser onDelete={handleDeleteUser}/>
                    <button className={isLightMode ? "light-del-inventory-exit-btn" : "del-inventory-exit-btn"} onClick={closeModalDel}>
                        <img className={"add-exit-icon"} src={isLightMode ? LightExitIcon : ExitIcon} alt={"Search Glass"}/>
                    </button>
                </div>
            </Modal>

            <div className={isLightMode ? "light-inventory-table-header-frame" : "inventory-table-header-frame"}>
                <span className={isLightMode ? "light-inventory-table-header" : "inventory-table-header"}>Customer Database</span>
                <div className="inventory-header-buttons">
                    <button className={isLightMode ? "light-add-inventory-button" : "add-inventory-button"} onClick={handleAddInventoryClickAdd}>Add User</button>
                    <button className={isLightMode ? "light-del-inventory-exit" : "del-inventory-exit"} onClick={handleAddInventoryClickDel}>Del User</button>
                </div>
            </div>

            <table className={isLightMode ? "light-user-table-container" : "user-table-container"}>
                <thead>
                    <tr className={isLightMode ? "light-user-table-descriptors" : "user-table-descriptors"}>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Edit User Information</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key = {user.uid}>
                        <td>{user.uid}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <button
                                className={isLightMode ? "light-edit-inventory-button" : "edit-inventory-button"}
                                onClick={() => handleAddInventoryClickEdit(user)}
                            >Edit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
                <Modal className={"modal-form"} isOpen={isModalOpenEdit} onRequestClose={closeModalEdit} contentLabel="Add Inventory Modal" ariaHideApp={false}>
                    <div className={isLightMode ? "light-edit-inventory-form-container" : "edit-inventory-form-container"}>
                        <button className={isLightMode ? "light-add-inventory-exit" : "add-inventory-exit"} onClick={closeModalEdit}>
                            <img className={"add-exit-icon"} src={isLightMode ? LightExitIcon : ExitIcon} alt={"Search Glass"}/>
                        </button>
                        <span className={isLightMode ? "light-modal-header" : "modal-header"}>Edit Item</span>
                        {selectedUser && (
                            <form className="edit-form" onSubmit={(e) => handleUpdateUser(e)}>
                                <div className="edit-container">
                                    <div className={isLightMode ? "light-inventory-inputs" : "inventory-inputs"}>
                                        <label>User ID:</label>
                                        <input
                                            className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                            type="text"
                                            value={selectedUser.uid}
                                            disabled
                                        />
                                        <label>Username:</label>
                                        <input
                                            className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                            type="text"
                                            value={selectedUser.username}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                                        />
                                        <label>Email:</label>
                                        <input
                                            className={isLightMode ? "light-inventory-input-box3" : "inventory-input-box3"}
                                            type="text"
                                            value={selectedUser.email}
                                            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
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
    )
}



function Users() {
    const { isLightMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={isLightMode ? "light-users-container" : "users-container"}>

            <div className={isLightMode ? "light-users-header" : 'users-header'}>
                <span>List of User Accounts</span>
            </div>
            <UsersTable />
        </div>
    );
}

export default Users;