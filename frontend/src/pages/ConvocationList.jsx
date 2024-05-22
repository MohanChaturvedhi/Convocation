import React, { useState } from 'react';
import {Typography,Select,Button,TextField,Table,TableHead,TableBody,TableRow,TableCell,Box,MenuItem,Modal,IconButton
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { data } from './data.js';

export default function ConvocationList({ Mleft }) {
  const [sessionYear, setSessionYear] = useState('2011-2012');
  const [convocationMembers, setConvocationMembers] = useState([]);
  const [flag, setFlag] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [sort, setSort] = useState({ field: 'name', order: 'asc' });
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const itemsPerPage = 25;

  const Filehandler = (e) => {
    e.preventDefault();
    setConvocationMembers(data);
    setFlag(true);
    setIsSubmitted(true);
  };

  const handleDelete = (item) => {
    setConvocationMembers(convocationMembers.filter(member => member !== item));
  };

  const handleEdit = (item, index) => {
    setEditItem(item);
    setEditIndex(index);
    setEditedItem(item);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (e, updatedItem) => {
    e.preventDefault();
    const updatedMembers = [...convocationMembers];
    updatedMembers[editIndex] = editedItem;
    setConvocationMembers(updatedMembers);
    setEditModalOpen(false);
    setEditMode(false);
    setEditIndex(null);
    setEditedItem({});
  };

  const handleSort = (field) => {
    let newOrder;
    if (field === 'Date') {
      newOrder = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
    } else {
      newOrder = sort.field === field && sort.order === 'asc' ? 'desc' : 'asc';
    }
    setSort({ field, order: newOrder });
  };

  const SearchFilter = (e) => {
    setSearchItem(e.target.value);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
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

  const sortedMembers = [...convocationMembers].sort((a, b) => {
    const comparison = sort.order === 'asc' ? 1 : -1;
    return comparison * (String(a[sort.field]).localeCompare(String(b[sort.field])));
  });

  const filteredMembers = sortedMembers.filter((member) => {
    const searchText = searchItem.toLowerCase();
    return (
      (member.sl_no && member.sl_no.toString().toLowerCase().includes(searchText)) ||
      (member.certificate_no && member.certificate_no.toString().toLowerCase().includes(searchText)) ||
      (member.admn_no && member.admn_no.toString().toLowerCase().includes(searchText)) ||
      (member.name && member.name.toString().toLowerCase().includes(searchText)) ||
      (member.course && member.course.toString().toLowerCase().includes(searchText)) ||
      (member.branch && member.branch.toString().toLowerCase().includes(searchText)) ||
      (member.ogpa && member.ogpa.toString().toLowerCase().includes(searchText)) ||
      (member.ogpa_h && member.ogpa_h.toString().toLowerCase().includes(searchText)) ||
      (member.final_ogpa && member.final_ogpa.toString().toLowerCase().includes(searchText)) ||
      (member.division && member.division.toString().toLowerCase().includes(searchText)) ||
      (member.date_of_result && member.date_of_result.toString().toLowerCase().includes(searchText)) ||
      (member.yop && member.yop.toString().toLowerCase().includes(searchText)) ||
      (member.dept_id && member.dept_id.toString().toLowerCase().includes(searchText)) ||
      (member.course_id && member.course_id.toString().toLowerCase().includes(searchText)) ||
      (member.branch_id && member.branch_id.toString().toLowerCase().includes(searchText)) ||
      (member.deptnm && member.deptnm.toString().toLowerCase().includes(searchText))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

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
    <Box className="container" style={{ marginLeft: `${Mleft}px`, marginRight: '15px', flex: 1 }}>
      <div className="container">
        {!isSubmitted && (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex="1">
            <Typography variant="h4" mb={2}>Session-year</Typography>
            <form onSubmit={Filehandler} className="form" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Select value={sessionYear} onChange={e => setSessionYear(e.target.value)} sx={{ width: '150px', marginRight: '8px', fontSize: '1rem', height: '3rem' }}>
                <MenuItem value="2011-2012">2011-2012</MenuItem>
                <MenuItem value="2012-2013">2012-2013</MenuItem>
                <MenuItem value="2013-2015">2013-2015</MenuItem>
                <MenuItem value="2014-2015">2014-2015</MenuItem>
                <MenuItem value="2015-2016">2015-2016</MenuItem>
                <MenuItem value="2016-2017">2016-2017</MenuItem>
                <MenuItem value="2018-2019">2018-2019</MenuItem>
                <MenuItem value="2019-2020">2019-2020</MenuItem>
                <MenuItem value="2020-2021">2020-2021</MenuItem>
                <MenuItem value="2022-2023">2022-2023</MenuItem>
                <MenuItem value="2023-2024">2023-2024</MenuItem>
              </Select>
              <Button type="submit" variant="contained" sx={{ fontSize: '1rem', padding: '8px 16px', height: '3rem' }}>Submit</Button>
            </form>
          </Box>
        )}
        {flag && (
          <Box sx={{ position: 'relative', zIndex: 2, transition: 'opacity 0.3s ease-in-out', padding: '10px', borderRadius: '5px', marginTop: '10px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)' }}>
            <Typography variant="body1" sx={{ padding: '5px', borderRadius: '5px' }}>
              <span style={{ backgroundColor: '#9155FD', color: '#fff', padding: '10px', borderRadius: '15px' }}>
                Academic Session: {sessionYear}
              </span>
            </Typography>
          </Box>
        )}

        {(flag && convocationMembers.length > 0) && (
          
          <Box style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', zIndex: 1, transition: 'box-shadow 0.3s ease-in-out' }}>
            <Box mt={2} display="flex" alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
              <TextField type="text" placeholder="Search" value={searchItem} onChange={SearchFilter} sx={{ marginLeft: 'auto', mt: 1, width: '200px', fontSize: '1rem', height: '3rem' }} />
            </Box>

            <Box mt={2} style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', zIndex: 1, transition: 'box-shadow 0.3s ease-in-out', overflowX: 'auto', overflowY: 'auto' }}>
              <Table stickyHeader sx={{ display: 'block', overflow: 'auto', maxHeight: '750px' }}>
                <TableHead component="div">
                  <TableRow component="div">
                    {Object.keys(currentItems[0]).map((key) => (
                      <TableCell key={key} sx={{ fontWeight: 'bold', fontSize: '1rem', backgroundColor: 'rgb(103, 119, 239)', color: 'white' }}>
                        <Box display="flex" alignItems="center">
                          {key}
                          {key !== 'Actions' && (
                            <IconButton size="small" onClick={() => handleSort(key)}>
                              {sort.field === key && sort.order === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                            </IconButton>
                          )}
                        </Box>
                      </TableCell>
                    ))}
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem', backgroundColor: 'rgb(103, 119, 239)', color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody component="div">
                  {currentItems.map((row, index) => (
                    <TableRow key={index} component="div">
                      {Object.keys(currentItems[0]).map((key) => (
                        <TableCell key={key}>{row[key] || '---'}</TableCell>
                      ))}
                      <TableCell>
                        <Button color="primary" onClick={() => handleEdit(row, index)}>Edit</Button>
                        <Button color="secondary" onClick={() => handleDelete(row)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            {filteredMembers.length > itemsPerPage && (
              <Box mt={2} display="flex" justifyContent="center">
                {paginationItems.map((item, index) => (
                  <Button key={index} onClick={() => handlePagination(item)} variant="outlined" sx={{
                    marginX: 1,
                    bgcolor: currentPage === item ? '#42a5f5' : 'transparent',
                    color: currentPage === item ? '#fff' : 'inherit',
                    transition: 'background-color 0.2s ease-in-out',
                  }}>{item}</Button>
                ))}
              </Box>
            )}
          </Box>
        )}
        {flag && convocationMembers.length === 0 && (
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>No Data Found</Typography>
        )}
        {editModalOpen && (
          <Modal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Box component="form" onSubmit={(e) => handleEditSubmit(e, editItem)} sx={{ border: '1px solid black', padding: 2, backgroundColor: 'white', borderRadius: 1 }}>
              {Object.keys(editItem).map((key) => (
                <TextField
                  key={key}
                  label={key}
                  value={editItem[key]}
                  onChange={(e) => setEditItem({ ...editItem, [key]: e.target.value })}
                  fullWidth
                  margin="normal"
                />
              ))}
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button type="submit" variant="contained">Submit</Button>
                <Button onClick={() => setEditModalOpen(false)} variant="outlined">Cancel</Button>
              </Box>
            </Box>
          </Modal>
        )}
        {currentItems.length > 0 && (
          <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <Button onClick={downloadData} variant="contained" sx={{ bgcolor: '#9155FD', color: '#fff', transition: 'background-color 0.2s ease-in-out' }}>Download</Button>
          </Box>
        )}
      </div>
    </Box>
  );
}
