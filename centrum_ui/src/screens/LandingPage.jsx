import React from 'react';
import './landing.css'
import Footer from './Footer';
import CustomSearch from '../CustomSearch';


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
                <div className='header'>PROFESSOR</div>
            </div>

            

            <div className='body-content'>
            <CustomSearch />
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

                <div className='footer-content'>
                    <div className='footer-1'>
                        from bytes
                    <img className='footer-img'
     src={`${process.env.PUBLIC_URL}/images/student-8.jpg`} 
     alt="students-reading"/>
                    </div>
                    <div className='footer-2'>
                        Our news letter
                        <form action="" method='post'>
                            <input type="text" name="name" id="name" placeholder='name' />
                            <input type="email" name='email' id='email' placeholder='email' />
                            <button>subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            < Footer />

        </div>
    )
}

export default LandingPage;