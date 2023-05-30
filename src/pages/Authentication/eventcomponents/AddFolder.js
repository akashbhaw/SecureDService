/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { Button, Stack, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import Iconify from 'src/components/iconify/Iconify';
// eslint-disable-next-line import/no-unresolved
import { database } from 'src/sections/firebase/firebase';
import { ROOT_FOLDER } from 'src/hooks/useFolder';
import { useAuth } from 'src/sections/contexts/AuthContext';

export const style = { display: 'flex', justifyContent: 'center', gap: '6px' };

// eslint-disable-next-line react/prop-types
export default function AddFolder({currentFolder}) {
  const [open, setOpen] = useState(false);
  const [Name, setName] = useState('');
  const {currentUser}=useAuth()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(currentFolder==null) return
    
    const path = [...currentFolder.path]
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id })
    }

    database.folders.add({
      name: Name,
      user:currentUser.uid,
      CreatedAt:database.getcurrentTimesStamp(),
      path:path,
      // eslint-disable-next-line react/prop-types
      parentId:currentFolder.id
      
    });
    setName('');
    setOpen(false);
  };

  return (
    <>
      <Stack spacing={2} direction="row">
        <Button href="" target="_blank" variant="contained" style={style} onClick={handleClickOpen}>
          <Iconify icon="ic:sharp-add" /> New
        </Button>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Create Folder</DialogTitle>
  <form onSubmit={handleSubmit}>
    <DialogContent>
      <DialogContentText>
        To create a folder, enter the folder name and click Create.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Folder Name"
        type="text"
        fullWidth
        variant="standard"
        value={Name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="error" variant="contained">
        Cancel
      </Button>
      <Button type="submit" color="success" variant="contained">
        Create
      </Button>
    </DialogActions>
  </form>
</Dialog>

    </>
  );
}
