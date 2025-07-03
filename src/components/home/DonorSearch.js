import React, { useState } from 'react';
import './DonorSearch.css';
import { useNavigate } from 'react-router-dom';

const donors = [
  { name: 'John Doe', bloodGroup: 'A+', city: 'Delhi', phone: '9876543210' },
  { name: 'Jane Smith', bloodGroup: 'B-', city: 'Mumbai', phone: '9871234560' },
  { name: 'Aman Verma', bloodGroup: 'O+', city: 'Delhi', phone: '9898989898' },
  { name: 'Sara Khan', bloodGroup: 'AB+', city: 'Kolkata', phone: '9787675645' },
  { name: 'Rahul Mehta', bloodGroup: 'A-', city: 'Mumbai', phone: '9753124680' },
];



const DonorSearch = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = donors.filter(
      (donor) =>
        donor.city.toLowerCase() === city.toLowerCase() &&
        donor.bloodGroup === bloodGroup
    );
    setResults(filtered);
  };

  const handleRegister = () => {
    alert("Redirect to donor registration page.");
    // Here you can navigate to a registration page or open a form
  };

 
    return (
      
  <div className="donor-container">
    <div className="top-bar">
      <button className="register-btn" onClick={handleRegister} onClick={()=>navigate("/RegisterDonor")}>➕ Register as a Donor</button>
    </div>

    <h1>🩸 Find Blood Donors</h1>
    <p>Search for life-saving blood donors near you</p>

    <div className="search-box">
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
      </select>
      <button className="search-btn" onClick={handleSearch}>🔍 Search</button>
    </div>

    <div className="results">
      {results.length > 0 ? (
        results.map((donor, index) => (
          <div key={index} className="donor-card">
            <h3>{donor.name}</h3>
            <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
            <p><strong>City:</strong> {donor.city}</p>
            <p><strong>Phone:</strong> {donor.phone}</p>
          </div>
        ))
      ) : (
        <p className="no-results">No donors found. Try different criteria.</p>
      )}
    </div>
  </div>
);

 
};

export default DonorSearch;
