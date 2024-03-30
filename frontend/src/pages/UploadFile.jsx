import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import { Typography, Button, Table, TableHead, TableBody, TableRow, TableCell, Box } from '@mui/material';

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [parsedData, setParsedData] = useState('');
  const [showTable, setShowTable] = useState('');
  const [inputKey, setInputKey] = useState(0);
  // const [sidebarWidth, setSidebarWidth] = useState(320); // Set initial value to 320px

  useEffect(() => {
    // Reset key when component unmounts to avoid potential issues
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
    setInputKey((prevKey) => prevKey + 1); // Increment the key to force re-render
  };

  return (
    <Box className="container" style={{ position: 'absolute', left: '350px', right: '0', display: 'flex', flexDirection: 'column', }}>
      <Typography variant="h3" align="center" gutterBottom>
        Convocation
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center">
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
          <Box className="popup-content" style={{ display: 'flex', flexDirection: 'column',overflowX:'auto' }}>
            <Typography variant="h5" gutterBottom>Data Preview</Typography>
            <Table style={{ flexGrow: 1,width:'100%' }}>
              <TableHead>
                <TableRow>
                  {Object.keys(parsedData[0]).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {parsedData.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((value, i) => (
                      <TableCell key={i}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Confirm
              </Button>
              <Button variant="contained" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UploadFile;