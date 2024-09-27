const Comment = require('../models/Comment');
const File = require('../models/Files');

class CommentController {
    static async submitComment(req, res) {
        const { text, fileId } = req.body;

        // Basic validation
        if (!text || !fileId) {
            return res.status(400).json({ message: "Text and fileId are required." });
        }

        try {
            // Check if the file exists
            const fileExists = await File.findById(fileId);
            if (!fileExists) {
                return res.status(404).json({ message: "File not found." });
            }

            // Create a new comment
            const newComment = new Comment({
                fileId,
                text,
            });

            await newComment.save();

            return res.status(201).json({ message: "Comment submitted successfully.", comment: newComment });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "An error occurred while submitting the comment." });
        }
    }


    static async getComments(req, res) {
        const { fileId } = req.params;

        try {

             // Check if the file exists
             const fileExists = await File.findById(fileId);
             if (!fileExists) {
                 return res.status(404).json({ message: "File not found." });
             }


            // Fetch comments for the specific file
            const comments = await Comment.find({ fileId });

            return res.status(200).json({ comments, total: comments.length });
        } catch (error) {
            console.error("Error fetching comments:", error);
            return res.status(500).json({ message: "An error occurred while fetching comments." });
        }
    }
}

module.exports = CommentController;
