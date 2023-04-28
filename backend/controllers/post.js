const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Reply = require("../models/Reply");
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
                comments: req.params.comments,
                likes: req.params.likes
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
    addReplies: async (req,res)=>{
        try{
            const comment = await Comment.findById({_id: req.params.id});
            
            const array = comment.replies;

            const reply = await Reply.create({
                email : req.body.email, 
                displayName: req.body.displayName, 
                postId: req.params.postId,
                user: req.body.user,
                likes: 0, 
                replies: array
            });

            array.push(reply);

            const updatedComment = await Comment.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    replies: array
                }
            );

            const post = await Post.findById({_id: req.params.postId});

            const postComment = post.comments;

            const findComment = postComment.find(ele=>ele._id.toString() === req.params.id);

            findComment.replies.push(req.body.reply);

            console.log(postComment)

            console.log(post.comments)

            Post.findOneAndUpdate(
                {_id: req.params.postId},
                {comments: postComment}
                )
         
            res.json({msg: "Reply added"})

        }catch(err){
            console.error(err);
        }
    },
    addComment: async (req,res)=> {
        try{
            const post= await Post.findById({_id: req.params.id});
            const data = post.comments

            const comment = await Comment.create({
                comments: req.body.comments,
                email : req.body.email, 
                displayName: req.body.displayName, 
                postId: req.params.id,
                user: req.body.user,
                likes: 0, 
                replies: []
            })

            data.push(comment);    

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
    },
    deleteComment: async (req,res)=> {
        try{
            const post = await Post.findById({_id: req.params.postId});
            
            const findPost = post.comments.find(comment=>comment._id.toString() === req.params.id);

            const currentPost = post.comments

            currentPost.splice(post.comments.indexOf(findPost),1);

            await Post.updateOne({_id: req.params.postId},
                {comments: currentPost}
            );

            await Comment.deleteOne({ _id: req.params.id });

            res.json({msg: "Added comment"});

        }catch(err){
            console.error(err);
        }
    }
}