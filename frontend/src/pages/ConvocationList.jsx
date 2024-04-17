import React, { useState } from 'react';
import { Typography, Select, Button, TextField, Table, TableHead, TableBody, TableRow, TableCell, Box, MenuItem, useTheme, useMediaQuery, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { data } from './data.js'; 

export default function ConvocationList() {
  const [sessionYear, setSessionYear] = useState('2016-2017');
  const [convocationMembers, setConvocationMembers] = useState([]);
  const [flag, setFlag] = useState(false);
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // State to store the index of the item being edited
  const [editedItem, setEditedItem] = useState({}); // State to store the edited item
  const itemsPerPage = 25;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const Filehandler = (e) => {
    e.preventDefault();
    setConvocationMembers(data); // Replace with actual data fetching
    setFlag(true);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedItem({ ...convocationMembers[index] });
  };

  const handleSaveEdit = () => {
    const updatedMembers = [...convocationMembers];
    updatedMembers[editIndex] = editedItem;
    setConvocationMembers(updatedMembers);
    setEditIndex(null);
    setEditedItem({});
  };

  const handleEditChange = (key, value) => {
    setEditedItem({ ...editedItem, [key]: value });
  };

  const handleDelete = (index) => {
    console.log('Delete button clicked for index:', index);
  };

  const handleSort = (sortKey) => {
    if (sort === sortKey) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(sortKey);
      setOrder('asc');
    }
  };

  const SearchFilter = (e) => {
    setSearchItem(e.target.value);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setEditIndex(null); 
  };

  const downloadData = () => {
    const headers = Object.keys(convocationMembers[0]);
    const rows = convocationMembers.map(row => {
      return headers.map(header => {
        if (header === 'Date') {
          const [year, month, day] = row[header].split('-');
          return `${month}/${day}/${year}`;
        }
        return row[header];
      });
    });

    const csvContent =
      headers.join(',') + '\n' +
      rows.map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'convocation_data.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const filteredMembers = convocationMembers.filter((member) => {
    const searchText = searchItem.toLowerCase();
    return (
      (member.sl_no && String(member.sl_no).toLowerCase().includes(searchText)) ||
      (member.certificate_no && String(member.certificate_no).toLowerCase().includes(searchText)) ||
      (member.admn_no && String(member.admn_no).toLowerCase().includes(searchText) )||
      (member.name && member.name.toString().toLowerCase().includes(searchText)) ||
      (member.course && member.course.toString().toLowerCase().includes(searchText)) ||
      (member.branch && member.branch.toString().toLowerCase().includes(searchText) )||
      (member.ogpa && member.ogpa.toString().toLowerCase().includes(searchText) )||
      (member.ogpa_h && member.ogpa_h.toString().toLowerCase().includes(searchText)) ||
      (member.final_ogpa && member.final_ogpa.toString().toLowerCase().includes(searchText)) ||
      (member.division && member.division.toString().toLowerCase().includes(searchText) )||
      (member.date_of_result && member.date_of_result.toString().toLowerCase().includes(searchText) )||
      (member.yop && member.yop.toString().toLowerCase().includes(searchText) )||
      (member.dept_id && member.dept_id.toString().toLowerCase().includes(searchText) )||
      (member.course_id && member.course_id.toString().toLowerCase().includes(searchText)) ||
      (member.branch_id && member.branch_id.toString().toLowerCase().includes(searchText) )||
      (member.deptnm && member.deptnm.toString().toLowerCase().includes(searchText))
    );
  });

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sort === 'name' || sort === 'branch' || sort === 'Date') {
      const valueA = a[sort];
      const valueB = b[sort];
      if (order === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    } else {
      return order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort];
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedMembers.length / itemsPerPage);

  const paginationItems = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(i);
    }
  } else {
    if (currentPage <= 3) {
      paginationItems.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      paginationItems.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      paginationItems.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
  }

  return (
    <Box className="container" style={{ position: 'absolute', left: isMobile ? '40px' : 280, right: '0', display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <div className="container">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" mb={2}>Session-year</Typography>
          <form onSubmit={Filehandler} className="form" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Select
              value={sessionYear}
              onChange={e => setSessionYear(e.target.value)}
              sx={{
                width: '150px',
                height: '3rem',
                marginRight: '8px',
                fontSize: '1rem'
              }}
            >
              <MenuItem value="2016-2017">2011-2012</MenuItem>
              <MenuItem value="2016-2017">2012-2013</MenuItem>
              <MenuItem value="2016-2017">2013-2014</MenuItem>
              <MenuItem value="2016-2017">2014-2015</MenuItem>
              <MenuItem value="2016-2017">2015-2016</MenuItem>
              <MenuItem value="2016-2017">2016-2017</MenuItem>
              <MenuItem value="2018-2019">2018-2019</MenuItem>
              <MenuItem value="2019-2020">2019-2020</MenuItem>
              <MenuItem value="2020-2021">2020-2021</MenuItem>
              <MenuItem value="2022-2023">2022-2023</MenuItem>
              <MenuItem value="2023-2024">2023-2024</MenuItem>
            </Select>
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: '1rem',
                padding: '8px 16px',
                height: '3rem' 
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
        {flag && convocationMembers.length > 0 &&
          <Box mt={2} display="flex" alignItems="center">
            
            <TextField
              type="text"
              placeholder="Search"
              value={searchItem}
              onChange={SearchFilter}
              sx={{
                width: '200px',
                height: '3rem', 
                fontSize: '1rem'
              }}
            />
          </Box>
        }
        {flag && convocationMembers.length > 0 &&
          <Box mt={2} display="flex" justifyContent="center" >
            <Button onClick={toggleEditMode} variant="contained" sx={{ bgcolor: editMode ? 'secondary.main' : 'primary.main' }}>
              {editMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
            </Button>
          </Box>}
        <Box mt={2} style={{height:'800px',overflowY:'scroll', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', zIndex: 1, transition: 'box-shadow 0.3s ease-in-out', overflowX: 'auto' }}>
          {currentItems.length > 0 ? (
            <Table>
              <TableHead>
  <TableRow>
    {Object.keys(currentItems[0]).map((key) => (
      <TableCell key={key} sx={{ fontWeight: 'bold', fontSize: '1rem', minWidth: '100px', bgcolor:'#1976d2',color:'white'}}>
        <Box display="flex" alignItems="center">
          {key !== sort ? (
            <IconButton size="small" onClick={() => handleSort(key)}>
              <ArrowUpwardIcon />
            </IconButton>
          ) : order === 'asc' ? (
            <IconButton size="small" onClick={() => handleSort(key)}>
              <ArrowUpwardIcon />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={() => handleSort(key)}>
              <ArrowDownwardIcon />
            </IconButton>
          )}
          <Typography variant="body1">{key}</Typography>
        </Box>
      </TableCell>
    ))}
    {editMode && <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', minWidth: '100px' }}>Actions</TableCell>}
  </TableRow>
</TableHead>

              <TableBody>
                {currentItems.map((row, index) => (
                  <TableRow key={index}>
                    {Object.keys(currentItems[0]).map((key) => (
                      <TableCell key={key} sx={{ minWidth: '60px' }}>
                        {editMode && editIndex === index ? (
                          <TextField
                            value={editedItem[key]}
                            onChange={(e) => handleEditChange(key, e.target.value)}
                            sx={{ fontSize: '0.1rem' }}
                          />
                        ) : (
                          row[key] || '---'
                        )}
                      </TableCell>
                    ))}
                    {editMode && editIndex === index && (
                      <TableCell sx={{ minWidth: '100px' }}>
                        <Button variant="contained" color="primary" onClick={handleSaveEdit}>Save</Button>
                      </TableCell>
                    )}
                    {editMode && editIndex !== index && (
                      <TableCell sx={{ minWidth: '100px' }}>
                        <Button variant="outlined" color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                      </TableCell>
                    )}
                    {editMode && (
                      <TableCell sx={{ minWidth: '100px' }}>
                        <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>Delete</Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          ) : (
            <Box mt={2} display="flex" justifyContent="center" >
            <Typography variant="body1">No data found</Typography>
            </Box>
          )}
        </Box>
        {filteredMembers.length > itemsPerPage && (
          <Box mt={2} display="flex" justifyContent="center" >
            <Button disabled={currentPage === 1} onClick={() => handlePagination(currentPage - 1)} sx={{ marginX: 1 }}>Previous</Button>
            {paginationItems.map((item, index) => (
              <Button key={index} onClick={() => handlePagination(item)} variant="outlined" sx={{ marginX: 1,
                bgcolor: currentPage === item ? '#42a5f5' : 'transparent',
                color: currentPage === item ? '#fff' : 'inherit',
                transition: 'background-color 0.2s ease-in-out',
              }}>{item}</Button>
            ))}
            <Button disabled={currentPage === totalPages} onClick={() => handlePagination(currentPage + 1)} sx={{ marginX: 1 }}>Next</Button>
          </Box>
        )}
      </div>
      {flag && convocationMembers.length > 0 &&
        <Box mt={2} display="flex" justifyContent="center">
          <Button onClick={downloadData} variant="contained" sx={{ bgcolor: '#42a5f5', color: '#fff', transition: 'background-color 0.2s ease-in-out' }}>Download</Button>
        </Box>
      }
 </Box>
 );
}
