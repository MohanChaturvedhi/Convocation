import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Box, Fade } from '@mui/material';

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [parsedData, setParsedData] = useState('');
  const [showTable, setShowTable] = useState('');
  const [inputKey, setInputKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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
    }
  };

  const handleParsePreview = () => {
    if (selectedFile) {
      Papa.parse(selectedFile, {
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
  const currentItems = parsedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box className="container" style={{ position: 'absolute', left: '320px', right: '0', display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <Box style={{ background: '#3f51b5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <Typography variant="h3" align="center" gutterBottom style={{ color: '#fff' }}>
          Convocation
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography variant="h5">Select CSV File</Typography>
        <input key={inputKey} type="file" accept=".csv" onChange={handleFileChange} />
      </Box>

      {selectedFile && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" onClick={handleParsePreview}>Preview CSV</Button>
        </Box>
      )}

      {showTable && parsedData && (
        <Box className="popup" display="flex" justifyContent="center" mt={2}>
          <Fade in={showTable} timeout={500}>
            <Box className="popup-content" style={{ display: 'flex', flexDirection: 'column', overflowX: 'auto', background: '#fff', padding: '20px', width: '100%' }}>
              <Typography variant="h5" gutterBottom>Data Preview</Typography>
              <Table style={{ flexGrow: 1, width: '100%' }}>
                <TableHead>
                  <TableRow>
                    {Object.keys(parsedData[0]).map((key) => (
                      <TableCell key={key} sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{key}</TableCell>
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
              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Confirm
                </Button>
                <Button variant="contained" color="error" onClick={handleCancel} style={{ marginLeft: '10px' }}>
                  Cancel
                </Button>
              </Box>
              {parsedData.length > itemsPerPage && (
                <Box mt={2} display="flex" justifyContent="center">
                  {[...Array(Math.ceil(parsedData.length / itemsPerPage)).keys()].map((pageNumber) => (
                    <Button key={pageNumber} onClick={() => handlePagination(pageNumber + 1)} variant="outlined" sx={{ marginX: 1 }}>{pageNumber + 1}</Button>
                  ))}
                </Box>
              )}
            </Box>
          </Fade>
        </Box>
      )}
    </Box>
  );
};

export default UploadFile;
