/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import { ROOT_FOLDER } from 'src/hooks/useFolder';
import { NavLink } from 'react-router-dom';

export default function AddBreadcrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
  
  return (
    <Breadcrumbs aria-label="breadcrumb" separator='⟫'>
      {path.map((folder, index) => (
        <NavLink
          key={folder.id}
          to={{
            pathname: folder.id ? `/dashboard/docs/folder/${folder.id}` : '/dashboard/docs',
            state: { folder: { ...folder, path: path.slice(1, index) } }
          }}
          style={{ maxWidth: '150px', textDecoration: 'none' }}
          activeStyle={{ color: 'inherit', textDecoration: 'underline' }}
        >
          {folder.name}
        </NavLink>
      ))}
      {currentFolder && <Typography color="text.primary">{currentFolder.name}</Typography>}
    </Breadcrumbs>
  );
}
