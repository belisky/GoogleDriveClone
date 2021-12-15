import React,{useRef,useState} from 'react'
import LoginRegister from '../../Components/LoginRegister'
import { useAuth } from '../../Helper/AuthContext'
import { useHistory } from 'react-router-dom';


const Register = () => {
    const history = useHistory();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const passwordConfirmRef = useRef("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    function handleSubmit(e) {
        e.preventDefault()
        
        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError("Passwords do not match")
        }
        try { 
            setError("")
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to create an account")            
        }
        setLoading(false)

        
    }
    return (<LoginRegister error={error} handleSubmit={handleSubmit} emailRef={emailRef} passwordRef={passwordRef} passwordConfirmRef={passwordConfirmRef} loading={loading}/> )
}

export default Register
