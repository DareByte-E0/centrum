import React from 'react';
import API_URL from '../../Config';
import Iframe from 'react-iframe';
import './documentview.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

const DocumentViewer = () => {
    const location = useLocation();
    const [loading, setLoading] = React.useState(true);
    const documentId = location.state?.documentId;
    const documentUrl = `${API_URL}/files/${documentId}`;
    console.log('hola')
    console.log(documentId)

    const handleLoad = () => {
        setLoading(false);
    };

    return (
        <div className="document-viewer-container">
            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <Iframe
                url={documentUrl}
                className="document-viewer-iframe"
                onLoad={handleLoad}
                style={{ display: loading ? 'none' : 'block' }}
            />
        </div>
    );
}

export default DocumentViewer;
