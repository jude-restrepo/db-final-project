import { Link } from 'react-router-dom';
import { useState } from 'react';

const TRUNCATE_LENGTH = 90;

const CommunityCard = ({ community, majorityGenres }) => {
    const [expanded, setExpanded] = useState(false);

    const isLong = community.description.length > TRUNCATE_LENGTH;
    const description = !expanded && isLong
        ? community.description.substring(0, TRUNCATE_LENGTH) + '...'
        : community.description;

    const genres = majorityGenres
        .filter(row => row.community_name === community.community_name)
        .flatMap(row => row.highest_genres.split(','));

    return (
        <div className='bg-parchment-50 border border-parchment-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'>
            <div className='px-6 py-4 border-b border-parchment-100'>
                <Link
                    to={`/communities/${community.community_name}`}
                    className='text-base font-semibold text-parchment-900 hover:text-parchment-600 transition-colors'
                >
                    {community.community_name}
                </Link>
            </div>
            <div className='px-6 py-4'>
                {genres.length > 0 && (
                    <div className='flex flex-wrap gap-1.5 mb-3'>
                        {genres.map(genre => (
                            <span
                                key={genre}
                                className='text-xs bg-parchment-100 text-parchment-700 px-2.5 py-0.5 rounded-full font-medium border border-parchment-200'
                            >
                        {genre}
                    </span>
                        ))}
                    </div>
                )}
                <p className='text-sm text-parchment-700 leading-relaxed mb-4'>{description}</p>
                <div className='flex justify-between items-center'>
                    {isLong ? (
                        <button
                            onClick={() => setExpanded(prev => !prev)}
                            className='text-xs text-parchment-500 hover:text-parchment-700 transition-colors'
                        >
                            {expanded ? 'Show less' : 'Show more'}
                        </button>
                    ) : (
                        <span />
                    )}
                    <Link
                        to={`/communities/${community.community_name}`}
                        className='px-4 py-1.5 bg-parchment-100 text-parchment-700 border border-parchment-300 text-sm font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
                    >
                        View threads →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CommunityCard;