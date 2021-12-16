import React, { useRef, useState } from 'react'
import LoginRegister from '../../Components/LoginRegister/LoginRegister'
import { useAuth } from '../../Helper/AuthContext'
import { useHistory } from 'react-router-dom';

const ForgotPassword = () => {
  
    const emailRef = useRef("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const reset = true;
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();
    function handleSubmit(e) {
        e.preventDefault()

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value);
            setMessage("Check you inbox for further instructions")
        } catch {
            setError("Failed to Sign In")
        }
        setLoading(false)


    }
    return (<LoginRegister message={message} reset={reset} error={error} handleSubmit={handleSubmit} emailRef={emailRef} passwordRef={passwordRef} passwordConfirmRef={passwordConfirmRef} loading={loading} />)

}

export default ForgotPassword
