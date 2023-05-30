/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Popover, MenuItem, IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Iconify from '../../../components/iconify';
import 'firebase/firestore';

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  padding: '10px',
  borderRadius: '10px',
  alignItems: 'center',
  justifyContent: 'space-between', // Adjust spacing as desired
  maxWidth: '400px',
  marginBottom: theme.spacing(0),
  cursor: 'pointer',
  textDecoration: 'none',
  border: '1px solid black',
  color: (theme) => theme.palette.primary.dark,
}));

const DotsButton = styled(IconButton)({
  marginLeft: 'auto',
});

File.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function File({ file, color = 'dark', ...other }) {
  const fileExtension = file.name.split('.').pop().toLowerCase();
  const fileType = fileExtension;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    if (event.currentTarget instanceof HTMLButtonElement) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFileClick = () => {
    window.open(file.Url, '_blank');
  };

  const handleDownload = (event) => {
    event.stopPropagation();
    const link = document.createElement('a');
    link.href = file.Url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = file.name;
    link.click();
    handleMenuClose();
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    // Implement your delete logic for the file
    handleMenuClose();
  };

  const getFileSize = (sizeInBytes) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = sizeInBytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex += 1;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  return (
    <>
      <Tooltip title={`Size: ${getFileSize(file.size)}`}>
        <StyledIcon onClick={handleFileClick}>
          <div>
            <Iconify icon={`bi:filetype-${fileType}`} width={35} height={35} />
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
              {file.name}
            </Typography>
          </div>
          <DotsButton size="small" aria-describedby="file-menu" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </DotsButton>
        </StyledIcon>
      </Tooltip>
      <Popover
        id="file-menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            zIndex: 9999,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon={'bxs:download'} sx={{ mr: 2 }} />
          Download
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
