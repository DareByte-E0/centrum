const File = require('../models/Files')
const ThumbnailController = require('./ThumbnailController')
const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');



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
        const { search } = req.query;
    
        const query = {};
        if (search) {
        query.originalName = { $regex: search, $options: 'i' };
        }
    
        try {
        const files = await File.find(query);
        res.json({ files });
        } catch (error) {
        res.status(500).json({'error' : 'Internal server error'});
        }
    };



    static async read_file(req, res) {
        try {
            const id = req.params.id;
            const fileDetails = await FileController.getFileDetailsById(id);
            console.log(fileDetails)
    
            if (!fileDetails) {
                return res.status(404).send('File not found');
            }

            const filename = path.basename(fileDetails.path);
            const filePath = path.join(uploadDir, filename);
            console.log(filePath)
    
            if (!fs.existsSync(filePath)) {
                return res.status(404).send('File not found');
            }

            var stream = fs.createReadStream(filePath);
            var originalName = fileDetails.originalName;

            originalName = encodeURIComponent(originalName);

            res.setHeader('Content-disposition', 'inline; filename="' + originalName + '"');
            res.setHeader('Content-type', 'application/pdf');

            stream.pipe(res);
        } catch(error) {
            console.log(error)
        }
    }

    static async getFileDetailsById(id) {
        try {
            const fileDetails = await File.findOne({ _id: new ObjectId(id) });
    
            return fileDetails;
        } catch(error) {
            console.log(error)
        }
    }

}
  

module.exports = FileController;
