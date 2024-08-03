import React, { useEffect, useRef, useState } from 'react';
import './documentview.css'
import * as pdfjs from 'pdfjs-dist/build/pdf.min.mjs';
await import('pdfjs-dist/build/pdf.worker.min.mjs');


const PdfViewer = ({ fileUrl }) => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndRenderPdf = async () => {
            try {
                const pdf = await pdfjs.getDocument(fileUrl).promise;
                const numPages = pdf.numPages;
                const pagesArray = [];

                for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                    const page = await pdf.getPage(pageNumber);
                    const viewport = page.getViewport({ scale: 1.5 });
                    
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: context,
                        viewport,
                    };

                    await page.render(renderContext).promise;

                    pagesArray.push(canvas.toDataURL());
                }

                setPages(pagesArray);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching or rendering PDF:', err);
                setError('Error loading PDF');
            }
        };

        fetchAndRenderPdf();
    }, [fileUrl]);

    return (
        <div className='pdfview'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {pages.map((pageDataUrl, index) => (
                <div key={index}>
                    <img className='doc-image' src={pageDataUrl} alt={`Page ${index + 1}`} />
                </div>
            ))}
        </div>
    );
};

export default PdfViewer;
