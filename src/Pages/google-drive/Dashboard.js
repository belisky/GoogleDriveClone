import React from 'react'
import Navigation from './Navigation'
import { Container } from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import {useFolder} from '../../Helper/Hooks/useFolder'
import Folder from './Folder'
import FolderBreadCrumbs from './FolderBreadCrumbs'
import { useParams } from 'react-router-dom'

const Dashboard = () => {
    const { folderId } = useParams()
    const { childFolders, folder } = useFolder(folderId);
    console.log(folder)
    console.log(childFolders)

    return (
        <>
            <Navigation />
            <Container fluid>
                <div className="d-flex align-items-center">
                    <FolderBreadCrumbs currentFolder={folder} />
                <AddFolderButton currentFolder={folder}/>

                </div>
                {childFolders.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFolders.map(childFolder => (
                            <div key={childFolder.id} style={{ maxWidth: "150px" }}
                                className="p-2">
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
