import React,{useState,useEffect} from 'react'
import { auth } from '../Config/firebaseConfig';
import {createUserWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState("");

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email,password)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])
    value = {
        currentUser,
        signUp
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
