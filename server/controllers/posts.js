//handlers for routes
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);

    } catch (error) {
        res.status(404).json({ message: error.message });    }
}

export const createPost = async (req, res) => {
    const {company, description, jobTitle, tags, selectedFile} = req.body;

    const newPost = new PostMessage({company, description, jobTitle, tags, selectedFile});

    try {
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}