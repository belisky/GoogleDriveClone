import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFile} from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const File = ({file}) => {
    return (
        <a key={file.id} href={file.url} target="blank" className="btn btn-outline-dark text-truncate w-100">
            <FontAwesomeIcon icon={faFile} className="mr-2" />
            {file.name}
         </a>
    )
}

export default  File
