import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const GraphManagement = () => {
  const [graphRows, setGraphRows] = useState([{ type: '', description: '', date: '' }]);

  const handleAddRow = () => {
    setGraphRows([...graphRows, { type: '', description: '', date: '' }]);
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

  return (
    <Box className="p-4 bg-gray-100 min-h-screen">
      <form className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Manage Graph Form</h2>

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
            <TextField
              type="date"
              label="Date"
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

export default GraphManagement;