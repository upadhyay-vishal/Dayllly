import React, { useState } from "react";
import { auth, setUpRecaptcha, signInWithPhoneNumber } from "../../firebase/Firebase";

const OtpLogin = () => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);

    // OTP bhejne ka function
    const sendOtp = async () => {
        if (!phone) return alert("Please enter phone number!");

        // Phone number format check
        // if (!/^\+?\d{10,15}$/.test(phone)) {
        //     return alert("Please enter a valid phone number with country code!");
        // }

        // ✅ Recaptcha ko setup karo
        setUpRecaptcha();

        try {
            const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            alert("OTP Sent!");
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert(error.message);
        }
    };

    // OTP verify karne ka function
    const verifyOtp = async () => {
        if (!otp) return alert("Please enter OTP!");

        try {
            await confirmationResult.confirm(otp);
            alert("✅ OTP Verified, User Logged In!");
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert(error.message);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Firebase OTP Authentication</h2>

            <input
                type="text"
                placeholder="+91XXXXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ padding: "10px", marginBottom: "10px", width: "200px" }}
            />
            <br />
            <button onClick={sendOtp} style={{ padding: "10px 20px" }}>Send OTP</button>
            <div id="recaptcha-container"></div>

            {confirmationResult && (
                <>
                    <br /><br />
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ padding: "10px", marginBottom: "10px", width: "200px" }}
                    />
                    <br />
                    <button onClick={verifyOtp} style={{ padding: "10px 20px" }}>Verify OTP</button>
                </>
            )}
        </div>
    );
};

export default OtpLogin;
