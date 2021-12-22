import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../Helper/AuthContext'
import { storage } from '../../Config/firebaseConfig'
import { ROOT_FOLDER } from '../../Helper/Hooks/useFolder'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import {db} from '../../Config/firebaseConfig'


const AddFileButton = () => {
const {currentUser}=useAuth()

    const handleUpload = (e) => {
        const file = e.target.files[0]
        if (currentFolder==null || file==null) return
       
        const parentPath = currentFolder.path.length > 0 ?
            `${currentFolder.path.join('/')}`
            :""
        
        const filePath = currentFolder === ROOT_FOLDER ?
            `${parentPath} / ${file.name}`
            :`${parentPath}/${currentFolder.name}/${file.name}`
        
        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file)

        uploadTask.on(
            'state_changed',
            snapshot => {},
            () => { },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    try {
                        const docRef = await addDoc(collection(db, "files"), {
                            url:url,
                            name:file.name,
                            folderId: currentFolder.id,
                            userId: currentUser.uid,                             
                            createdAt: serverTimestamp()
                        });
                        setMessage(name + " folder created successfully!!!!")
                        console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                })
            }
        )
    }
    return (
        <label className="btn btn-outline-success btn-sm m-0 mr-2">
            <FontAwesomeIcon icon={faFileUpload}/>
            < input type="file" onChange={handleUpload}
                style={{ opacity: 0, position: "absolute", left: "-999px" }} />
            
         </label>
    )
}

export default AddFileButton
