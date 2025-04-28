import React, {useState} from "react";

import '../pages/pagestyles/account.css';
import '../pages/pagestyles/light-account.css'

import {useNavigate} from "react-router-dom";

import {auth, db} from "../config/Config";
import {useTheme} from "../ThemeContext";
const Account = () => {
    const { isLightMode } = useTheme();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(""); //error messages

    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();

        await auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            //Signed in
            let user = userCredential.user;
            console.log(user);
            navigate(-1);

            // Add a new document in collection "users"
            db.collection("Users").doc(user.uid).set({
                username: username,
                email: email,
                uid: user.uid
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                // setError(getFriendlyErrorMessage(error.code));
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // setError(getFriendlyErrorMessage(error.code));
        });
    }
    const handleLogin = async (e) => {
        e.preventDefault();

        await auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            //Signed in
            let user = userCredential.user;
            console.log(user);
            navigate(-1);
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // setError(getFriendlyErrorMessage(error.code));
        });
    }


    const [action, setAction] = useState("Sign Up");
    
    return (
        <div className={isLightMode ? "light-account-page-container" : "account-page-container"}>
            <div className={isLightMode ? "light-account-page-wrapper" : "account-page-wrapper"}>

                <div className="account-body-header">
                    <div className={isLightMode ? "light-account-header-text" : "account-header-text"}>{action}</div>
                </div>

                <div className="account-body-inputs">
                    {
                        action === "Login" ? <div></div> :
                            <div className="account-input">
                                <input className={isLightMode ? "light-input-attrib" : "input-attrib"} type="text" placeholder="Username" label="Username"
                                value={username} onChange={(e) => setUsername(e.target.value)}
                                required/>
                            </div>
                    }

                    <div className="account-input">
                        <input className={isLightMode ? "light-input-attrib" : "input-attrib"} type="email" placeholder="Email" label="Email address"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required/>
                    </div>

                    <div className="account-input">
                        <input className={isLightMode ? "light-input-attrib" : "input-attrib"} type="password" placeholder="Password" label="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required/>
                    </div>
                </div>
                {error && 
                <div style={{color: 'red'}}>
                    <strong>X</strong> {error}
                </div>
                }
                <div className="submit-container">
                    <div className={`${action === "Login" ? (isLightMode ? "light-submit-gray" : "submit-gray") : (isLightMode ? "light-submit" : "submit")}`}
                    onClick={(e) => {setAction("Sign Up"); handleSignin(e);}}>Sign Up</div>

                    <div className={`${action === "Sign Up" ? (isLightMode ? "light-submit-gray" : "submit-gray") : (isLightMode ? "light-submit" : "submit")}`}
                     onClick={(e) => {setAction("Login"); handleLogin(e)}}>Login</div>
                </div>
            </div>
        </div>
    );
}

function getFriendlyErrorMessage(errorCode) {
    switch(errorCode) {
        case "auth/invalid-email":
            return "Invalid email address.";
        case "auth/user-disabled":
            return "User account disabled.";
        case "auth/user-not-found":
            return "User account not found.";
        case "auth/wrong-password":
            return "Incorrect password.";
        case "auth/email-already-in-use":
            return "Email already in use.";
        case "auth/invalid-login-credentials":
            return "Invalid login credentials.";
        default:
            return "An error occurred.";
    }
}

export default Account;