/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableHead,
  TableContainer,
  TablePagination,
  Typography
} from '@mui/material';

import { Helmet } from 'react-helmet-async';

import { database } from 'src/sections/firebase/firebase'; // Assuming you have the Firebase configuration and database object in a separate file

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'size', label: 'Size', alignRight: false },
  // Add more table headers if needed
  { id: '' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_file) => _file.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const UserPage = () => {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch files from the database and update the state
    const fetchFiles = async () => {
      try {
        const snapshot = await database.files.get();
        const filesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFiles(filesData);
      } catch (error) {
        console.log('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);



  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      // Select all rows
    } else {
      // Deselect all rows
    }
  };

  const handleClick = (_event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - files.length) : 0;

  const filteredFiles = applySortFilter(files, getComparator(order, orderBy), filterName);

  return (
    <>
    <Helmet>
    <title> Recent | SDS cloud </title>
  </Helmet>
  <Typography variant="h4" sx={{ mb: 5 }}>
      Recent
    </Typography>
    <Container>
      <Card>
        <Paper>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < filteredFiles.length}
                      checked={filteredFiles.length > 0 && selected.length === filteredFiles.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  {TABLE_HEAD.map((headCell) => (
                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFiles
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((file) => {
                    const { id, name, size } = file;
                    const selectedFile = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedFile}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedFile}
                            onChange={(event) => handleClick(event, name)}
                          />
                        </TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{size}</TableCell>
                        {/* Add more table cells if needed */}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredFiles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Card>
    </Container>
    </>
  );
};

export default UserPage;
