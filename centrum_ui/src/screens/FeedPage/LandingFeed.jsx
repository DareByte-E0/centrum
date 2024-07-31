import React, { useState, useEffect } from 'react';
import Footer from '../Navigation/Footer';
import Circles from '../Brand/Circles';
import './landingfeed.css'
import Feed from './Feed';
import CollapsibleNavBar from '../Navigation/CollpasibleNabar';


const LandingFeed = () => {
    return (
        <div className='feed-page'>
             <CollapsibleNavBar />
             <div className='brand-circle'>
                 <Circles />
                
             </div>

             <div className='feed'>
                <Feed />
             </div>
             
             
        </div>
     )
}

export default LandingFeed;