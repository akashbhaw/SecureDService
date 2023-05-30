/* eslint-disable arrow-body-style */

import { useReducer, useEffect } from "react"
// eslint-disable-next-line import/no-unresolved
import { useAuth } from "src/sections/contexts/AuthContext";
// eslint-disable-next-line no-unused-vars, import/no-unresolved
import { database } from "src/sections/firebase/firebase";



const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS:"set-child-folders",
  SET_CHILD_FILES:"set-child-files"
}

export const ROOT_FOLDER = { name: "Root", id: null, path: [] }

function reducer(state, { type, payload }) {
    switch (type) {
      case ACTIONS.SELECT_FOLDER:
        return {
          folderId: payload.folderId,
          folder: payload.folder,
          childFiles: [],
          childFolders: [],
        };
      case ACTIONS.UPDATE_FOLDER:
        return {
          ...state,
          folder: payload.folder,
        };
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
              ...state,
              childFolders: payload.childFolders,
            };
        case ACTIONS.SET_CHILD_FILES:
            return {
              ...state,
              childFiles: payload.childFiles,
            };
      default:
        return state;
    }
  }
  export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
      folderId,
      folder,
      childFolders: [],
      childFiles: [],
    });

    const {currentUser}=useAuth()
  
    useEffect(() => {
      if (folderId == null) {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      } else {
        database.folders
          .doc(folderId)
          .get()
          .then((doc) => {
            const folderData = database.formatDoc(doc);
            dispatch({
              type: ACTIONS.UPDATE_FOLDER,
              payload: { folder: folderData },
            });
          })
          .catch(() => {
            dispatch({
              type: ACTIONS.UPDATE_FOLDER,
              payload: { folder: ROOT_FOLDER },
            });
          });
      }
    }, [folderId]);
  
    // eslint-disable-next-line arrow-body-style
    useEffect(() => {
       return database.folders
          .where("parentId", "==", folderId)
          .where("user", "==", currentUser.uid)
          .orderBy("CreatedAt")
          .onSnapshot(snapshot => {
            dispatch({
              type: ACTIONS.SET_CHILD_FOLDERS,
              payload: { childFolders: snapshot.docs.map(database.formatDoc) },
            })
          })
    }, [folderId,currentUser])

    useEffect(() => {
        return database.files
           .where("folderId", "==", folderId)
           .where("user", "==", currentUser.uid)
        //    .orderBy("CreatedAt")
           .onSnapshot(snapshot => {
             dispatch({
               type: ACTIONS.SET_CHILD_FILES,
               payload: { childFiles: snapshot.docs.map(database.formatDoc) },
             })
           })
     }, [folderId,currentUser])
    return state;
  }
  