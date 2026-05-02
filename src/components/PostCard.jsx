import {toast} from "react-toastify";
import {useRevalidator} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const PostCard = ({ post, deletePost}) => {
    const { revalidate } = useRevalidator();
    const { currentUser } = useAuth();
    const isCreator = currentUser === post.username;
    const date = new Date(post.created_on);
    const dateString = `Created on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

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
                <p className='text-sm font-medium text-parchment-600'>{post.username}</p>
            </div>
            <div className='px-6 py-4'>
                <p className='text-sm text-parchment-700 leading-relaxed mb-4'>{post.content}</p>
                {isCreator && (
                    <div className='flex justify-end'>
                        <button
                            onClick={handleDelete}
                            className='text-xs font-medium px-4 py-1.5 rounded-full bg-transparent text-red-500 border border-red-200 hover:bg-red-50 transition-colors duration-200'
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostCard;