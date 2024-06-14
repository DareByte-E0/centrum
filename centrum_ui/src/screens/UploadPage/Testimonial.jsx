import React from 'react';
import './testimonial.css';

const Testimonials = () => {
    return (
        <div className="testimonials">
            <h3>What Our Users Say</h3>
            <div className="testimonial">
                <p className="quote">
                    "This library management system has made organizing our resources so much easier!"
                </p>
                <p className="author">- John Doe</p>
            </div>
            <div className="testimonial">
                <p className="quote">
                    "The upload process is quick and simple. Highly recommended!"
                </p>
                <p className="author">- Jane Smith</p>
            </div>
        </div>
    );
};

export default Testimonials;
