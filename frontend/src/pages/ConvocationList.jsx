import React, { useState } from 'react';
import { Typography, Select, Button, TextField, Table, TableHead, TableBody, TableRow, TableCell, Box, MenuItem } from '@mui/material';
import { data } from './data.js'; // Mock data for development (optional)

export default function ConvocationList() {
  const [sessionYear, setSessionYear] = useState('2016-2017');
  const [convocationMembers, setConvocationMembers] = useState([]);
  const [flag, setFlag] = useState(false);
  const [sort, setSort] = useState('name');
  const [order, setOrder] = useState('asc');
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
      temp.sort((a, b) => order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    } else if (sort === 'branch') {
      temp.sort((a, b) => order === 'asc' ? a.branch.localeCompare(b.branch) : b.branch.localeCompare(a.branch));
    } else if (sort === 'Date') {
      temp.sort((a, b) => {
        const dateA = a.Date.split("-");
        const dateB = b.Date.split("-");
        const yearComparison = dateA[0] - dateB[0];
        if (yearComparison !== 0) {
          return order === 'asc' ? yearComparison : -yearComparison;
        } else {
          return order === 'asc' ? dateA[1] - dateB[1] : dateB[1] - dateA[1];
        }
      });
    } else {
      temp.sort((a, b) => order === 'asc' ? a.cgpa - b.cgpa : b.cgpa - a.cgpa);
    }
    setConvocationMembers(temp);
  };

  const SearchFilter = (e) => {
    setSearchItem(e.target.value);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOrderChange = (e) => {
    setOrder(e.target.value);
  };

  const downloadData = () => {
    // Create CSV content with column headings
    const headers = Object.keys(convocationMembers[0]);
    const rows = convocationMembers.map(row => {
      // Convert the date format if the field is 'Date'
      return headers.map(header => {
        if (header === 'Date') {
          // Convert 'YYYY-MM-DD' to 'MM/DD/YYYY' format
          const [year, month, day] = row[header].split('-');
          return `${month}/${day}/${year}`;
        }
        return row[header];
      });
    });
  
    // Combine headers and rows into CSV content
    const csvContent =
      headers.join(',') + '\n' +
      rows.map(row => row.join(',')).join('\n');
  
    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'convocation_data.csv');
    link.style.visibility = 'hidden';
  
    // Append the anchor to the body and trigger the download
    document.body.appendChild(link);
    link.click();
  
    // Clean up
    document.body.removeChild(link);
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
    <Box className="container" style={{ marginLeft: '270px', marginRight:'15px' }}>
      <div className="container">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" mb={2}>Session-year</Typography>
          <form onSubmit={Filehandler} className="form" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Select value={sessionYear} onChange={e => setSessionYear(e.target.value)} sx={{ width: '150px', marginRight: '8px', fontSize: '1rem',height:'3rem' }}>
              <MenuItem value="2016-2017">2016-2017</MenuItem>
              <MenuItem value="2018-2019">2018-2019</MenuItem>
              <MenuItem value="2019-2020">2019-2020</MenuItem>
              <MenuItem value="2020-2021">2020-2021</MenuItem>
              <MenuItem value="2022-2023">2022-2023</MenuItem>
              <MenuItem value="2023-2024">2023-2024</MenuItem>
            </Select>
            <Button type="submit" variant="contained" sx={{ fontSize: '1rem', padding: '8px 16px', height:'3rem'}}>Submit</Button>
          </form>
        </Box>
        {flag && convocationMembers.length > 0 &&
          <Box mt={2} display="flex" alignItems="center">
            <form onSubmit={ApplyFilter} className="form">
              <Select value={sort} onChange={(e) => setSort(e.target.value)} sx={{ width: '150px', fontSize: '1rem', padding: '8px 16px', height:'3rem' }}>
                <MenuItem value="cgpa" sx={{ fontSize: '1rem' }}>CGPA</MenuItem>
                <MenuItem value="name" sx={{ fontSize: '1rem' }}>Name</MenuItem>
                <MenuItem value="branch" sx={{ fontSize: '1rem' }}>Branch</MenuItem>
                <MenuItem value="Date" sx={{ fontSize: '1rem' }}>Date</MenuItem>
              </Select>
              <Select value={order} onChange={handleOrderChange} sx={{ width: '150px', fontSize: '1rem', padding: '8px 16px', marginLeft: '8px' , height:'3rem'}}>
                <MenuItem value="asc" sx={{ fontSize: '1rem' }}>Ascending</MenuItem>
                <MenuItem value="desc" sx={{ fontSize: '1rem' }}>Descending</MenuItem>
              </Select>
              <Button type="submit" variant="contained" sx={{ fontSize: '1rem', padding: '8px 16px', marginLeft: '8px', height:'3rem' }}>Apply filter</Button>
            </form>
            <TextField type="text" placeholder="Search" value={searchItem} onChange={SearchFilter} sx={{ marginLeft: 'auto', mt: 1, width: '200px', fontSize: '1rem', height:'3rem' }} />
          </Box>
        }
        {currentItems.length > 0 && ( // Conditionally render download button
          <Box mt={2} style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', zIndex: 1, transition: 'box-shadow 0.3s ease-in-out' ,overflowX:'auto'}}>
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
                    {Object.keys(currentItems[0]).map((key) => (
                      <TableCell key={key}>{row[key] || '---'}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
        {filteredMembers.length > itemsPerPage && (
          <Box mt={2} display="flex" justifyContent="center">
            <Button disabled={currentPage === 1} onClick={() => handlePagination(currentPage - 1)} sx={{ marginX: 1 }}>Previous</Button>
            {paginationItems.map((item, index) => (
              <Button key={index} onClick={() => handlePagination(item)} variant="outlined" sx={{ marginX: 1 ,
                bgcolor: currentPage === item ? '#42a5f5' : 'transparent',
                color: currentPage === item ? '#fff' : 'inherit',
                transition: 'background-color 0.2s ease-in-out',
              }}>{item}</Button>
            ))}
            <Button disabled={currentPage === totalPages} onClick={() => handlePagination(currentPage + 1)} sx={{ marginX: 1 }}>Next</Button>
          </Box>
        )}
        {currentItems.length > 0 && ( // Conditionally render download button
          <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <Button onClick={downloadData} variant="contained" sx={{ bgcolor: '#42a5f5', color: '#fff', transition: 'background-color 0.2s ease-in-out' }}>Download</Button>
          </Box>
        )}
      </div>
    </Box>
  );
}
