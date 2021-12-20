import { useReducer, useEffect } from 'react'

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER:'update-folder'
}

const ROOT_FOLDER = { name:"Root",id:null,path:[]}
function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders:[]                
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,folder:payload.folder,
            }
        default:
            return state
    }
}

export function useFolder(folderId = null,folder=null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolder: [],
        childFiles:[]
    })

    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER, payload: {
             folderId,folder
         }})
    }, [folderId, folder])
    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload:{folder:ROOT_FOLDER}
            })
            
        }
    })
    
}