import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GraphDetails = () => {
  const { id } = useParams();  
  const [graph, setGraph] = useState(null);

  useEffect(() => {
    const fetchGraphDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/graphs/${id}`);
        setGraph(response.data);

        // Render the graph
        const ctx = document.getElementById('graph-canvas').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: response.data.dates,
            datasets: [{
              label: response.data.title,
              data: response.data.prices,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          },
        });
      } catch (error) {
        console.error('Error fetching graph details:', error);
      }
    };

    fetchGraphDetails();
  }, [id]);

  return (
    <div>
      {graph ? (
        <div>
          <h2>{graph.title}</h2>
          <canvas id="graph-canvas" width="400" height="200"></canvas>
          <p>Dates: {graph.dates.join(', ')}</p>
          <p>Prices: {graph.prices.join(', ')}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GraphDetails;
