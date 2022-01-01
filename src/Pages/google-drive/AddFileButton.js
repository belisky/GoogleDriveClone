import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../Helper/AuthContext'
import { storage } from '../../Config/firebaseConfig'
import { ROOT_FOLDER } from '../../Helper/Hooks/useFolder'
import { collection, addDoc, serverTimestamp,   updateDoc, query,where,getDocs } from "firebase/firestore"
import { db } from '../../Config/firebaseConfig'
import { Alert, ProgressBar, Toast } from 'react-bootstrap'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const AddFileButton = ({ currentFolder,childFiles}) => {
    const [message, setMessage] = useState('')
  const[uploadingFiles,setUploadingFiles]=useState([])  
const {currentUser}=useAuth()

    const handleUpload = async (e) => {
        const file = e.target.files[0]
        if (currentFolder == null || file == null) return

        const id = uuidv4()        
        setUploadingFiles((prevUploadingFiles) =>
          [  ...prevUploadingFiles,
        {id:id,name:file.name,progress:0,error:false}])
       
        const parentPath = currentFolder.path.length > 0 ?
            `${currentFolder.path.join('/')}`:""
        
        const filePath = currentFolder === ROOT_FOLDER ?
            `${parentPath} / ${file.name}`
            :`${parentPath}/${currentFolder.name}/${file.name}`
            console.log(uploadingFiles)

        const storageRef = ref(storage, `/files/${currentUser.uid}/${filePath}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes)
                console.log(progress)
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return {...uploadFile,progress:progress}
                        }
                        return uploadFile
                    })
                })
            },
            () => {
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return{...uploadFile,error:true}
                        }
                        return uploadFile
                    })
                })
             },
            async () => {
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.filter(uploadFile => {
                        return uploadFile.id !== id
                    })
                })
                getDownloadURL(uploadTask.snapshot.ref).then(url => {

                    
                    const fileRef = collection(db, "files")
                    const q = query(fileRef, where("name", "==", file.name), where("userId", "==", currentUser.uid), where("folderId", "==", currentFolder.id))


                    async function getting() {
                        try{const querySnapshot = await getDocs(q);
                        console.log(querySnapshot.docs)
                        const existingFile = querySnapshot.docs[0];
                        console.log(existingFile.ref)
                        if (existingFile) {
                            console.log("updated with success")
                             return await updateDoc(existingFile.ref, { url: url }) 
                     
                        }} catch(e){
                        try {
                            console.log("i added duplicate")
                            const docRef = addDoc(collection(db, "files"), {
                                url: url,
                                name: file.name,
                                folderId: currentFolder.id,
                                userId: currentUser.uid,
                                createdAt: serverTimestamp()
                            });
                            setMessage(file.name + " uploaded successfully!!!!")
                            setUploadingFiles("");
                            console.log("Document written with ID: ", docRef.id);
                        }
                        catch (e) {
                            console.error("Error adding document: ", e);
                        }}

                    }
                    return getting() 
                   
                })
            }
        )
    }
    return (
        <div style={{ position: 'relative' }}>
            {message && <Alert>{message}</Alert>}
            <label className="btn btn-outline-success btn-sm m-0 mr-2">
                <FontAwesomeIcon icon={faFileUpload}/>
                < input type="file" onChange={handleUpload}
                    style={{ opacity: 0, position: "absolute", left: "-999px" }} />
            
            </label>
            {uploadingFiles.length > 0 &&
                ReactDOM.createPortal(
                    <div>
                        {uploadingFiles.map(file => (
                            <Toast key={file.id} onClose={() => {
                                setUploadingFiles(prevUploadingFiles => {
                                    return prevUploadingFiles.filter(uploadFile => {
                                        return uploadFile.id!==file.id
                                    })
                                })
                            }}>
                                <Toast.Header
                                    closeButton={file.error}
                                    className="text-truncate w-100 d-block">
                                    {file.name}
                                </Toast.Header>
                                <Toast.Body>
                                    <ProgressBar animated 
                                        variant={file.error ? 'danger' : 'primary'}
                                        now={file.error ? 100 : file.progress * 100}
                                        label={
                                        file.error?"Error":`${Math.round(file.progress*100)}%`
                                    }/>
                                </Toast.Body>
                            </Toast>
                        ))}
                    </div>,
                    document.body
            )}
            
        </div>
    )
}

export default AddFileButton
