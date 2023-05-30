/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from 'src/sections/contexts/AuthContext';
import { database } from 'src/sections/firebase/firebase';

export const FileContext = createContext();

export function FileProvider({ children }) {
  const { currentUser } = useAuth();
  const [totalSize, setTotalSize] = useState(0);

  useEffect(() => {
    // Retrieve existing files for the current user
    if (currentUser) {
      database.files
        .where('user', '==', currentUser.uid)
        .get()
        .then((snapshot) => {
          let totalSize = 0;
          snapshot.forEach((doc) => {
            const fileData = doc.data();
            totalSize += fileData.size;
          });
          setTotalSize(totalSize);
        })
        .catch((error) => {
          console.error('Error retrieving files:', error);
        });
    }
  }, [currentUser]);

  return <FileContext.Provider value={totalSize}>{children}</FileContext.Provider>;
}
