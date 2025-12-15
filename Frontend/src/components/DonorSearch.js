// DonorSearch.js – no changes for Register validation but preserved structure
import React, { useState } from 'react';
import './DonorSearch.css';


const DonorSearch = () => {
  const [city, setCity] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [results, setResults] = useState([]);
  

  const handleSearch = async () => {
    if (!city || !bloodGroup) {
      return alert('Please enter city and select blood group.');
    }

    try {
      const url = `http://localhost:5000/api/donor/search?city=${encodeURIComponent(city)}&bloodGroup=${encodeURIComponent(bloodGroup)}`;
      console.log('🔍 Fetching:', url);
      const res = await fetch(url);
      const data = await res.json();
      console.log('🩸 Results:', data);
      setResults(data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch donors');
    }
  };

  return (
    <div className="donor-container">
      <h1>🩸 Find Blood Donors</h1>
      <div className="search-box">
        <input placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option><option value="A-">A-</option>
          <option value="B+">B+</option><option value="B-">B-</option>
          <option value="O+">O+</option><option value="O-">O-</option>
          <option value="AB+">AB+</option><option value="AB-">AB-</option>
        </select>
        <button onClick={handleSearch}>🔍 Search</button>
      </div>

      

      <div className="results">
        {results.length ? (
          results.map((d, i) => (
            <div key={i} className="donor-card">
              <h3>{d.fullname}</h3>
              <p><b>Blood Group:</b> {d.bloodGroup}</p>
              <p><b>City:</b> {d.city}</p>
              <p><b>Phone:</b> {d.phone}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No donors found.</p>
        )}
      </div>
    </div>
  );
};

export default DonorSearch;
