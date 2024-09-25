import React, { lazy, Suspense } from 'react';
import API_URL from '../../Config';
import './documentview.css'
import { useLocation } from 'react-router-dom';

const PdfViewer = lazy(() => import('./PdfViewer'))
const DocumentViewer = () => {
    const location = useLocation();
    const documentId = location.state?.documentId;
    const documentUrl = `${API_URL}/files/${documentId}`;


    return (
        <div className="document-viewer-container">
            <Suspense fallback={<div>Loading...</div>}>
                <PdfViewer fileUrl={documentUrl} />
            </Suspense>
        </div>
    );
}

export default DocumentViewer;
