import { Link } from 'react-router-dom';

const ThreadCard = ({ thread }) => {
    const date = new Date(thread.created_on);
    const dateString = `${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    const isClosed = thread.closed_on !== null;
    const titles = thread.books ? thread.books.split(',') : [];

    return (
        <div className='bg-parchment-50 border border-parchment-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden'>
            <div className='px-6 py-4 border-b border-parchment-100'>
                <div className='flex items-start justify-between gap-3 mb-2'>
                    <Link
                        to={`/threads/${thread.thread_id}`}
                        className='text-base font-semibold text-parchment-900 hover:text-parchment-600 transition-colors leading-snug'
                    >
                        {thread.title}
                    </Link>
                    <span className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap
                ${isClosed
                        ? 'bg-parchment-200 text-parchment-600'
                        : 'bg-green-50 text-green-700'
                    }`}
                    >
                {isClosed ? 'Closed' : 'Open'}
            </span>
                </div>
                <p className='text-xs text-parchment-400'>{dateString}</p>
                <Link to={`/users/${thread.username}/account-info`} className='text-sm font-medium text-parchment-600'>{thread.username}</Link>
            </div>
            <div className='px-6 py-4'>
                <p className='text-sm text-parchment-700 leading-relaxed mb-4 line-clamp-3'>
                    {thread.content}
                </p>
                {titles.length > 0 && (
                    <div className='flex flex-wrap gap-1.5 mb-4'>
                        {titles.map(title => (
                            <span
                                key={title}
                                className='text-xs bg-parchment-100 text-parchment-700 px-2.5 py-0.5 rounded-full font-medium border border-parchment-200'
                            >
                        {title.trim()}
                    </span>
                        ))}
                    </div>
                )}
                <Link
                    to={`/threads/${thread.thread_id}`}
                    className='inline-flex items-center gap-1.5 px-4 py-1.5 bg-parchment-100 text-parchment-700 border border-parchment-300 text-sm font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
                >
                    View posts →
                </Link>
            </div>
        </div>
    );
};

export default ThreadCard;