const File = require('../models/Files');
const ThumbnailController = require('./ThumbnailController');
const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');
const mime = require('mime-types');
const libre = require('libreoffice-convert');
const util = require('util');

libre.convertAsync = util.promisify(libre.convert);

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

class FileController {
    static async uploadFiles(req, res) {
        try {
            const files = await Promise.all(req.files.map(async (file) => {
                let thumbnailPath;
                let pdfPath;

                
                if (file.mimetype.startsWith('video')) {
                    thumbnailPath = await ThumbnailController.generateVideoThumbnail(file);
                } else if (file.mimetype.startsWith('image')) {
                    thumbnailPath = await ThumbnailController.generateImageThumbnail(file);
                } else if (file.mimetype.startsWith('application')) {
                    console.log(`generating thumbnail....`)
                    thumbnailPath = await ThumbnailController.generateApplicationThumbnail(file);
                }

                const mainType = file.mimetype.split('/')[0];

                
                if (!file.mimetype.startsWith('application/pdf')) {
                    const fileNameWithoutExt = path.basename(file.originalname, path.extname(file.originalname));
                    const pdfFileName = `${fileNameWithoutExt}.pdf`;
                    const pdfFilePath = path.join(uploadDir, pdfFileName);

                    await libre.convertAsync(fs.readFileSync(file.path), 'pdf', undefined, (err, done) => {
                        console.log(`converting file to pdf.....`)
                        if (err) {
                            throw err;
                        }
                        fs.writeFileSync(pdfFilePath, done);
                    });

                    pdfPath = pdfFilePath;
                } else {
                    pdfPath = file.path;
                }

                return {
                    path: pdfPath,
                    originalName: file.originalname,
                    type: mainType,
                    thumbnailPath: thumbnailPath || null,
                };
            }));

            console.log(files);
            const savedFiles = await File.insertMany(files);

            res.status(200).json({ message: "File upload successful" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    static async getFiles(req, res) {
        const { search } = req.query;

        const query = {};
        if (search) {
            query.originalName = { $regex: search, $options: 'i' };
        }

        try {
            const files = await File.find(query);
            res.json({ files });
        } catch (error) {
            res.status(500).json({ 'error': 'Internal server error' });
        }
    }

    static async read_file(req, res) {
        try {
            const id = req.params.id;
            const fileDetails = await FileController.getFileDetailsById(id);
            console.log(fileDetails);

            if (!fileDetails) {
                return res.status(404).send('File not found');
            }

            const filename = path.basename(fileDetails.path);
            const filePath = path.join(uploadDir, filename);
            console.log(filePath);

            if (!fs.existsSync(filePath)) {
                return res.status(404).send('File not found');
            }

            const stream = fs.createReadStream(filePath);
            let originalName = fileDetails.originalName;
            originalName = encodeURIComponent(originalName);

            const extension = path.extname(originalName);
            console.log(`File extension: ${extension}`);

            let mimeType = mime.lookup(extension);
            console.log(`MIME type: ${mimeType}`);

            if (!mimeType) {
                console.log(`Could not determine MIME type for file: ${filePath}`);
                mimeType = 'application/octet-stream';
            }

            res.setHeader('Content-disposition', 'inline; filename="' + originalName + '"');
            res.setHeader('Content-type', mimeType);

            stream.pipe(res);
        } catch (error) {
            console.log(error);
            res.status(500).json({ 'error': 'Internal server error' });
        }
    }

    static async getFileDetailsById(id) {
        try {
            const fileDetails = await File.findOne({ _id: new ObjectId(id) });
            return fileDetails;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = FileController;
