import React from 'react';
import './landing.css'


const LandingPage = () => {
    return (
        <div className='Landing-page'>
            <div className='group top'>
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
                <div className='header'>Centrum</div>
            </div>

            <div className='body-content'>
                <div className='body-container'>
                    <div className='v1'>
                        Achieve Excellence!
                        <img className='v1-img'
     src={`${process.env.PUBLIC_URL}/images/student-1.jpg`} 
     alt="students-reading"/>
                    </div>
                    <div className='v2'>
                        Connect with the Community!
                        
                    <img className='v2-img'
     src={`${process.env.PUBLIC_URL}/images/student-6.jpg`} 
     alt="students-reading"/>
                    </div>
                </div>

                <div className='body-container'>
                    <div className='v3'>
                        Study from anywhere!
                    <img className='v1-img'
     src={`${process.env.PUBLIC_URL}/images/student-3.jpg`} 
     alt="students-reading"/>
                    </div>

                    <div className='v4'>
                        Reading made-easy!
                    <img className='v2-img'
     src={`${process.env.PUBLIC_URL}/images/student-4.jpg`} 
     alt="students-reading"/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LandingPage;