import React, { useState, useEffect } from 'react';
import Footer from '../Navigation/Footer';
import Circles from '../Brand/Circles';
import './landingfeed.css'
import Feed from './Feed';
import CollapsibleNavBar from '../Navigation/CollpasibleNabar';
import SearchFeed from './SearchFeed';
import SearchDialog from './SearchDialog';

const LandingFeed = () => {
    return (
        <div className='feed-page'>
             <CollapsibleNavBar />
             <div className='brand-circle'>
                 <Circles />
                 <SearchFeed />
             </div>

             <div>
                <SearchDialog />
             </div>

             <div className='feed'>
                <Feed />
             </div>
             
             <div className='footer-s'>
              <Footer />
             </div>
        </div>
     )
}

export default LandingFeed;