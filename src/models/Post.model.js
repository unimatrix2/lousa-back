import { Schema, model } from 'mongoose';

const postSchema = new Schema({
	owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	content: { type: String, required: true },
}, { timestamps: true });

const Post = model('Post', postSchema);
export default Post;
