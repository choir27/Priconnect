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
                description: req.body.description,
                fileName: req.body.fileName,
                cloudinaryId: result.public_id,
                user: req.body.user,
                displayName: req.body.displayName,
                comments: [],
                likes: 0
            });

            res.status(200).json({post});

        }catch(err){
            console.error(err);
        }
    },
    addLike: async (req, res) => {
        await Post.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $inc: {likes: 1},
            }
        )
        res.json({msg: "Added one like"})
    },
    editPost: async (req,res) => {
        try{            
            if(req.body.file){
                const updatedPost = await Post.findOneAndUpdate({_id: req.params.id},{
                    title: req.body.title,
                    post: req.body.file,
                    description: req.body.description,
                    fileName: req.body.fileName,
                    cloudinaryId: req.body.cloudinaryId,
                    user: req.body.user,
                    displayName: req.body.displayName,
                    comments: req.body.comments,
                    likes: req.body.likes
                }, 
                {
                    new: true,
                    runValidators: true,
                });
    
                res.status(200).json({updatedPost});
            }else{
                let post = await Post.findById({ _id: req.params.id });
                await cloudinary.uploader.destroy(post.cloudinaryId);
    
                   
                const result = await cloudinary.uploader.upload(    
                    req.file.path, 
                    {resource_type: "auto"
                });

            const updatedPost = await Post.findOneAndUpdate({_id: req.params.id},{
                title: req.body.title,
                post: result.secure_url,
                description: req.body.description,
                fileName: req.body.fileName,
                cloudinaryId: result.public_id,
                user: req.body.user,
                displayName: req.body.displayName,
                comments: [],
                likes: 0
            }, 
            {
                new: true,
                runValidators: true,
            });

            res.status(200).json({updatedPost});

            
            }


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
    },
    addComment: async (req,res)=> {
        try{
            const post= await Post.findById({_id: req.params.id});
            const data = post.comments

            data.push(req.body.comments);            

            await Post.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    title: post.title,
                    post: post.post,
                    description: post.description,
                    fileName: post.fileName,
                    cloudinaryId: post.cloudinaryId,
                    user: post.user,
                    displayName: post.displayName,
                    comments: data,
                    likes: post.likes
                }
            )

            res.json({msg: "Added comment"})
        }catch(err){
            console.error(err);
        }
    }
}