import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app'
import { Auth, getAuth } from 'firebase/auth'

const firebaseConfig: FirebaseOptions = {
    apiKey: "AIzaSyAdn_KDCuioYgkuDkzwGo1C2hI5d2QZuQc",
    authDomain: "hotelapp-1a7f1.firebaseapp.com",
    projectId: "hotelapp-1a7f1",
    storageBucket: "hotelapp-1a7f1.appspot.com",
    messagingSenderId: "1091937215860",
    appId: "1:1091937215860:web:fdeeffd4e928b575107821",
}

export const app: FirebaseApp = initializeApp(firebaseConfig)
export const auth: Auth = getAuth()
