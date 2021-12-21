import React,{useState,useEffect,useContext} from 'react'
import { auth } from '../Config/firebaseConfig';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut, onAuthStateChanged,
    sendPasswordResetEmail,updateEmail,updatePassword
    
} from '@firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState("");
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return  createUserWithEmailAndPassword(auth,email,password)
    }
    function loginUser(email, password) {
        return  signInWithEmailAndPassword(auth,email, password)
    }
    function logout() {
        return  signOut(auth)
    }
    function resetPassword(email) {
        return  sendPasswordResetEmail(auth,email)
    }
    function updateMail(email) {
        return updateEmail(currentUser,email)
    }
    function updatePass(password) {
        return updatePassword(currentUser,password)
    }
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth,user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    let value = {
        currentUser,
        signUp,
        loginUser,
        logout,
        resetPassword,
        updatePass,
        updateMail
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
        )
        
}
