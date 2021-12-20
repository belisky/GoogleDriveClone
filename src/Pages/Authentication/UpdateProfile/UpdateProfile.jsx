import React, { useState, useRef } from 'react'
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Helper/AuthContext'
 
export default function UpdateProfile() {
    const navigate = useNavigate();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const passwordConfirmRef = useRef("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { updateMail,updatePass,currentUser } = useAuth();
    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordConfirmRef.current.value !== passwordRef.current.value) {
            return setError("Passwords do not match")
        }
        const promises = []
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateMail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePass(passwordRef.current.value))
        }

        promises.all(promises).then(() => {
           navigate("/") 
        }).catch(() => {
            setError("Failed to update account")
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Container style={{ minHeight: "100vh" }} className="d-flex align-items-center justify-content-center">
            <div style={{ maxWidth: "400px" }} className="w-100">
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef}   placeholder="leave blank to keep the same" />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef}   placeholder="leave blank to keep the same" />
                            </Form.Group>
                            <Button disabled={loading} className="w-100" type="submit" > Update</Button>
                        </Form>

                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-3">
                    <Link to="/">Cancel</Link>
                </div>
            </div>
        </Container>
    )
}
