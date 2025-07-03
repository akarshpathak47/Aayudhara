import React from 'react';
import './Second.css';
import Video from './VideoComponent.js';
import next from '../../img/next.png';
import { GoArrowRight } from "react-icons/go";
import{useNavigate} from 'react-router-dom';

function Second() {
  const navigate = useNavigate();
  return (
    
    <div className="wrapper">
      <Video/>
    
          <div className="second">
           <h2 classname="quote">EACH DROP OF BLOOD IS LIKE A BREATH FOR SOMEONE,<span>EVERY DROP COUNTS</span> </h2> 
      <div className='quotesecond'>
      <p className='text'>Lets Move Forward To Take A <span>Initiative</span> </p>
      <div className='button'>
           <button className='next'  onClick={()=>navigate("/DonorSearch")}>
              
              <span>Move Forward</span><br/>
              <GoArrowRight className='arrow'/>
           </button>
             </div>
           
      </div>
   
    </div>
    </div>
  );
    

}

export default Second;
