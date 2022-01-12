import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    company: String, 
    description: String,
    jobTitle: String,
    tags: [String],
    selectedFile: String,
    interactions: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;