import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../pages/pagestyles/accountloggedin.css';

import {auth, db} from "../config/Config";
import {useTheme} from "../ThemeContext";

const AccountLoggedin = () => {
    const { isLightMode } = useTheme();
    const navigate = useNavigate();
    //User Authentication
    const [user, setUser] = useState({});
    const [userData, setUserData] = useState({});

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
    const handleLogOut = async () => {

        await auth.signOut()
        .then(() => {
            //Signed out
            console.log("Signed out");
            navigate(-1);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    return (
        <div className={isLightMode ? "light-account-in-body-container" : "account-in-body-container"}>
            <div className={isLightMode ? "light-account-in-body-wrapper" : "account-in-body-wrapper"}>
                <div className={isLightMode ? "light-account-in-body-head" : "account-in-body-head"}>
                    <h1 className={isLightMode ? "light-account-in-header" : "account-in-header"}>Account Details</h1>
                </div>
                <p className={isLightMode ? "light-account-in-text" : "account-in-text"}>Username: {userData ? userData.username : 'No user logged in'}</p>
                <p className={isLightMode ? "light-account-in-text" : "account-in-text"}>Email: {userData ? userData.email : 'No user logged in'}</p>
                <button className={isLightMode ? "light-account-in-logout" : "account-in-logout"} onClick={handleLogOut}>Log Out</button>
                <button className={isLightMode ? "light-admin-btn" : "admin-btn"} onClick={() => navigate("/admin")}>Admin Dashboard</button>
            </div>
        </div>
    );
}
export default AccountLoggedin;