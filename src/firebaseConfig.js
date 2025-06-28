import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA0O-L9TzWTnUXST7Yde4TAQ8i5eg9r08M",
    authDomain: "fir-frontend-9536f.firebaseapp.com",
    projectId: "fir-frontend-9536f",
    storageBucket: "fir-frontend-9536f.firebasestorage.app",
    messagingSenderId: "386791676230",
    appId: "1:386791676230:web:f721197083c93f56f42d47",
    measurementId: "G-EWXHKBCPM6"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)