import React,{useState,useEffect} from 'react'
import { auth } from '../Config/firebaseConfig';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut, onAuthStateChanged,
    updateEmail,
    updatePassword
} from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState("");
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email,password)
    }
    function loginUser(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logout() {
        return auth.signOut()
    }
    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }
    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }
    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    value = {
        currentUser,
        signUp,
        loginUser,
        logout,
        resetPassword,
        updatePassword,
        updateEmail
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
        )
        
}
