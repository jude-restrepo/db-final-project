import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import Spinner from '../components/Spinner';


const UserPage = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [threads, setThreads] = useState([]);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/users/${username}/account-info`);
                const data = await res.json();
                if (data.status !== 'success') {
                    throw new Error();
                }
                setUser(data.user);
                setThreads(data.threads);
                setPosts(data.posts);
            } catch (e) {
                setError(`Failed to load account info: ${e}`);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

    }, [username]);

    const formatDate = (str) =>
        new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    if (error) return <p className="text-red-500 p-4">{error}</p>;

    return (
        <div className='max-w-3xl mx-auto px-4 py-8'>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <>
                    {/* Profile header */}
                    <div className='flex items-center gap-4 bg-parchment-50 border border-parchment-200 rounded-xl p-5 mb-6 shadow-sm'>
                        <div className='w-12 h-12 rounded-full bg-parchment-200 text-parchment-700 flex items-center justify-center font-semibold text-lg'>
                            {user.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <p className='text-lg font-semibold text-parchment-900'>{user.username}</p>
                            <p className='text-sm text-parchment-400'>Member since {formatDate(user.created_on)}</p>
                            <p className='text-sm text-parchment-400'>Role: {user.role.toUpperCase()}</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className='grid grid-cols-2 gap-3 mb-8'>
                        <div className='bg-parchment-100 rounded-lg p-4'>
                            <p className='text-xs text-parchment-500 uppercase tracking-wide mb-1'>Threads started</p>
                            <p className='text-2xl font-semibold text-parchment-900'>{threads.length}</p>
                        </div>
                        <div className='bg-parchment-100 rounded-lg p-4'>
                            <p className='text-xs text-parchment-500 uppercase tracking-wide mb-1'>Posts made</p>
                            <p className='text-2xl font-semibold text-parchment-900'>{posts.length}</p>
                        </div>
                    </div>

                    {/* Threads */}
                    <p className='text-xs font-medium text-parchment-500 uppercase tracking-wider mb-3'>Threads</p>
                    {threads.length === 0 ? (
                        <p className='text-parchment-400 text-sm mb-6'>No threads yet.</p>
                    ) : (
                        threads.map(t => (
                            <div key={t.thread_id} className='bg-parchment-50 border border-parchment-200 rounded-xl p-4 mb-3 shadow-sm'>

                                <div>
                                    <span className='text-xs bg-parchment-100 text-parchment-600 border border-parchment-200 px-2.5 py-0.5 rounded-full mb-2 inline-block'>
                                        {t.community_name}
                                    </span>
                                </div>
                                <Link
                                    to={`/threads/${t.thread_id}`}
                                    className='text-base font-medium text-parchment-900 hover:text-parchment-600 transition-colors leading-snug'
                                >
                                    {t.title}
                                </Link>
                                <p className='text-xs text-parchment-400 mb-2'>{formatDate(t.created_on)}</p>
                                <p className='text-sm text-parchment-600 leading-relaxed'>{t.content}</p>
                            </div>
                        ))
                    )}

                    <hr className='my-6 border-parchment-200' />

                    {/* Posts */}
                    <p className='text-xs font-medium text-parchment-500 uppercase tracking-wider mb-3'>Posts</p>
                    {posts.length === 0 ? (
                        <p className='text-parchment-400 text-sm'>No posts yet.</p>
                    ) : (
                        posts.map(p => (
                            <div key={p.post_id} className='bg-parchment-100 rounded-lg p-4 mb-3'>
                                <p className='text-xs text-parchment-400 mb-1'>{formatDate(p.created_on)}</p>
                                <p className='text-sm text-parchment-700 leading-relaxed'>{p.content}</p>
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    )
}

export default UserPage;