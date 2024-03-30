import React, { useState } from 'react';
// import axios from 'axios';
import { data } from './data.js'; // Mock data for development (optional)
import { Typography, Select, Button, TextField, Table, TableHead, TableBody, TableRow, TableCell, Box ,MenuItem} from '@mui/material';

export default function ConvocationList() {
  const [sessionYear, setSessionYear] = useState('2016-2017');
  const [convocationMembers, setConvocationMembers] = useState([]);
  const [flag, setFlag] = useState(false);
  const [sort, setSort] = useState('name');
  const [searchItem, setSearchItem] = useState('');

  const Filehandler = (e) => {
    e.preventDefault();
    // try {
    //   const response = await axios.post('http://localhost:8000/convocationlist', {
    //     sessionYear,
    //   });
    //setConvocationMembers(response.data);
    setConvocationMembers(data);
    setFlag(true);
    // } catch (e) {
    //   console.error('Error fetching data:', e);
    // }
  };

  const ApplyFilter = (e) => {
    e.preventDefault();
    let temp = [...convocationMembers]; // Create a new array
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

  const filteredMembers = convocationMembers.filter((member) => {
    const searchText = searchItem.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchText) ||
      member.branch.toLowerCase().includes(searchText) ||
      member.Date.toLowerCase().includes(searchText) ||
      member.cgpa.toString().includes(searchText)
    );
  });

  return (
    <Box className="container" style={{ marginLeft: '320px' }}>
    <div className="container">
      <Typography variant="h4">Session-year</Typography>
      <form onSubmit={Filehandler} className="form">
      <Select value={sessionYear} onChange={e => setSessionYear(e.target.value)}>
          <MenuItem value="2016-2017">2016-2017</MenuItem>
          <MenuItem value="2018-2019">2018-2019</MenuItem>
          <MenuItem value="2019-2020">2019-2020</MenuItem>
          <MenuItem value="2020-2021">2020-2021</MenuItem>
          <MenuItem value="2022-2023">2022-2023</MenuItem>
          <MenuItem value="2023-2024">2023-2024</MenuItem>
    </Select>
        <Button type="submit" variant="contained">Submit</Button>
      </form>
      {flag && convocationMembers.length > 0 &&
        <Box>
          <form onSubmit={ApplyFilter} className="form">
            <Select value={sort} onChange={(e) => setSort(e.target.value)}>
              <MenuItem value="cgpa">CGPA</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="branch">Branch</MenuItem>
              <MenuItem value="Date">Date</MenuItem>
            </Select>
            <Button type="submit" variant="contained">Apply filter</Button>
          </form>
          <TextField type="text" placeholder="Search" value={searchItem} onChange={SearchFilter} />
          <Box>
            {filteredMembers.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    {Object.keys(filteredMembers[0]).map((key) => (
                      <TableCell key={key}>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMembers.map((row, index) => (
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
        </Box>
      }
    </div>
    </Box>
  );
}
