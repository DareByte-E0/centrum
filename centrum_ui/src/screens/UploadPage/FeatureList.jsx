import React from 'react';
import './featurelist.css';
import { FaUsers, FaUpload, FaSearch } from 'react-icons/fa';

const FeatureList = () => {
    return (
        <div className="feature-list">
            <div className="feature-item">
                <FaUsers className="feature-icon" />
                <p>Make Resources Accessible to Others</p>
            </div>
            <div className="feature-item">
                <FaUpload className="feature-icon" />
                <p>Upload in seconds</p>
            </div>
            <div className="feature-item">
                <FaSearch className="feature-icon" />
                <p>Easily Manage and Share Your Content</p>
            </div>
        </div>
    );
};

export default FeatureList;
