import React, { lazy, Suspense } from 'react';
import './landing.css';
import NewsFeed from './NewsFeed';


const CustomSearch = lazy(() => import('./CustomSearch'));
const LandingPage = () => {
   console.log('re-rendering')
    return (
        <div className='Landing-page'>
           
            <div className='group'>
                <div className='brand'>
                    A student-centric service
                   <div className='circles'>
                    <div className='circle bold-pink'></div>
                    <div className='circle soft-green'></div>
                    <div className='circle calming-blue'></div>
                    <div className='circle warm-orange'></div>
                    <div className='circle rich-purple'></div>
                    <div className='circle blue-green'></div>
                    <div className='circle bright-yellow'></div>
                   </div>
                </div>
                <div className='header'>PROFESSOR</div>
            </div>

            <div className='body-content'>
                <Suspense fallback={<div>Loading...</div>}>
                    <CustomSearch />
                </Suspense>
                <NewsFeed />
                {/* <div className='body-container'>

                
               

                    <div className='v'>
                        <p>Excellence!</p>
                        <img
                            className='v-img'
                            src={`${process.env.PUBLIC_URL}/images/student-1.WebP`}
                            alt="students-reading"
                        />
                    </div>
                    <div className='v'>
                        <p>Connect!</p>
                        <img
                            className='v-img'
                            src={`${process.env.PUBLIC_URL}/images/student-6.WebP`}
                            alt="students-reading"
                        />
                    </div>
                </div>

               
                <div className='body-container'>
                    <div className='v'>
                        <p>Study!</p>
                        <img
                            className='v-img'
                            src={`${process.env.PUBLIC_URL}/images/student-3.WebP`}
                            alt="students-reading"
                        />
                    </div>

                    <div className='v'>
                        <p>Research!</p>
                        <img
                            className='v-img'
                            src={`${process.env.PUBLIC_URL}/images/student-4.WebP`}
                            alt="students-reading"
                        />
                    </div>
                </div>    
                

                <div className='footer-content'>
                    <div className='footer-1'>
                        <p>Professor</p>
                        <video
                    className="footer-video"
                    src={`${process.env.PUBLIC_URL}/animate/prof-gif2.mp4`}
                    alt="students-reading"
                    controls
                ></video>
                    </div>
                    <div className='footer-2'>
                        Our news letter
                    </div>
                </div> */}
            </div>
           
        </div>
    )
}

export default LandingPage;
