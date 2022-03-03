import { initializeApp } from 'firebase/app'
import { getAuth } from '@firebase/auth'
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig={
    apiKey:'AIzaSyCfurWBl5We8Hk4DQZ-qk3oNlwtxUS_7sY',
    authDomain: 'fullauthentication-70fa8.firebaseapp.com',
    projectId: 'fullauthentication-70fa8',
    storageBucket: 'fullauthentication-70fa8.appspot.com',
    messagingSenderId:'530378337905',
    appId: '1:530378337905:web:9d684a1ac5b6092fe0f5d0'

 
}

const app = initializeApp(firebaseConfig)
export const storage=getStorage()
export const auth = getAuth(app)
export const db = getFirestore();
 
 