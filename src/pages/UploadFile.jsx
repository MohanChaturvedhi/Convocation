import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Box, Fade } from '@mui/material';

const UploadFile = ({ Mleft }) => {
  const [selectedFile, setSelectedFile] = useState('');
  const [parsedData, setParsedData] = useState('');
  const [showTable, setShowTable] = useState('');
  const [inputKey, setInputKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    return () => setInputKey(0);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const filename = file.name.split('.');

    if (filename[1] !== 'csv') {
      alert('Please upload a CSV file');
      setSelectedFile(null);
      setShowTable(false);
      return;
    } else {
      setSelectedFile(file);
      setShowTable(false);
      Papa.parse(file, {
        complete: (result) => {
          setParsedData(result.data);
          setShowTable(true);
        },
        header: true,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('', { data: parsedData });

      if (response.status === 200) {
        console.log('Data successfully submitted to the backend.');
      } else {
        console.error('Failed to submit data to the backend.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setParsedData(null);
    setShowTable(false);
    setInputKey((prevKey) => prevKey + 1);
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = parsedData ? parsedData.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = parsedData ? Math.ceil(parsedData.length / itemsPerPage) : 0;

  const renderPagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return (
      <>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button disabled={currentPage === 1} onClick={() => handlePagination(currentPage - 1)} sx={{ marginX: 1 }}>Previous</Button>
          {pages.map((page, index) => (
            <Button
              key={index}
              onClick={() => handlePagination(page)}
              variant="outlined"
              sx={{ marginX: 1, color: currentPage === page ? 'primary.main' : 'text.primary', bgcolor: currentPage === page ? 'primary.light' : 'transparent' ,
              transition: 'background-color 0.2s ease-in-out',
            }}
            >
              {page}
            </Button>
          ))}
          <Button disabled={currentPage === totalPages} onClick={() => handlePagination(currentPage + 1)} sx={{ marginX: 1 }}>Next</Button>
        </Box>
      </>
    );
  };

  return (
    <Box className="container" style={{ position: 'absolute', left: `${Mleft}px`, right: '0', display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <Box style={{ background: '#3f51b5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <Typography variant="h3" align="center" gutterBottom style={{ color: '#fff' }}>
          Convocation
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography variant="h5">Select CSV File</Typography>
        <input key={inputKey} type="file" accept=".csv" onChange={handleFileChange} />
      </Box>

      {showTable && parsedData && (
        <Box className="popup" display="flex" justifyContent="center" mt={2}>
          <Fade in={showTable} timeout={500}>
            <Box className="popup-content" style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', background: '#fff', padding: '20px', width: '100%', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)', maxHeight: '750px' }}>
              <Typography variant="h5" gutterBottom>Data Preview</Typography>
              <Table style={{ flexGrow: 1, width: '100%' }}>
                <TableHead>
                  <TableRow>
                    {Object.keys(parsedData[0]).map((key) => (
                      <TableCell key={key} sx={{ fontWeight: 'bold',backgroundColor: 'rgb(103, 119, 239)',color:'white', fontSize: '1rem' }}>{key}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentItems.map((row, index) => (
                    <TableRow key={index}>
                      {Object.keys(parsedData[0]).map((key) => (
                        <TableCell key={key}>{row[key] || ''}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Fade>
        </Box>
      )}
      {selectedFile && showTable && (
        <Box display="flex" justifyContent="space-between" mt={2} alignItems="center">
          <Box>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
          <Box>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Confirm
            </Button>
          </Box>
        </Box>
      )}
      {parsedData && parsedData.length > itemsPerPage && (
        <Box mt={2} display="flex" justifyContent="center">
          {renderPagination()}
        </Box>
      )}
    </Box>
  );
};

export default UploadFile;