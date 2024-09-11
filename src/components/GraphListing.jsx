import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const GraphListing = () => {
  const [graphData, setGraphData] = useState([]);
  const chartsRef = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/graphs');
        setGraphData(response.data);
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const localChartsRef = chartsRef.current;
    graphData.forEach((graph) => {
      const canvas = document.getElementById(`graph-canvas-${graph.id}`);
      if (canvas) {
        const ctx = canvas.getContext('2d');

        if (chartsRef.current[graph.id]) {
          chartsRef.current[graph.id].destroy();
        }
        chartsRef.current[graph.id] = new Chart(ctx, {
          type: 'line',
          data: {
            labels: graph.dates,
            datasets: [{
              label: graph.title,
              data: graph.prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          },
        });
      }
    });

    return () => {
      Object.keys(localChartsRef).forEach((chartId) => {
        localChartsRef[chartId].destroy();
      });
    };
  }, [graphData]); 

  const handleViewDetails = (graphId) => {
    navigate(`/graph-view/${graphId}`);
  };

  const handleDelete = (graphId) => {
    if (chartsRef.current[graphId]) {
      chartsRef.current[graphId].destroy();
      delete chartsRef.current[graphId];
    }
    setGraphData((prevGraphData) => prevGraphData.filter((graph) => graph.id !== graphId));
  };

  return (
    <div>
      <h2>Graph Listing</h2>
      <div className="graph-container">
        {graphData.map((graph, index) => (
          <div key={index} className="graph-card mb-10 p-4 border">
            <div className="flex justify-between items-center">
              <h3>{graph.title}</h3>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className="bg-blue-500 hover:bg-blue-700"
                  onClick={() => handleViewDetails(graph.id)}
                >
                  View
                </Button>

                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDelete(graph.id)}
                >
                  <Delete />
                </IconButton>
              </div>
            </div>

            <button>Download SVG</button>
            <button>Download PNG</button>
            <button>Download CSV</button>

            <canvas id={`graph-canvas-${graph.id}`} width="400" height="200"></canvas>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphListing;
