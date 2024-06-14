import React from 'react';
import './uploadpage.css'
import CollapsibleNavBar from '../Navigation/CollpasibleNabar';
import Circles from '../Brand/Circles';
import Portal from './Portal';
import FeatureList from './FeatureList';
import Footer from '../Navigation/Footer';
import Testimonials from './Testimonial';


const UploadPage = () => {
    return (
       <div className='upload-page'>
            <CollapsibleNavBar />
            <div className='brand-circle'>
                <Circles />
            </div>
            <div className='upload'>
                <div className='upload-item1'>
                    <h2>Upload to professor's shelves</h2>
                    <p>books, journals, videos, audio and more....</p>
                </div>

                <div className='upload-item2'>
                    <Portal />
                </div>
            </div>

            <div className='feature-section'>
                <FeatureList />
            </div>
            <div className='testimonial-section'>
            <Testimonials />
            </div>
            


            
            <div className='footer-s'>
             <Footer />
            </div>
       </div>
    )
}

export default UploadPage;
