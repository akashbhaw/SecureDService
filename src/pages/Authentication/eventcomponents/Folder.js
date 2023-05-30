/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable react/prop-types */
// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// utils
// components
import { Link } from 'react-router-dom';
import Iconify from '../../../components/iconify';




// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '5px',
  alignItems: 'center',
  width: theme.spacing(20),
  height: theme.spacing(20),
  justifyContent: 'center',
  marginBottom: theme.spacing(0),
  cursor:'pointer',
  flexDirection:'column',
  textDecoration:'none'

}));

// ----------------------------------------------------------------------

Folder.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

// eslint-disable-next-line react/prop-types
export default function Folder({ folder,icon, color = 'primary', ...other }) {
  return (
<>
  
      <StyledIcon 
        
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
          `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
            theme.palette[color].dark,
            0.24
            )} 100%)`,
          }}
          as={Link} to={{
            pathname: `/dashboard/docs/folder/${folder.id}`,
            state: { folder:folder },
          }}
          >
         
        <Iconify icon={icon} width={40} height={40} />
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }} textOverflow={30}>
        {folder.name}
      </Typography>
      </StyledIcon>



        </>
  

  );
}
