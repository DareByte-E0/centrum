const Like = require('../models/Like');
const File = require('../models/Files');

class LikeController {
    static async submitLike(req, res) {
        const { fileId } = req.body;

        // Basic validation
        if (!fileId) {
            return res.status(400).json({ message: "fileId is required." });
        }

        try {
            // Check if the file exists
            const fileExists = await File.findById(fileId);
            if (!fileExists) {
                return res.status(404).json({ message: "File not found." });
            }

            // Create a new Like
            const newLike = new Like({
                fileId,
            });

            await newLike.save();

            return res.status(201).json({ message: "Like submitted successfully.", like: newLike });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "An error occurred while submitting the Like." });
        }
    }




    static async getLikes(req, res) {
        const { fileId } = req.params;

        try {

             // Check if the file exists
             const fileExists = await File.findById(fileId);
             if (!fileExists) {
                 return res.status(404).json({ message: "File not found." });
             }


            // Fetch likes for the specific file
            const likes = await Like.find({ fileId });

            return res.status(200).json({ likes, total: likes.length });
        } catch (error) {
            console.error("Error fetching liks:", error);
            return res.status(500).json({ message: "An error occurred while fetching likes." });
        }
    }
}

module.exports = LikeController;