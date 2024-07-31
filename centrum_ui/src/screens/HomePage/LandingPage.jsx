import React from 'react';
import './landing.css';
import Footer from '../Navigation/Footer';
import CustomSearch from './CustomSearch';
import CollapsibleNavBar from '../Navigation/CollpasibleNabar';
import ChatButton from '../GptChatInterface/ChatButton';
import ChatDialog from '../GptChatInterface/ChatDialog';

const LandingPage = () => {

    const [isChatOpen, setIsChatOpen] = React.useState(false);

    const handleChatClick = () => {
        setIsChatOpen(true);
    };

    const handleCloseChat = () => {
        setIsChatOpen(false);
    };


    return (
        <div className='Landing-page'>
            <CollapsibleNavBar />
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
                <CustomSearch />
                <div className=''>

                
               

                    <div className='v'>
                        <p>Achieve Excellence!</p>
                        <img
                            className='v-img'
                            src={`${process.env.PUBLIC_URL}/images/student-1.jpg`}
                            alt="students-reading"
                        />
                    </div>
                    <div className='v'>
                        <p>Connect!</p>
                        <img
                            className='v-img'
                            src={`${process.env.PUBLIC_URL}/images/student-6.jpg`}
                            alt="students-reading"
                        />
                    </div>
                </div>

               
                    <div className='v'>
                        <p>Study from anywhere!</p>
                        <img
                            className='v-img'
                            src={`${process.env.PUBLIC_URL}/images/student-3.jpg`}
                            alt="students-reading"
                        />
                    </div>

                    <div className='v'>
                        <p>Reading made-easy!</p>
                        <img
                            className='v-img'
                            src={`${process.env.PUBLIC_URL}/images/student-4.jpg`}
                            alt="students-reading"
                        />
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
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage;
