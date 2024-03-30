import React, { useState } from 'react';
import { Typography, Select, Button, TextField, Table, TableHead, TableBody, TableRow, TableCell, Box, MenuItem } from '@mui/material';
import { data } from './data.js'; // Mock data for development (optional)

export default function ConvocationList() {
  const [sessionYear, setSessionYear] = useState('2016-2017');
  const [convocationMembers, setConvocationMembers] = useState([]);
  const [flag, setFlag] = useState(false);
  const [sort, setSort] = useState('name');
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const Filehandler = (e) => {
    e.preventDefault();
    setConvocationMembers(data); // Replace with actual data fetching
    setFlag(true);
  };

  const ApplyFilter = (e) => {
    e.preventDefault();
    let temp = [...convocationMembers];
    if (sort === 'name') {
      temp.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'branch') {
      temp.sort((a, b) => a.branch.localeCompare(b.branch));
    } else if (sort === 'Date') {
      temp.sort((a, b) => {
        const dateA = a.Date.split("-");
        const dateB = b.Date.split("-");
        const yearComparison = dateA[0] - dateB[0];
        if (yearComparison !== 0) {
          return yearComparison;
        } else {
          return dateA[1] - dateB[1];
        }
      });
    } else {
      temp.sort((a, b) => a.cgpa - b.cgpa);
    }
    setConvocationMembers(temp);
  };

  const SearchFilter = (e) => {
    setSearchItem(e.target.value);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredMembers = convocationMembers.filter((member) => {
    const searchText = searchItem.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchText) ||
      member.branch.toLowerCase().includes(searchText) ||
      member.Date.toLowerCase().includes(searchText) ||
      member.cgpa.toString().includes(searchText)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box className="container" style={{ marginLeft: '320px' }}>
      <div className="container">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" mb={2}>Session-year</Typography>
          <form onSubmit={Filehandler} className="form" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Select value={sessionYear} onChange={e => setSessionYear(e.target.value)} sx={{ width: '150px', marginRight: '8px', fontSize: '1rem' }}>
              <MenuItem value="2016-2017">2016-2017</MenuItem>
              <MenuItem value="2018-2019">2018-2019</MenuItem>
              <MenuItem value="2019-2020">2019-2020</MenuItem>
              <MenuItem value="2020-2021">2020-2021</MenuItem>
              <MenuItem value="2022-2023">2022-2023</MenuItem>
              <MenuItem value="2023-2024">2023-2024</MenuItem>
            </Select>
            <Button type="submit" variant="contained" sx={{ fontSize: '1rem', padding: '8px 16px' }}>Submit</Button>
          </form>
        </Box>
        {flag && convocationMembers.length > 0 &&
          <Box mt={2} display="flex" alignItems="center">
            <form onSubmit={ApplyFilter} className="form">
              <Select value={sort} onChange={(e) => setSort(e.target.value)} sx={{ width: '150px', fontSize: '1rem', padding: '8px 16px' }}>
                <MenuItem value="cgpa" sx={{ fontSize: '1rem' }}>CGPA</MenuItem>
                <MenuItem value="name" sx={{ fontSize: '1rem' }}>Name</MenuItem>
                <MenuItem value="branch" sx={{ fontSize: '1rem' }}>Branch</MenuItem>
                <MenuItem value="Date" sx={{ fontSize: '1rem' }}>Date</MenuItem>
              </Select>
              <Button type="submit" variant="contained" sx={{ fontSize: '1rem', padding: '8px 16px', marginLeft: '8px' }}>Apply filter</Button>
            </form>
            <TextField type="text" placeholder="Search" value={searchItem} onChange={SearchFilter} sx={{ marginLeft: 'auto', mt: 1, width: '200px', fontSize: '1rem' }} />
          </Box>
        }
        <Box mt={2} style={{ boxShadow: '0px 0px 10px rgba(0.1, 0.1, 0.1, 0.1)', zIndex: 1, transition: 'box-shadow 0.3s ease-in-out' }}>
          {currentItems.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(currentItems[0]).map((key) => (
                    <TableCell key={key} sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography variant="body1">No data found</Typography>
          )}
        </Box>
        {filteredMembers.length > itemsPerPage && (
          <Box mt={2} display="flex" justifyContent="center">
            {[...Array(Math.ceil(filteredMembers.length / itemsPerPage)).keys()].map((pageNumber) => (
              <Button key={pageNumber} onClick={() => handlePagination(pageNumber + 1)} variant="outlined" sx={{ marginX: 1 }}>{pageNumber + 1}</Button>
            ))}
          </Box>
        )}
      </div>
    </Box>
  );
}
