import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// ✅ Sahi Firebase Config

const firebaseConfig = {
    apiKey: "AIzaSyCEyKV3ysVpRVVqa3AaqNbucfwdwp5zg0E",
    authDomain: "techugo-21449.firebaseapp.com",
    projectId: "techugo-21449",
    storageBucket: "techugo-21449.appspot.com",
    messagingSenderId: "1071050092450",
    appId: "1:1071050092450:web:3e5b10901fe4f9f04eccfb",
    measurementId: "G-4L0F68GNB6"
};

// ✅ Firebase Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Recaptcha function export karo
const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: (response) => {
                console.log("Recaptcha Verified!");
            }
        });
    }
};

export { auth, setUpRecaptcha, signInWithPhoneNumber };
