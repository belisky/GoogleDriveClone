import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolder} from '@fortawesome/free-solid-svg-icons'

const Folder = ({folder}) => {
    return (
        <Button to={`/folder/${folder.id}`} variant="outline-dark" className="text-truncate w-100" as={Link}>
            <FontAwesomeIcon icon={faFolder} className="mr-2" />
            {folder.name}
         </Button>
    )
}

export default Folder
