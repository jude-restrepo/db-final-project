import { useState } from 'react';
import {Link, useLoaderData, useNavigate, useRevalidator} from 'react-router-dom';
import PostCard from '../components/PostCard';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext.jsx';

const ThreadPage = ({ closeThread, addPost, deletePost, updatePost }) => {
    const [newPostContent, setNewPostContent] = useState('');
    const { thread, posts } = useLoaderData();
    const navigate = useNavigate();
    const { revalidate } = useRevalidator();
    const { currentUser } = useAuth();
    const isClosed = thread.closed_on !== null;
    const isCreator = currentUser === thread.username;

    const handleClose = () => {
        if (!window.confirm('Are you sure you want to close this thread?')) return;
        closeThread(thread.thread_id);
        toast.success('Thread closed successfully.');
        navigate(`/communities/${thread.community_name}`);
    };

    const handleCreatePost = async () => {
        await addPost({
            content: newPostContent,
            username: currentUser,
            thread_id: thread.thread_id
        });
        revalidate();
        setNewPostContent('');
    };

    return (
        <div className='max-w-3xl mx-auto px-4 py-8 space-y-6'>

            {/* Thread Header */}
            <div className='bg-parchment-50 rounded-xl shadow-sm border border-parchment-200 p-6'>
                <div className='flex items-start justify-between gap-4'>
                    <div className='min-w-0 flex-1'>
                        <h1 className='text-2xl font-bold text-parchment-900 mb-2 break-all'>{thread.title}</h1>
                        <p className='text-parchment-700 leading-relaxed '>{thread.content}</p>
                        <Link to={`/users/${thread.username}/account-info`} className='text-xs text-parchment-400 mt-3'>
                            Posted by <span className='font-medium text-parchment-600'>{thread.username}</span>
                        </Link>
                    </div>
                    {isClosed
                        ? <span className='shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-parchment-200 text-parchment-600 border border-parchment-300'>
                    Closed
                  </span>
                        : isCreator ? <button
                            onClick={handleClose}
                            className='shrink-0 text-xs font-medium px-4 py-1.5 rounded-full bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors'
                        >
                            Close Thread
                        </button> : null
                    }
                </div>
            </div>

            {/* Create Post */}
            {!isClosed && (
                <div className='bg-parchment-50 rounded-xl shadow-sm border border-parchment-200 p-6'>
                    <h2 className='text-base font-semibold text-parchment-800 mb-1'>Leave a Reply</h2>
                    <p className='text-xs text-parchment-400 mb-4'>Share your thoughts with the community</p>
                    <textarea
                        className='w-full px-4 py-3 border border-parchment-200 rounded-lg text-sm text-parchment-800 placeholder-parchment-400 bg-white focus:outline-none focus:ring-2 focus:ring-parchment-400 focus:border-transparent resize-none leading-relaxed'
                        rows='5'
                        maxLength={500}
                        placeholder='What are your thoughts...'
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <div className='flex items-center justify-between mt-3'>
                <span className='text-xs text-parchment-400'>
                    {newPostContent.length}/500
                </span>
                        <button
                            onClick={handleCreatePost}
                            className='px-5 py-2 bg-parchment-100 text-parchment-700 border border-parchment-300 text-sm font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
                        >
                            Post Reply →
                        </button>
                    </div>
                </div>
            )}

            {/* Posts */}
            <div>
                <h2 className='text-sm font-semibold text-parchment-500 uppercase tracking-wider mb-3'>
                    {posts.length} {posts.length === 1 ? 'Reply' : 'Replies'}
                </h2>
                {posts.length === 0
                    ? <p className='text-sm text-parchment-400 text-center py-8'>No replies yet. Be the first to reply!</p>
                    : <div className='space-y-3'>
                        {posts.map((post) => (
                            <PostCard key={post.post_id} post={post} deletePost={deletePost} updatePost={updatePost}/>
                        ))}
                    </div>
                }
            </div>

        </div>
    );
};

const threadLoader = async ({ params }) => {
    const res = await fetch(`/api/threads/${params.thread_id}/posts`);
    return await res.json();
};

export { ThreadPage as default, threadLoader };