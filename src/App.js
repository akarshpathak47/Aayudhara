
import './App.css';
import React from 'react';

import { Routes,Route} from 'react-router-dom';  
import Home from './components/home/home.js';
import Second from './components/home/Second.js';
import DonorSearch from './components/home/DonorSearch.js';
import RegisterDonor from './components/home/RegisterDonor.js';
import RegisterSuccess from './components/home/RegisterSuccess.js'; 


function App() {
  
  return (
    <div className="App">
       <Routes>
  <Route path="/"  element={<Home/>} />
  <Route path="/Second" element={<Second/>} />
  <Route path="/DonorSearch" element={<DonorSearch/>} />
  <Route path="/RegisterDonor" element={<RegisterDonor/>} />
  <Route path="/RegisterSuccess" element={<RegisterSuccess/>} />
       </Routes>
    </div>

  );
    
}

export default App;
