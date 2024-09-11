import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GraphForm = () => {
  const navigate = useNavigate();
  const [graphRows, setGraphRows] = useState([{ type: '', description: '', date: new Date().toISOString().split('T')[0] }]);

  const handleAddRow = () => {
    setGraphRows([...graphRows, { type: '', description: '', date: new Date().toISOString().split('T')[0] }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...graphRows];
    values[index][event.target.name] = event.target.value;
    setGraphRows(values);
  };

  const handleRemoveRow = (index) => {
    const values = [...graphRows];
    values.splice(index, 1);
    setGraphRows(values);
  };

  const handleSaveChanges = () => {
    console.log('Changes saved:', graphRows);
  };

  return (
    <Box className="p-4 bg-gray-100 min-h-screen">

      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/graph-listing')}
        className="mb-6 ml-4"
      >
        Go to Listing Page
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveChanges}
        className="mt-4 bg-green-500 hover:bg-green-700"
      >
        Add Changes
      </Button>



      <form className="bg-white p-6 rounded-lg shadow-lg">
        <Typography variant="h5" className="mb-4">Manage Graph Form</Typography>

        {graphRows.map((row, index) => (
          <Box key={index} className="flex items-center space-x-4 mb-4">
            <TextField
              label="Type"
              variant="outlined"
              name="type"
              value={row.type}
              onChange={(event) => handleInputChange(index, event)}
              className="flex-1"
            />
            <TextField
              label="Description"
              variant="outlined"
              name="description"
              value={row.description}
              onChange={(event) => handleInputChange(index, event)}
              className="flex-1"
            />
            {/* Date Input Field */}
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              name="date"
              value={row.date}
              onChange={(event) => handleInputChange(index, event)}
              className="flex-1"
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleRemoveRow(index)}
            >
              Remove
            </Button>
          </Box>
        ))}


        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRow}
          className="mt-4 bg-blue-500 hover:bg-blue-700"
        >
          Add Row
        </Button>

      </form>
    </Box>
  );
};

export default GraphForm;
