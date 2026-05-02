const CommunityFilter = ({ activeFilter, onFilterChange }) => {
    return (
        <div className='flex items-center gap-2'>
            <button
                onClick={() => onFilterChange('')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
            ${activeFilter === ''
                    ? 'bg-parchment-700 text-parchment-50'
                    : 'bg-parchment-100 text-parchment-600 hover:bg-parchment-200'
                }`}
            >
                All
            </button>
            <button
                onClick={() => onFilterChange('hot')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
            ${activeFilter === 'hot'
                    ? 'bg-parchment-700 text-parchment-50'
                    : 'bg-parchment-100 text-parchment-600 hover:bg-parchment-200'
                }`}
            >
                Hot
            </button>
            <button
                onClick={() => onFilterChange('unanswered')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
            ${activeFilter === 'unanswered'
                    ? 'bg-parchment-700 text-parchment-50'
                    : 'bg-parchment-100 text-parchment-600 hover:bg-parchment-200'
                }`}
            >
                Unanswered
            </button>
        </div>
    );
};

export default CommunityFilter;