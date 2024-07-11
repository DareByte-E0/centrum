const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const Jimp = require('jimp');
const pdf = require('pdf-thumbnail');
const fs = require('fs')

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
            const thumbnailPath = path.join('uploads/thumbnails', `${path.parse(file.filename).name}-thumbapp.jpg`);
            const pdfBuffer = fs.readFileSync(file.path);
            const options = {
                width: 200,
                height: 200
            };
            await pdf(pdfBuffer, options, thumbnailPath);
            return thumbnailPath;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

}
module.exports = ThumbnailController;
