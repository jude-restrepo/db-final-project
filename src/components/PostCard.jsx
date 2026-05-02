import {toast} from "react-toastify";
import {Link, useRevalidator} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import {useState} from "react";

const PostCard = ({ post, deletePost, updatePost}) => {
    const { revalidate } = useRevalidator();
    const { currentUser } = useAuth();
    const [updatePostContent, setUpdatePostContent] = useState(null);
    const isCreator = currentUser === post.username;
    const date = new Date(post.created_on);
    const dateString = `Created on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

    const beginUpdate = () => {
        setUpdatePostContent(post.content);
        revalidate()
    }

    const cancelUpdate = () => {
        setUpdatePostContent(null);
        revalidate()
    }

    const submitUpdate = async () => {
        post = {
            post_id: post.post_id,
            content: updatePostContent
        }
        await updatePost(post);
        setUpdatePostContent(null);
        revalidate();
    }

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        await deletePost(post.post_id);
        toast.success('Post deleted successfully.');
        revalidate();
    };

    return (
        <div className='bg-parchment-50 border border-parchment-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200'>
            <div className='px-6 py-4 border-b border-parchment-100'>
                <p className='text-xs text-parchment-400'>{dateString}</p>
                <Link to={`/users/${post.username}/account-info`} className='text-sm font-medium text-parchment-600'>{post.username}</Link>
            </div>
            {updatePostContent === null ? <div className='px-6 py-4'>
                <p className='text-sm text-parchment-700 leading-relaxed mb-4'>{post.content}</p>
                {isCreator && (
                    <div className='flex justify-end gap-2'>
                        <button
                            onClick={beginUpdate}
                            className='px-4 py-1.5 bg-parchment-100 text-parchment-700 border border-parchment-300 text-xs font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className='text-xs font-medium px-4 py-1.5 rounded-full bg-transparent text-red-500 border border-red-200 hover:bg-red-50 transition-colors duration-200'
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div> : <div className='px-6 py-4'>
                <textarea
                id="updatePostContent"
                className='w-full px-4 py-3 border border-parchment-200 rounded-lg text-sm text-parchment-800 placeholder-parchment-300 bg-white focus:outline-none focus:ring-2 focus:ring-parchment-400 focus:border-transparent resize-none leading-relaxed'
                rows='5'
                maxLength={500}
                required
                value={updatePostContent}
                onChange={(e) => setUpdatePostContent(e.target.value)}
                />
                <div className='flex justify-start gap-2'>
                    <button
                        onClick={cancelUpdate}
                        className='px-4 py-1.5 bg-parchment-100 text-parchment-700 border border-parchment-300 text-xs font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={submitUpdate}
                        className='px-4 py-1.5 bg-parchment-100 text-parchment-700 border border-parchment-300 text-xs font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
                    >
                        Edit
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default PostCard;