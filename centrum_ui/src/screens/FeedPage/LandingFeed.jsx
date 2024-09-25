import React, { lazy, Suspense } from 'react';
import Circles from '../Brand/Circles';
import './landingfeed.css'

const Feed = lazy(() => import('./Feed'));

const LandingFeed = () => {
    return (
        <div className='feed-page'>
            
             <div className='brand-circle'>
                 <Circles />
                
             </div>

             <div className='feed'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Feed />
                </Suspense>
             </div>
             
             
        </div>
     )
}

export default LandingFeed;