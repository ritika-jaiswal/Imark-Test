import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import GraphListing from './components/GraphListing';
import GraphDetails from './components/GraphDetails';
import GraphForm from './components/GraphForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/manage-graph" element={<GraphForm />} />
        <Route path="/graph-listing" element={<GraphListing />} />
        <Route path="/graph-view/:id"  element={<GraphDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
