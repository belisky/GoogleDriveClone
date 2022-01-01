import React from 'react'
import Navigation from './Navigation'
import { Container } from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import {useFolder} from '../../Helper/Hooks/useFolder'
import Folder from './Folder'
import File from './File'
import FolderBreadCrumbs from './FolderBreadCrumbs'
import AddFileButton from './AddFileButton'
import { useParams,useLocation } from 'react-router-dom'

const Dashboard = () => {
    const { folderId } = useParams()
    const {state={}} = useLocation() 
   
    const { childFolders, folder, childFiles } = useFolder(folderId, state);
    console.log(childFolders)
    console.log(childFiles)
  return (
        <>
            <Navigation />
            <Container fluid>
              <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                    <FolderBreadCrumbs currentFolder={folder} />
                    <AddFileButton currentFolder={folder} childFiles={childFiles}/>
                <AddFolderButton currentFolder={folder}/>

                </div>
                {childFolders.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFolders.map(child => (                             
                            <div key={child.id} style={{ maxWidth: "150px" }}
                                className="p-2">
                                <Folder folder={child} />
                            </div>
                        ))}
                    </div>
                    
                )}
                {childFolders.length>0 && childFiles.length>0&& <hr/>}
                {childFiles.length > 0 && (
                    <div className="d-flex flex-wrap">
                        {childFiles.map(childFile => (
                            <div key={childFile.id} style={{ maxWidth: "150px" }}
                                className="p-2">
                                < File file={childFile} />
                            </div>
                        ))}
                    </div>
                    
                )}
            </Container>
            
        </>
    )
}

export default  Dashboard
