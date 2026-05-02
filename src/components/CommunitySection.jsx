import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'
import CommunityCard from './CommunityCard';
import Spinner from './Spinner';
import CommunityFilter from "./CommunityFilter.jsx";

const CommunitySection = () => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('');
    const [majorityGenres, setMajorityGenres] = useState([]);
    const {role} = useAuth();
    useEffect(() => {
        const fetchCommunities = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/communities/${activeFilter}`);
                const data = await res.json();
                setCommunities(data.communities);
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommunities();
    }, [activeFilter]);

    useEffect(() => {
        const fetchHighestGenres = async () => {
            try {
                const res = await fetch('/api/communities/majority-genre');
                const data = await res.json();
                setMajorityGenres(data.communities);
            } catch (error) {
                console.log('Error fetching data', error);
            }
        }

        fetchHighestGenres();
    }, []);

    return (
        <div className='max-w-7xl mx-auto px-6 py-8'>
            <div className='mb-8'>
                <h1 className='text-3xl font-bold text-parchment-900 mb-1'>Communities</h1>
                <p className='text-sm text-parchment-500'>Browse and join communities of fellow readers</p>
            </div>
            <div className='flex items-center justify-between mb-6'>
                <CommunityFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                {role === 'admin' ? <Link
                    to='/add-community'
                    className='px-4 py-1.5 bg-parchment-100 text-parchment-700 border border-parchment-300 text-sm font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
                >
                    + New Community
                </Link> : null}
            </div>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <>
                    {communities.length === 0 ? (
                        <p className='text-parchment-400 text-sm'>No communities found.</p>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {communities.map((community) => (
                                <CommunityCard
                                    key={community.community_name}
                                    community={community}
                                    majorityGenres={majorityGenres}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CommunitySection;