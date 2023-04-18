const Drawing = require("../models/Post");
const cloudinary = require("../middleware/cloudinary.js");

module.exports = {
    postDrawing: async (req,res) => {
        try{
            const result = await cloudinary.uploader.upload(    
                req.file.path, 
                {resource_type: "auto"
            });
            
            const post = await Drawing.create({
                title: req.body.title,
                post: result.secure_url,
                cloudinaryId: result.public_id,
                user: req.body.user,
                comments: [],
                likes: 0
            });

            res.status(200).json({post});

        }catch(err){
            console.error(err);
        }
    }
}