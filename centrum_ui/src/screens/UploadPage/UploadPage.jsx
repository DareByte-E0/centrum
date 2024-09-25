import React, { lazy, Suspense } from 'react';
import './uploadpage.css'
import Circles from '../Brand/Circles';

const Portal = lazy(() => import('./Portal'));
const FeatureList = lazy(() => import('./FeatureList'));
const Testimonials = lazy(() => import('./Testimonial'));

const UploadPage = () => {
    return (
       <div className='upload-page'>
           
            <div className='brand-circle'>
                <Circles />
            </div>
            <div className='upload'>
                <div className='upload-item1'>
                    <h2>Upload to professor's shelves</h2>
                    <p>books, journals, videos, audio and more....</p>
                </div>

                <div className='upload-item2'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Portal />
                    </Suspense>
                </div>
            </div>

            <div className='feature-section'>
                <Suspense fallback={<div>Loading...</div>}>
                    <FeatureList />
                </Suspense>
            </div>
            <div className='testimonial-section'>
                <Suspense fallback={<div>Loading....</div>}>
                    <Testimonials />
                </Suspense>
            </div>
            


            
            <div className='footer-s'>
            
            </div>
       </div>
    )
}

export default UploadPage;
