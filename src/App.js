import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Second from './components/home/Second.js';
import DonorSearch from './components/home/DonorSearch.js';
import Register from './components/Register.js';
import Footer from './components/home/Footer.js'; // ✅ import footer

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Second />} />
          <Route path="/DonorSearch" element={<DonorSearch />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>

      <Footer /> {/* ✅ added global footer here */}
    </div>
  );
}

export default App;
