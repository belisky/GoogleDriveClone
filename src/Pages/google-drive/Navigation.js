import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Navigation = () => {
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Brand>
                WDS Drive
            </Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/user">
                    Profile
                </Nav.Link>
            </Nav>
         </Navbar>
    )
}

export default Navigation
