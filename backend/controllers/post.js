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
    addReply: async (req, res) => {
        try {
          // Find the comment by ID
          const comment = await Comment.findById(req.params.id);
      
          // Create a new reply object
          const reply = await Reply.create({
            email: req.body.email,
            displayName: req.body.displayName,
            postId: req.params.postId,
            user: req.body.user,
            likes: 0,
            reply: req.body.reply,
          });
      
          // Add the new reply to the comment's replies array
          comment.replies.push(reply);
      
          // Save the updated comment with the new reply
          await comment.save();
      
          // Find the post by ID
          const post = await Post.findById(req.params.postId);
      
          // Update the post's comments array with the updated comment
          post.comments.forEach((commentObj, index) => {
            if (commentObj._id.toString() === req.params.id) {
              post.comments[index] = comment;
            }
          });
      
          // Save the updated post with the updated comment
          await post.save();
      
          res.json({ msg: "Reply added" });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Server error" });
        }
      },      
    addComment: async (req,res)=> {
        try{
            const post= await Post.findById({_id: req.params.id});
            const data = post.comments

            const comment = await Comment.create({
                comment: req.body.comments,
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
    },
    deleteReply: async (req, res) => {
        try {
            await Reply.deleteOne({_id: req.params.reply});
        
            const comment = await Comment.findById(req.params.comment)
        
            const findReply = comment.replies.indexOf(comment.replies.find(ele=>ele._id.toString() === req.params.reply));
        
            const updatedComment = comment.replies;
        
            updatedComment.splice(findReply, 1);
        
            await Comment.findByIdAndUpdate({_id: req.params.comment},{
                replies: updatedComment
            });
        
            const post = await Post.findById(req.params.post)
        
            //returns array with reply comment removed from comment array
            const updatedPostComments = post.comments.map(postComment => {
                if(postComment._id.toString() === req.params.comment){
                    postComment.replies = updatedComment;
                    return postComment;
                }
                return postComment;
            })

            await Post.findByIdAndUpdate(req.params.post, {
                comments: updatedPostComments
            })
        
            res.json({msg: "deleted reply"})
    
        } catch (err) {
          console.error(err);
          res.status(500).json({ msg: "Server error" });
        }
    } 
}