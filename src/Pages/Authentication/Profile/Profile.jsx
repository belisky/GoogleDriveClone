import React, { useState }from 'react'
import { Card,Button,Alert,Container } from 'react-bootstrap'
import { useAuth } from '../../../Helper/AuthContext'
import {useNavigate,Link} from 'react-router-dom'
 

const Dashboard = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    async function handleLogout() {
        setError("")
        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }

    }
    return (
        <Container style={{ minHeight: "100vh" }} className="d-flex align-items-center justify-content-center">
            <div style={{ maxWidth: "400px" }} className="w-100" >
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <strong>Email:</strong> {currentUser.email}
                        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                            Update Profile
                        </Link>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogout}/>
                </div>
            </div>
        </Container>
    )
}

export default Dashboard
