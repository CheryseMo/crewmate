import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CrewmateList from './components/CrewmateList';
import CrewmateForm from './components/CrewmateForm';
import CrewmateDetail from './components/CrewmateDetail';
import './App.css';

function App() {
  const [crewmates, setCrewmates] = useState([]);
  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('crewmates')) || [];
    setCrewmates(stored);
  }, []);


  const stats = getStats(crewmates);
  const success = getSuccess(crewmates);

  return (
    <Routes>
      <Route path="/" 
      element={
        <CrewmateList 
          key={crewmates.length}
          sorted={crewmates} 
          stats={getStats(stats)} 
          success={getSuccess(crewmates)} 
        />
        } 
      />
      <Route path="/create" element={<CrewmateForm crewmates={crewmates} setCrewmates={setCrewmates} />} />
      <Route path="/edit/:id" element={<CrewmateForm editMode={true} crewmates={crewmates} setCrewmates={setCrewmates} />} />
      <Route path="/crewmate/:id" element={<CrewmateDetail crewmates={crewmates} />} />
    </Routes>
  );
}

function getStats(crewmates) {
  const counts = {};
  crewmates.forEach(c => {
    counts[c.attribute] = (counts[c.attribute] || 0) + 1;
  });
  const total = crewmates.length || 1;
  return Object.entries(counts).map(([attr, count]) => ({
    attr,
    percent: Math.round((count / total) * 100),
  }));
}

function getSuccess(crewmates) {
  return `${Math.min(100, crewmates.length * 10)}%`;
}

export default App;
