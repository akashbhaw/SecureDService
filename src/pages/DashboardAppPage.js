
import { Helmet } from 'react-helmet-async';

// @mui
import { Grid, Container, Typography, Divider, Stack} from '@mui/material';
// components


// sections

// eslint-disable-next-line import/no-unresolved
import { useFolder } from 'src/hooks/useFolder';
import { useParams} from 'react-router-dom';


// user




import AddFolder from './Authentication/eventcomponents/AddFolder';
import AddBreadCrumps from './Authentication/eventcomponents/AddBreadCrumps';
import AddFile from './Authentication/eventcomponents/AddFile';
import Folder from './Authentication/eventcomponents/Folder';
import File from './Authentication/eventcomponents/File';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
const {folderId}=useParams()

const {folder,childFolders,childFiles}=useFolder(folderId)

  return (
    <>
      <Helmet>
        <title> My Docs | SDS cloud </title>
      </Helmet>
      <Typography variant="h4" sx={{ mb: 5 }}>
          My Docs
        </Typography>
    <Container rowSpacing='2' maxWidth='xl' style={{display:'flex', justifyContent:'flex-end', position:'sticky',top:'0px'}}>
    <Stack direction={'row'} spacing={2}>
    <AddFolder currentFolder={folder}/>
    <AddFile currentFolder={folder}/>
    </Stack>
    </Container>

      <Container maxWidth="xl">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6} md={8}>
          <AddBreadCrumps currentFolder={folder}/>
        </Grid>
          </Grid>
        <Stack spacing={4} mt={4}>
        <Grid xs={6}>
        {childFolders.length > 0 && (
          <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center',flexDirection:'row', gap:'10px',flexWrap:'wrap' }}>
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
              >
              <Folder  folder={childFolder}  icon={'ant-design:folder-filled'} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div style={{display:'flex',justifyContent:'flex-start', alignItems:'center',flexDirection:'row', gap:'10px',flexWrap:'wrap' }}>
            {childFiles.map(childFile => (
              <div
                key={childFile.id}
              >
              <File  file={childFile}/>
              </div>
            ))}
          </div>
        )}

        </Grid>
         <Divider variant='inset'/>


        </Stack>
      </Container>
    </>
  );
}
