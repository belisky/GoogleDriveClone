import React from 'react'
import Navigation from './Navigation'
import { Container } from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import {useFolder} from '../../Helper/Hooks/useFolder'


const Dashboard = () => {
    const {folder}=useFolder()
    return (
        <>
            <Navigation />
            <Container fluid>
                <AddFolderButton currentFolder={folder}/>
            </Container>
            
        </>
    )
}

export default Dashboard
