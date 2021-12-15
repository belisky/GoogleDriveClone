import React  from 'react'
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LoginRegister({emailRef,passwordRef,passwordConfirmRef,handleSubmit,loading,error,register: login}) {

    return (
        <Container style={{minHeight:"100vh"}} className="d-flex align-items-center justify-content-center">
            <div style={{ maxWidth: "400px" }} className="w-100">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">{login ? "Sign Up" : "Log In"}</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required/>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            {!login && <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>}
                            <Button disabled={loading} className="w-100" type="submit" >{login ? "Sign Up" : "Log In"}</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    {login ?`Need an account? <Link to="/signup">Sign Up</Link>`:`Already have an account? <Link to="/login">Log In</Link>`}
                </div>
            </div>
        </Container>
    )
}
