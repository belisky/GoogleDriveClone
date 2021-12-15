import React, { useRef, useState } from 'react'
import LoginRegister from '../../Components/LoginRegister'
import { useAuth } from '../../Helper/AuthContext'
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const passwordConfirmRef = useRef("");
    const [error, setError] = useState("");
    const login = true;
    const [loading, setLoading] = useState(false);
    const { loginUser } = useAuth();
    function handleSubmit(e) {
        e.preventDefault()

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setLoading(true)
            await loginUser(emailRef.current.value, passwordRef.current.value);
            history.push("/")
        } catch {
            setError("Failed to Sign In")
        }
        setLoading(false)


    }
    return (<LoginRegister login={login} error={error} handleSubmit={handleSubmit} emailRef={emailRef} passwordRef={passwordRef} passwordConfirmRef={passwordConfirmRef} loading={loading} />)

}

export default Login