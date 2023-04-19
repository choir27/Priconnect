const Post = require("../models/Post");
const cloudinary = require("../middleware/cloudinary.js");

module.exports = {
    createPost: async (req,res) => {
        try{
            const result = await cloudinary.uploader.upload(    
                req.file.path, 
                {resource_type: "auto"
            });
            
            const post = await Post.create({
                title: req.body.title,
                post: result.secure_url,
                fileName: req.body.fileName,
                cloudinaryId: result.public_id,
                user: req.body.user,
                comments: [],
                likes: 0
            });

            res.status(200).json({post});

        }catch(err){
            console.error(err);
        }
    },
    editPost: async (req,res) => {
        try{
            let post = await Post.findById({ _id: req.params.id });
            await cloudinary.uploader.destroy(post.cloudinaryId);

            const result = await cloudinary.uploader.upload(    
                req.file.path, 
                {resource_type: "auto"
            });
            
            const updatedPost = await Post.findOneAndUpdate({_id: req.params.id},{
                title: req.body.title,
                post: result.secure_url,
                fileName: req.body.fileName,
                cloudinaryId: result.public_id,
                user: req.body.user,
                comments: post.comments,
                likes: post.likes
            }, 
            {
                new: true,
                runValidators: true,
            });

            res.status(200).json({updatedPost});

        }catch(err){
            console.error(err);
        }
    },
    deletePost: async (req,res) => {
        try{
            let post = await Post.findById({ _id: req.params.id });
            await cloudinary.uploader.destroy(post.cloudinaryId);
            await Post.deleteOne({ _id: req.params.id });

            res.status(200).json({post});
        }catch(err){
            console.error(err);
        }
    }
}