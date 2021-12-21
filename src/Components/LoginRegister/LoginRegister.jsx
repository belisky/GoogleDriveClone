import React  from 'react'
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LoginRegister({emailRef,passwordRef,passwordConfirmRef,handleSubmit,loading,error ,reset,login,message}) {

    return (
        <Container style={{minHeight:"100vh"}} className="d-flex align-items-center justify-content-center">
            <div style={{ maxWidth: "400px" }} className="w-100">
                <Card>
                    <Card.Body>
                        {reset ?<h2 className="text-center mb-4">Password Reset</h2>:<h2 className="text-center mb-4">{login ? "Log In" : "Sign Up"}</h2>}
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required/>
                            </Form.Group>
                            {!reset && <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>}
                            {!login && <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>}
                            <Button disabled={loading} className="w-100 mt-3" type="submit" >{reset ? "Reset Password" : login ? "Log In" : "Sign Up"}</Button>
                        </Form>
                        {login && <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password">Forgot Password</Link>
                        </div>}
                        {reset && <div className="w-100 text-center mt-3">
                            <Link to="/login">Log In</Link>
                        </div>}
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    {login ? <p>Need an account? <Link to="/signup">Sign Up</Link></p> : <p>Already have an account? <Link to="/login">Log In</Link></p>}
                </div>
            </div>
        </Container>
    )
}
