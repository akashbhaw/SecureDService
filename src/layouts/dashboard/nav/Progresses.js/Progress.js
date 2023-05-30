/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-globals */
import React, { useContext, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { database } from 'src/sections/firebase/firebase';
import { useAuth } from 'src/sections/contexts/AuthContext';
import { FileContext } from './FileContext';

export default function Progress() {
  const { currentUser } = useAuth();
//   const totalSize = useContext(FileContext);
  const [usedStorage, setUsedStorage] = useState(0);
  const maxSize = 5; // Set the maximum size in GB
  const maxSizeInBytes = maxSize * 1024 * 1024 * 1024;
  const formattedTotalSize = formatFileSize(usedStorage);
  const formattedMaxSize = formatFileSize(maxSizeInBytes);

  useEffect(() => {
    if (currentUser) {
      const filesRef = database.files.where('user', '==', currentUser.uid);
      const unsubscribe = filesRef.onSnapshot((snapshot) => {
        let totalStorage = 0;
        snapshot.forEach((doc) => {
          const fileData = doc.data();
          totalStorage += fileData.size;
        });
        setUsedStorage(totalStorage);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <div className="progress_bar">
      <progress value={usedStorage} max={maxSizeInBytes} style={{ height: '10px' }} />
      <Typography>
        {formattedTotalSize} of {formattedMaxSize} used
      </Typography>
    </div>
  );
}

// Helper function to format file size in human-readable format
function formatFileSize(size) {
  if (typeof size !== 'number' || isNaN(size)) {
    return 'Unknown Size';
  }

  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  let formattedSize = size;
  let unitIndex = 0;

  while (formattedSize > 1024 && unitIndex < units.length - 1) {
    formattedSize /= 1024;
    unitIndex += 1;
  }

  return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
}
