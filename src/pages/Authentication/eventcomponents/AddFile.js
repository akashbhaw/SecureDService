/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/order */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable no-useless-return */
import React, { useState, useEffect } from 'react';
import { Stack, Button } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import Iconify from 'src/components/iconify/Iconify';
import { ROOT_FOLDER } from 'src/hooks/useFolder';
import { database, storage } from 'src/sections/firebase/firebase';
import { useAuth } from 'src/sections/contexts/AuthContext';
import { v4 as uuidV4 } from 'uuid';
import { style } from './AddFolder';
import { LinearProgress, Snackbar, SnackbarContent } from '@mui/material';

export default function AddFile({ currentFolder }) {
  const { currentUser } = useAuth();
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [successFiles, setSuccessFiles] = useState([]);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);



  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const id = uuidV4();
    setUploadingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join('/')}/${file.name}`
        : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`;

    const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter((uploadFile) => {
            return uploadFile.id !== id;
          });
        });
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          
          database.files
            .add({
              Url: url,
              name: file.name,
              createdAt: database.getcurrentTimesStamp(),
              folderId: currentFolder.id,
              user: currentUser.uid,
              size: file.size,
            })
            .then(() => {
              // Mark the file as successful
              setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                  if (uploadFile.id === id) {
                    return { ...uploadFile, success: true };
                  }
                  return uploadFile;
                });
              });
      
              // Add the file to the list of successful files
              setSuccessFiles(prevSuccessFiles => [...prevSuccessFiles, file.name]);
            }).then(() => {
              // Mark the file as successful
              setUploadingFiles(prevUploadingFiles => {
                return prevUploadingFiles.map(uploadFile => {
                  if (uploadFile.id === id) {
                    return { ...uploadFile, success: true };
                  }
                  return uploadFile;
                });
              });
            
              // Add the file to the list of successful files
              setSuccessFiles(prevSuccessFiles => [...prevSuccessFiles, file.name]);
            
              // Open the success snackbar
              setSuccessSnackbarOpen(true);
            })
            
            .catch(error => {
              console.log("Error adding file to the database: ", error);
            });
        });
      }
    );
  }

  useEffect(() => {
    let timer;
    if (progress < 100) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 10;
          if (nextProgress >= 100) {
            clearInterval(timer);
          }
          return nextProgress;
        });
      }, 500); // Adjust the interval as needed
    }

    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button href="" target="_blank" variant="outlined" style={style}>
          <label htmlFor="file-upload" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input type="file" id="file-upload" onChange={handleUpload} style={{ display: 'none' }} />
            <Iconify icon="ic:file-upload" /> upload
          </label>
        </Button>
      </Stack>
      {uploadingFiles.map((file) => (
        <Snackbar
          key={file.id}
          open={snackbarOpen}
          onClose={() => {
            setUploadingFiles((prevUploadingFiles) => {
              return prevUploadingFiles.filter((uploadFile) => {
                return uploadFile.id !== file.id;
              });
            });
          }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ zIndex: 9999 }}
        >
          <SnackbarContent
            message={file.name}
            action={
              <>
                {file.error ? (
                  <Button color="error" size="small" onClick={() => setSnackbarOpen(false)}>
                    Dismiss
                  </Button>
                ) : (
                  <>
              {file.success && successFiles.includes(file.name) && (
  <Button color="success" size="small" onClick={() => setSnackbarOpen(false)}>
    Success
  </Button>
)}

                  </>
                )}
              </>
            }
          />
        </Snackbar>
      ))}
      <Snackbar
  open={successSnackbarOpen}
  onClose={() => setSuccessSnackbarOpen(false)}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  autoHideDuration={3000} // Adjust the duration as needed
>
  <SnackbarContent
    message="File uploaded successfully"
    action={
      <Button color="success" size="small" onClick={() => setSuccessSnackbarOpen(false)}>
        Close
      </Button>
    }
  />
</Snackbar>

    </>
  );
}
