const File = require('../models/Files');
const ThumbnailController = require('./ThumbnailController');
const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');
const mime = require('mime-types');
const libre = require('libreoffice-convert');
const util = require('util');
const { createClient } = require('@supabase/supabase-js');
const os = require('os');
const { promisify } = require('util');
const crypto = require("crypto");




// Initialize Supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

libre.convertAsync = util.promisify(libre.convert);

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const tempUploadDir = path.join(__dirname, '../tempuploads');
if (!fs.existsSync(tempUploadDir)) {
    fs.mkdirSync(tempUploadDir, { recursive: true });
}

class FileController {

    
    // static async cleanupSupabaseUploads(files) {
    //         await Promise.all(files.map(async (file) => {
    //         if (file.path) {
    //             const path = file.path.split('/').pop(); // Extract filename
    //             await supabase.storage
    //             .from('files')
    //             .remove([`uploads/${path}`]);
    //         }
    //         if (file.pdfPath) {
    //             const path = file.pdfPath.split('/').pop();
    //             await supabase.storage
    //             .from('files')
    //             .remove([`pdfs/${path}`]);
    //         }
    //         }));
    //  }

    // static convertToPdfOnUpload(file, thumbnailPath) {
    //     const inputFile = `${file.path}`;
    //     const outputFile = path.basename(inputFile, path.extname(inputFile)) + '.pdf';
        
    //     const outputFilePath = path.join(tempUploadDir, outputFile)
        
    //     const { exec } = require('child_process');
    //     exec(`libreoffice --headless --convert-to pdf ${inputFile} --outdir ${tempUploadDir} && 
    //         mv ${outputFilePath} ${uploadDir} && 
    //         rm -f ${inputFile}`, (err, stdout, stderr) => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }

    //     // the *entire* stdout and stderr (buffered)
    //     console.log(`stdout: ${stdout}`);
    //     console.log(`stderr: ${stderr}`);
    //     const mainType = file.mimetype.split('/')[0];
    //     return {
    //         path: `${file.path}.pdf`,
    //         originalName: file.originalname,
    //         type: mainType,
    //         thumbnailPath: thumbnailPath || null,
    //     };
    // });
    // }


    

    // static async convertAndUploadToSupabase(file) {
    //     const tempDir = path.join(os.tmpdir(), 'pdf-conversions');
    //     const pdfPath = path.join(tempDir, `${Date.now()}.pdf`);
        
    //     try {
    //         // 1. Ensure temp directory exists
    //         await fs.promises.mkdir(tempDir, { recursive: true });
    
    //         // 2. Convert using libreoffice CLI
    //         const { exec } = require('child_process');
    //         const { promisify } = require('util');
    //         const execPromise = promisify(exec);
            
    //         await execPromise(
    //             `libreoffice --headless --convert-to pdf --outdir "${tempDir}" "${file.path}"`
    //         );
    
    //         // 3. Get converted PDF file path
    //         const convertedPdfPath = file.path.replace(/\.\w+$/, '.pdf');
    
    //         // 4. Upload to Supabase using stream
    //         const pdfStream = fs.createReadStream(convertedPdfPath);
    //         const { error } = await supabase.storage
    //             .from(process.env.SUPABASE_BUCKET)
    //             .upload(`pdfs/${path.basename(convertedPdfPath)}`, pdfStream, {
    //                 contentType: 'application/pdf',
    //                 duplex: 'half'
    //             });
    
    //         if (error) throw error;
    
    //         return `${process.env.SUPABASE_URL}/storage/v1/object/public/files/pdfs/${path.basename(convertedPdfPath)}`;
    //     } catch (error) {
    //         console.error('PDF conversion failed:', error);
    //         throw error;
    //     } finally {
    //         // Clean up original and converted files
    //         await Promise.all([
    //             fs.promises.unlink(file.path).catch(() => {}),
    //             fs.promises.unlink(pdfPath).catch(() => {})
    //         ]);
    //     }
    // }
    


    static async uploadFiles(req, res) {
        let files;
        try {
            files = await Promise.all(req.files.map(async (file, index) => {
                let title, description;
                if (Array.isArray(req.body.title)) {
                    title = req.body.title[index] || '';
                } else {
                    title = req.body.title || '';
                }
    
                if (Array.isArray(req.body.description)) {
                    description = req.body.description[index] || ''; 
                } else {
                    description = req.body.description || '';
                }

                
                let thumbnailPath;
                if (file.mimetype.startsWith('video')) {
                    // thumbnailPath = await ThumbnailController.generateVideoThumbnail(file);
                    console.log('hola')
                } else if (file.mimetype.startsWith('application')) {
                    thumbnailPath = null;
                    if (file.mimetype.startsWith('application')) {
                        thumbnailPath = await ThumbnailController.generateApplicationThumbnail(file);
                        
                        if (thumbnailPath) {
                            // Upload to Supabase
                            const thumbName = `thumb_${crypto.randomUUID()}.jpg`;
                            const fileBuffer = fs.readFileSync(thumbnailPath); // Read file as Buffer
                    
                            const { error } = await supabase.storage
                                .from(process.env.SUPABASE_BUCKET)
                                .upload(thumbName, fileBuffer, {
                                    contentType: 'image/jpeg',
                                    duplex: 'half' // Required for Node.js 18+
                                });
                    
                            if (error) {
                                console.error('Supabase Upload Error:', error);
                            } else {
                                console.log('Upload successful:', thumbName);
                            }
                    
                            // Clean up temp file
                            console.log('Temp thumbnail path:', thumbnailPath);
                            fs.unlinkSync(thumbnailPath);
                    
                            // Construct the public URL correctly
                            thumbnailPath = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/${thumbName}`;
                        }
                    }
                    
                }

                // Upload main file to Supabase
                const fileExt = path.extname(file.originalname);
                const sanitizeFilename = (name) => name.replace(/[^a-zA-Z0-9-_.]/g, '');
                const fileName = `${Date.now()}_${sanitizeFilename(file.originalname)}`;
                
                const { data: fileData, error: uploadError } = await supabase
                .storage
                .from(process.env.SUPABASE_BUCKET)
                .upload(`uploads/${fileName}`, fs.createReadStream(file.path), {
                    contentType: file.mimetype,
                    upsert: false,
                    duplex: "half",
                });

                if (uploadError) throw uploadError;

                fs.unlinkSync(file.path);

                
                const mainType = file.mimetype.split('/')[0];

                return {
                    path: `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/uploads/${fileName}`,
                    originalName: file.originalname,
                    type: mainType,
                    title: title || '',
                    description: description || '',
                    thumbnailPath: thumbnailPath,
                };
            }));
            
            console.log(files);
            const savedFiles = await File.insertMany(files);
            res.status(200).json({ message: "File upload successful", files: savedFiles });
        } catch (error) {
            console.log(error);
            // Delete uploaded Supabase files if DB insert fails
            // await FileController.cleanupSupabaseUploads(files);
            res.status(500).json({ error: error.message });
        }
    }
    

    static async getFiles(req, res) {
        const { search } = req.query;
    
        const query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { originalName: { $regex: search, $options: 'i' } }
            ];
        }
    
        try {
            const files = await File.find(query).sort({ createdAt: -1 });
            res.json({ files });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
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

    static async read_file(req, res) {
        try {
          const id = req.params.id;
          const fileDetails = await FileController.getFileDetailsById(id);
    
          if (!fileDetails) {
            return res.status(404).send('File not found');
          }
    
          // Redirect to Supabase URL (or proxy the file if needed)
          return res.redirect(fileDetails.path);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }


}

module.exports = FileController;
