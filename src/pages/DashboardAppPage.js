
import { Helmet } from 'react-helmet-async';

// @mui

import { Grid, Container, Typography,Button,Stack } from '@mui/material';
// components

import Iconify from '../components/iconify';
// sections
import {

  AppWidgetSummary,

} from '../sections/@dashboard/app';

// user


// 
import UserPage from './UserPage';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
const style={display:'flex',justifyContent:'center',gap:'6px'}

  return (
    <>
      <Helmet>
        <title> My Docs | SDS cloud </title>
      </Helmet>
    <Container maxWidth='xl' style={{display:'flex', justifyContent:'flex-end'}}>

      <Stack spacing={2} direction='row'>

<Button href="" target="_blank" variant="contained" style={style}>
<Iconify icon="ic:sharp-add" /> New
</Button>


<Button href="" target="_blank" variant="outlined" style={style}>

<Iconify icon="mdi:file-upload" /><span>Folder upload</span>
</Button>
<Button href="" target="_blank" variant="outlined" style={style}>

<Iconify icon="mdi:folder-upload" /><span>Folder upload</span>
</Button>

</Stack>
    </Container>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          My Docs
        </Typography>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Suggestions
        </Typography>
        

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3} >
            <AppWidgetSummary title="Root"  icon={'bxs:file-jpg'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Root"  icon={'ant-design:folder-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Root"  icon={'ri:video-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Resume"  icon={'ant-design:file-word-filled'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Resume"  icon={'ic:round-audio-file'} />
          </Grid>

          <Grid item xs={12} >
          <UserPage/>
          </Grid>
          {/* <Grid item xs={12} >
          <ReactVirtualizedTable/>
          </Grid> */}
      
        </Grid>
      </Container>
    </>
  );
}
