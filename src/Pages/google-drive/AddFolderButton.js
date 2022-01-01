import React, { useState } from 'react'
import { Button, Modal, Form,Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import { db } from '../../Config/firebaseConfig'
import { collection, addDoc, serverTimestamp} from "firebase/firestore"
import { useAuth } from '../../Helper/AuthContext'
import { ROOT_FOLDER } from '../../Helper/Hooks/useFolder'

const AddFolderButton = ({currentFolder }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
     const [message, setMessage] = useState("");
    const {currentUser}=useAuth()
    const openModal = () => {
        setOpen(true)
    }
    const closeModal = () => {
        setOpen(false)
    }
    const handleSubmit = async(e) => {
        e.preventDefault(); 
        if (currentFolder === null) return  
        
            const path = [...currentFolder.path];
        if (currentFolder !== ROOT_FOLDER) {
            path.push({name:currentFolder.name,id:currentFolder.id})
        }
        //creating a folder in the DB
        try {
             await addDoc(collection(db, "folders"), {
                name: name,
                parentId: currentFolder.id,
                userId: currentUser.uid,
                path: path,
                createdAt: serverTimestamp()
                
            });
            setMessage(name + " folder added successfully");

         } catch (e) {
            console.error("Error adding document: ", e);
        }

          setName("");
        closeModal(); 
          setMessage("")
        return
    }
    return (
        <>
            {message && <div style={{
                position: 'absolute',
                top: '-50', left: 0, right: 0
            }}>
                <Alert>{message}</Alert>
            </div>}

            <Button onClick={openModal} variant="outline-success" size="sm">
                <FontAwesomeIcon icon={faFolderPlus} size="2x" />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control type="text" required
                              
                                onChange={e=>setName(e.target.value) }/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" type="button" onClick={closeModal}>Close</Button>
                        <Button variant="success" type="submit"  >Add Folder</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddFolderButton
