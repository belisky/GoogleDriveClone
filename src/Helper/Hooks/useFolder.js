import { useReducer, useEffect } from 'react'
import { db } from '../../Config/firebaseConfig'
import { doc, getDocs, getDoc, query, collection, where, orderBy } from 'firebase/firestore'
import { useAuth } from '../AuthContext'

const formattedDoc = (doc) => {
    return {
        id: doc.id, ...doc.data()
    }
}

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
    SET_CHILD_FOLDERS: 'set-child-folders'
}

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SELECT_FOLDER:    
            return {
                folderId: action.payload.folderId,
                folder: action.payload.folder,
                childFiles: [],
                childFolders: []
            }
        case ACTIONS.UPDATE_FOLDER:        
            return {
                ...state, folder: action.payload.folder
            }
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state, childFolders: action.payload.childFolders
            }
        default:
            return state
    }
}



export function useFolder(folderId = null, folder = null) {
    const { currentUser } = useAuth()


    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    }) 

    useEffect(() => {

        if (folderId === null) {
            console.log("first")
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER }
            })
        }
        const fetching = async () => {
            const docRef = doc(db, "folders", folderId);
            const docSnap = await getDoc(docRef);

            if (docSnap) {

                return dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: formattedDoc(docSnap) }
                })
                console.log("Document data:", formattedDoc(docSnap));
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        return fetching();
    }, [folderId])
    // useEffect(() => {
    //     console.log("second")
    //      return dispatch({
    //         type: ACTIONS.SELECT_FOLDER,
    //         payload: { folderId, folder }
    //      })

    // }, [folderId, folder])

    useEffect(() => {
        const fetching = async () => {
            const children = [];
            const folderRef = collection(db, "folders")

            const q = query(folderRef, where("parentId", "==", folderId), orderBy("createdAt"))

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(formattedDoc(doc));
                children.push(formattedDoc(doc))
         
            });return dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS,
                payload: { childFolders: children }
        })
        }
        console.log("fetch" + fetching())
         return fetching();

    }, [folderId, currentUser])


    return state

    
}