const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const Jimp = require('jimp');
const { exec } = require('child_process');
const fs = require('fs').promises;
const libre = require('libreoffice-convert');



libre.convertAsync = require('util').promisify(libre.convert);
class ThumbnailController {
    static generateVideoThumbnail(file) {
        return new Promise((resolve, reject) => {
            const thumbnailPath = path.join('uploads/thumbnails', `${file.filename}-thumbnail.png`);
            ffmpeg(file.path)
            .screenshots({
                count: 1,
                folder: 'uploads/thumbnails',
                filename: `${file.filename}-thumbnail.png`,
                size: '320x240',
            })
            .on('end', () => resolve(thumbnailPath))
            .on('error', (err) => reject(err));
        });
    }



    static async generateImageThumbnail(file) {
        try {
            const thumbnailPath = path.join('uploads/thumbnails', `${path.parse(file.filename).name}-thumb.jpg`);
            const image = await Jimp.read(file.path);
            await image
                .resize(256, Jimp.AUTO)
                .quality(60)
                .writeAsync(thumbnailPath);
            return thumbnailPath;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static async generateApplicationThumbnail(file) {
        try {
            const thumbnailPath = path.join('uploads/thumbnails', `${path.parse(file.filename).name}-thumb.jpg`);
            
            const thumbnailsDir = path.join('uploads', 'thumbnails');

            if (!await fs.access(thumbnailsDir).catch(() => false)) {
                await fs.mkdir(thumbnailsDir, { recursive: true });
            }

            
            if (file.mimetype === 'application/pdf') {
                await ThumbnailController.generatePDFThumbnail(file.path, thumbnailPath);
            } else if (
                file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || 
                file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                await ThumbnailController.convertToPdf(file.path, thumbnailPath);
            } else {
                throw new Error('Unsupported file type for thumbnail generation');
            }

            
            return thumbnailPath;
        } catch (err) {
            console.error('Error generating application thumbnail:', err);
            return null;
        }
    }


    static generatePDFThumbnail(inputPath, outputPath) {
        return new Promise((resolve, reject) => {
            const command = `convert -thumbnail x256 "${inputPath}[0]" "${outputPath}"`;
            exec(command, (error) => {
                if (error) {
                    return reject(error);
                }
                resolve(outputPath);
            });
        });
    }

    static async convertToPdf(inputPath, outputPath) {
        try {
            const docxBuf = await fs.readFile(inputPath);
            const ext = '.pdf';
           
            const pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

            const tempPdfPath = path.join('uploads/thumbnails', `${path.parse(inputPath).name}.pdf`);
            await fs.writeFile(tempPdfPath, pdfBuf);

            // Generate thumbnail from the newly created PDF
            await ThumbnailController.generatePDFThumbnail(tempPdfPath, outputPath);

            // Cleanup the temporary PDF file
            console.log(`deleting generated pdf`)
            await fs.unlink(tempPdfPath);
        } catch (error) {
            console.error('Error converting DOCX to PDF:', error);
            throw error;
        }
    }

}
module.exports = ThumbnailController;
