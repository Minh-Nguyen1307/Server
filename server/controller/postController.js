import PostModel from "../model/postModel.js";

export const createPost = async (req, res, next) => {
    try {
        const {content} = req.body;
        
        if (!content) {
            return res.status(400).json({ success: false, message: 'Content is required.' });
        }
        if (!req.user || !req.user._id) {
            return res.status(401).json({ success: false, message: 'Unauthorized: No valid user found.' });
        }
        const newPost = await PostModel.create( {
            userId: req.user._id,
            content,
        });
        res.status(201).json({
            success: true,
            message: 'Post created successfully.',
            post: newPost,
        });
        console.log('Request user:', req.user);

    } catch (error) {
        next(error);
    }
}

export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

       
        if (!content) {
            return res.status(400).json({ success: false, message: 'Content is required.' });
        }

        const post = await PostModel.findById(id);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found.' });
        }

        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized: You can only update your own post.' });
        }

      
        post.content = content;
        await post.save();

        return res.status(200).json({
            success: true,
            message: 'Post updated successfully.',
            post: post,
        });
    } catch (error) {
        next(error);
    }
};