import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCommunityPage = ({ addCommunitySubmit }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addCommunitySubmit({ community_name: name, description: desc });
        toast.success('Community added successfully.');
        navigate('/');
    };

    return (
        <section className='min-h-screen bg-parchment-100 flex items-center justify-center px-4'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-parchment-900 mb-2'>Bookish</h1>
                    <p className='text-sm text-parchment-500'>Build a new reading community</p>
                </div>
                <div className='bg-parchment-50 border border-parchment-200 rounded-xl shadow-sm p-8'>
                    <form onSubmit={handleSubmit}>
                        <h2 className='text-xl font-semibold text-parchment-900 mb-6'>Add Community</h2>
                        <div className='mb-4'>
                            <label htmlFor='name' className='block text-xs font-medium text-parchment-600 uppercase tracking-wider mb-1.5'>
                                Community Name
                            </label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                className='w-full px-4 py-2.5 border border-parchment-200 rounded-lg text-sm text-parchment-800 placeholder-parchment-300 bg-white focus:outline-none focus:ring-2 focus:ring-parchment-400 focus:border-transparent'
                                placeholder='Give your community a name...'
                                maxLength={30}
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='mb-6'>
                            <label htmlFor='description' className='block text-xs font-medium text-parchment-600 uppercase tracking-wider mb-1.5'>
                                Description
                            </label>
                            <textarea
                                id='description'
                                name='description'
                                className='w-full px-4 py-3 border border-parchment-200 rounded-lg text-sm text-parchment-800 placeholder-parchment-300 bg-white focus:outline-none focus:ring-2 focus:ring-parchment-400 focus:border-transparent resize-none leading-relaxed'
                                rows='4'
                                maxLength={500}
                                placeholder='What is this community about...'
                                required
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                            <p className='text-xs text-parchment-400 mt-1 text-right'>{desc.length}/500</p>
                        </div>
                        <button
                            className='w-full py-2.5 bg-parchment-100 text-parchment-700 border border-parchment-300 text-sm font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
                            type='submit'
                        >
                            Add Community
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddCommunityPage;