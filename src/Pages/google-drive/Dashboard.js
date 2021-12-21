import React from 'react'
import Navigation from './Navigation'
import { Container } from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import {useFolder} from '../../Helper/Hooks/useFolder'
import Folder from './Folder'

const Dashboard = () => {
    const { childFolders,folder } = useFolder("PSPzbLaHxDM6GcQXfXyc");
    console.log(folder)
    console.log(childFolders)

    return (
        <>
            <Navigation />
            <Container fluid>
                <AddFolderButton currentFolder={folder}/>
                {childFolders.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFolders.map(childFolder => (
                            <div key={childFolder.id} style={{ maxWidth: '250px' }} className="p-2">
                                <Folder folder={childFolder} />
                            </div>
                        ))}
                    </div>
                    
                )}
            </Container>
            
        </>
    )
}

export default Dashboard
