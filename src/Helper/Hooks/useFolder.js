import { useReducer, useEffect } from 'react'
import { db } from '../../Config/firebaseConfig'
import { doc, getDoc, query, collection, where, orderBy,onSnapshot } from 'firebase/firestore'
import { useAuth } from '../AuthContext'

const formattedDoc = (item) => {
    return {
        id: item.id, ...item.data()
    }
}

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
    SET_CHILD_FOLDERS: 'set-child-folders',
    SET_CHILD_FILES:'set-child-files'
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
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,childFiles:action.payload.childFiles
            }
        default:
            return {...state}
    }
}



 export  function useFolder(folderId=null , folder=null ) {
    const { currentUser } = useAuth()


    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    }) 

    useEffect(() => {
        const fetching = () => {
           
           return dispatch({
                type: ACTIONS.SELECT_FOLDER,
                payload: { folderId, folder }
            })
     }
        console.log("select folder")
        return  fetching();

    }, [folderId, folder])
  

    useEffect(() => {
        const fetching = async() => {

        if (folderId ===null) {
            console.log("first")
              return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER }
            })
        }
        
            const docRef = doc(db, "folders", folderId);
            const docSnap = await getDoc(docRef);
            

            if (docSnap) {
                console.log("Document data:", formattedDoc(docSnap));
                const updated=formattedDoc(docSnap)
                  return dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: updated }
                })
                
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        console.log("update folder")
        return  fetching();
    }, [folderId ])


    useEffect(() => {
        const fetching = async () => {
            const children = [];
            const folderRef = collection(db, "folders")

            const q = query(folderRef, where("parentId", "==", folderId), where("userId", "==", currentUser.uid), orderBy("createdAt"))
               return onSnapshot(q, (querySnapshot) => {
             
                querySnapshot.forEach((doc) => {
                    children.push(formattedDoc(doc));
                });
                   console.log("setting children")
                   dispatch({
                      type: ACTIONS.SET_CHILD_FOLDERS,
                      payload: { childFolders: children }
                  })
              });
        }
        console.log("set child folders" )
         return   fetching();

    }, [folderId, currentUser])

    useEffect(() => {
        const fetching = async () => {
            const children = [];
            const fileRef = collection(db, "files")

            const q = query(fileRef,
                where("folderId", "==", folderId),
                where("userId", "==", currentUser.uid),
                orderBy("createdAt"));
            
        return onSnapshot(q, (querySnapshot) => {

                querySnapshot.forEach((doc) => {
                    children.push(formattedDoc(doc));
                });
                  dispatch({
                    type: ACTIONS.SET_CHILD_FILES,
                    payload: { childFiles: children }
                })
            });
        }
        console.log("set child files")
         return   fetching();

    }, [folderId, currentUser])




console.log("the returned State: "+{...state})
    return  state

    
}
