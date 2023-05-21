import { styled,alpha} from '@mui/material/styles'
import { Box, Link,Typography, Avatar} from '@mui/material';
// mock
import account from '../../../_mock/account';

export default function Profile11(){
    const StyledAccount = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(2, 2.5),
        borderRadius: Number(theme.shape.borderRadius) * 1.5,
        backgroundColor: alpha(theme.palette.grey[500], 0.12),
      }));
return(
<Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
);
}