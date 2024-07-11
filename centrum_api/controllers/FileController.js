const File = require('../models/Files')
const ThumbnailController = require('./ThumbnailController')
const path = require('path');
const fs = require('fs');



const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

class FileController {
    static async uploadFlies(req, res) {
      try {
          const files = await Promise.all(req.files.map(async (file) => {
            let thumbnailPath;

            if (file.mimetype.startsWith('video')) {
                thumbnailPath = await ThumbnailController.generateVideoThumbnail(file);
            } else if (file.mimetype.startsWith('image')) {
                thumbnailPath = await ThumbnailController.generateImageThumbnail(file);
            } else if (file.mimetype.startsWith('application')) {
                console.log('yo')
                thumbnailPath = await ThumbnailController.generateApplicationThumbnail(file);
            }

            const mainType = file.mimetype.split('/')[0];

            return {
                path: file.path,
                originalName: file.originalname,
                type: mainType,
                thumbnailPath: thumbnailPath || null,
            };
	    }));

        console.log(files);
	    const savedFiles = await File.insertMany(files);

	    res.status(200).json({ message: "File upload successfull" });
      } catch (error) {
        console.log(error)
          res.status(500).json({ error: error.message });
      }
    }




    static async getFiles(req, res) {
        try {
            const files = await File.find().lean();
            res.status(200).json({files});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = FileController;
