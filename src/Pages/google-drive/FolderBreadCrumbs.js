import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../../Helper/Hooks/useFolder'

const FolderBreadCrumbs = ({ currentFolder }) => {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
    if (currentFolder) {
        path = [...path,...currentFolder.path]
    }   
    return (
        <Breadcrumb
            className="flex-grow-1"
            listProps={{ className: "bg-white pl-0 m-0" }}>
            {path.map((folder,index) =>( 
                <Breadcrumb.Item className="text-truncate d-inline-block"
                    style={{ maxWidth: "150px" }} key={folder.id}
                    linkAs={Link}
                    linkProps={{
                        to: {
                            pathname: folder.id ? `/folder/${folder.id}` : "/",
                           state: { folder: { ...folder, path: path.slice(1,index)}} 
                        }
                    }}>
                    {folder.name}
                </Breadcrumb.Item>)

            )}
            {currentFolder && (
                <Breadcrumb.Item className="text-truncate d-inline-block"
                    style={{ maxWidth: "200px" }} active>
                    {currentFolder.name}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    )
}

export default FolderBreadCrumbs
