import './home.css';
import React from 'react';
import blood from '../../img/blood.png';
import{useNavigate} from 'react-router-dom';



function Home() {
    const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Ayuudhara</h1>
        <p>Your one-stop solution for all your needs.</p>
        <img src={blood} alt="Blood Donation" className='blood' width={400} height={380}></img>
        <button className="Next" onClick={()=>navigate("/Second")}>Next</button>
       
       

        
      </header>
      

         
    </div>
  );
}

export default Home;