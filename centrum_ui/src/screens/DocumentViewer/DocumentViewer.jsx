import React from 'react';
import API_URL from '../../Config';
import Iframe from 'react-iframe';
import './documentview.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import PdfViewer from './PdfViewer';

const DocumentViewer = () => {
    const location = useLocation();
    const [loading, setLoading] = React.useState(true);
    const documentId = location.state?.documentId;
    const documentUrl = `${API_URL}/files/${documentId}`;
    console.log('hola')
    console.log(`it is me and you today ${documentUrl}`)
    console.log(documentId)

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <div className="document-viewer-container">
            <PdfViewer fileUrl={documentUrl} />
        </div>
    );
}

export default DocumentViewer;
