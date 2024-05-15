import './App.css';
import ProjectList from './components/ProjectList.jsx';
import AddProject from './components/AddProject.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

const App = () => {
  const [formInput, setFormInput] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/" element={<AddProject />} />
        {/* ... other routes */}
      </Routes>
    </Router>
  );
};

export default App;