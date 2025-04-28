import React, { useState } from 'react';

function EmailSubmission() {

    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
    };

    return (
        <div className="email-container">
            <div className="email-wrapper">
                <h2 className="email-title">GET 15% OFF</h2>
                <p className="email-desc">Subscribe to our newsletter and get 15% off your first order with us.</p>
                <form className="email-submit" onSubmit={handleSubmit}>
                    <input
                        className="email-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="email-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EmailSubmission;