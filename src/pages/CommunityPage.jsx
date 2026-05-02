import {Link, useLoaderData, useNavigate, useRevalidator} from 'react-router-dom';
import ThreadCard from '../components/ThreadCard';
import BookSelect from "../components/BookSelect.jsx";
import {toast} from 'react-toastify';
import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const CommunityPage = ({ deleteCommunity, addThread }) => {
    const [newThreadTitle, setNewThreadTitle] = useState('');
    const [newThreadContent, setNewThreadContent] = useState('');
    const [closedThreadToggle, setClosedThreadToggle] = useState(false);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const navigate = useNavigate();
    const {revalidate} = useRevalidator();
    const {currentUser, role} = useAuth();
    const {community, threads} = useLoaderData();

    const handleDelete = () => {
        if (!window.confirm('Are you sure you want to delete this community?')) return;
        deleteCommunity(community.community_name);
        toast.success('Community deleted successfully.');
        navigate('/');
    };

    const createThread = async () => {
        await addThread({
            title: newThreadTitle,
            content: newThreadContent,
            username: currentUser,
            community_name: community.community_name,
            books: selectedBooks.map(b => b.book_id)
        });
        revalidate();
        setNewThreadTitle('');
        setNewThreadContent('');
        setSelectedBooks([]);
    }

    return (
        <>
            {/* Create Thread Form */}
            <div className='my-6'>
                <div className='bg-parchment-50 rounded-xl shadow-sm border border-parchment-200 p-6 mb-3'>
                    <h2 className='text-base font-semibold text-parchment-800 mb-1'>Start a New Thread</h2>
                    <p className='text-xs text-parchment-400 mb-5'>Share something worth discussing with the community</p>

                    <div className='mb-4'>
                        <label
                            htmlFor="threadTitle"
                            className='block text-xs font-medium text-parchment-600 uppercase tracking-wider mb-1.5'
                        >
                            Title
                        </label>
                        <input
                            id="threadTitle"
                            type="text"
                            className='w-full px-4 py-2.5 border border-parchment-200 rounded-lg text-sm text-parchment-800 placeholder-parchment-300 bg-white focus:outline-none focus:ring-2 focus:ring-parchment-400 focus:border-transparent'
                            required
                            maxLength={100}
                            placeholder='Give your thread a title...'
                            value={newThreadTitle}
                            onChange={(e) => setNewThreadTitle(e.target.value)}
                        />
                    </div>

                    <div className='mb-4'>
                        <label
                            htmlFor="threadContent"
                            className='block text-xs font-medium text-parchment-600 uppercase tracking-wider mb-1.5'
                        >
                            Content
                        </label>
                        <textarea
                            id="threadContent"
                            className='w-full px-4 py-3 border border-parchment-200 rounded-lg text-sm text-parchment-800 placeholder-parchment-300 bg-white focus:outline-none focus:ring-2 focus:ring-parchment-400 focus:border-transparent resize-none leading-relaxed'
                            rows='5'
                            maxLength={500}
                            placeholder='What would you like to discuss...'
                            required
                            value={newThreadContent}
                            onChange={(e) => setNewThreadContent(e.target.value)}
                        />
                        <p className='text-xs text-parchment-400 mt-1 text-right'>{newThreadContent.length}/500</p>
                    </div>

                    <div className='mb-5'>
                        <label className='block text-xs font-medium text-parchment-600 uppercase tracking-wider mb-1.5'>
                            Related Books
                        </label>
                        <BookSelect selected={selectedBooks} onChange={setSelectedBooks} />
                    </div>

                    <div className='flex items-center justify-between'>
                        <div
                            id="errorDisplay"
                            className="hidden px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg"
                        />
                        <button
                            id="createThreadButton"
                            className='ml-auto px-5 py-2 bg-parchment-100 text-parchment-700 border border-parchment-300 text-sm font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
                            onClick={createThread}
                        >
                            Post Thread →
                        </button>
                    </div>
                </div>
            </div>

            {/* Community Info */}
            {role === 'admin' ? <div className='bg-parchment-50 rounded-xl shadow-sm border border-parchment-200 p-6 mt-2 mb-6'>
                <p className='text-xs font-medium text-parchment-500 uppercase tracking-wider mb-1'>Community</p>
                <h2 className='text-lg font-semibold text-parchment-900 mb-2'>{community.community_name}</h2>
                <p className='text-sm text-parchment-600 leading-relaxed mb-5'>{community.community_description}</p>
                <div className='flex flex-col gap-2'>
                    <Link
                        to={`/edit-community/${community.community_name}`}
                        className='text-sm font-medium px-4 py-1.5 bg-parchment-100 text-parchment-700 border border-parchment-300 text-sm font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200 text-center'
                    >
                        Edit Community
                    </Link>
                    <button
                        onClick={handleDelete}
                        className='text-sm font-medium px-4 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors duration-200 text-center'
                    >
                        Delete Community
                    </button>
                </div>
            </div> : null}

            {/* Threads */}
            <div>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold text-parchment-900'>Threads</h2>
                    <label className='flex items-center gap-2 cursor-pointer'>
                        <span className='text-xs text-parchment-500'>Show closed</span>
                        <div className="relative">
                            <input
                                onChange={() => setClosedThreadToggle(!closedThreadToggle)}
                                id="switch-component"
                                type="checkbox"
                                className="peer appearance-none w-11 h-5 bg-parchment-200 rounded-full checked:bg-parchment-700 cursor-pointer transition-colors duration-300"
                            />
                            <label
                                htmlFor="switch-component"
                                className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-parchment-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-parchment-700 cursor-pointer"
                            />
                        </div>
                    </label>
                </div>

                <div className='space-y-3'>
                    {(closedThreadToggle
                            ? threads
                            : threads.filter(thread => thread.closed_on === null)
                    ).map(thread => (
                        <ThreadCard key={thread.thread_id} thread={thread} />
                    ))}
                </div>
            </div>
        </>
    );
};

// Data loader
const communityLoader = async ({params}) => {
    const res = await fetch(`/api/communities/${params.community_name}/threads`);
    return await res.json();
};


export {CommunityPage as default, communityLoader};