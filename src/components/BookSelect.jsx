import { useState, useRef, useEffect } from 'react';

const BookSelect = ({ selected, onChange }) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const ref = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/books`);
                const data = await res.json();
                if (data.status !== 'success') {
                    throw new Error();
                }
                setBooks(data.books)
            } catch (e) {
                console.log(`Failed to load account info: ${e}`);
            }
        }

        fetchData();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleBook = (book) => {
        if (selected.find(b => b.book_id === book.book_id)) {
            onChange(selected.filter(b => b.book_id !== book.book_id));
        } else {
            onChange([...selected, book]);
        }
    };

    const removeBook = (book) => {
        onChange(selected.filter(b => b !== book));
    };

    const filtered = books.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) && !selected.includes(b)
    );

    return (
        <div className="relative w-full" ref={ref}>

            {/* Selected tags + input trigger */}
            <div
                className="min-h-10 w-full flex flex-wrap gap-2 items-center px-3 py-2 border border-parchment-200 rounded-lg bg-white cursor-text"
                onClick={() => setOpen(true)}
            >
                {selected.map(book => (
                    <span
                        key={book.book_id}
                        className="flex items-center gap-1 bg-parchment-100 text-parchment-700 text-xs font-medium px-2.5 py-1 rounded-full border border-parchment-200"
                    >
                {book.title}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeBook(book);
                            }}
                            className="hover:text-parchment-900 transition-colors"
                        >
                    ✕
                </button>
            </span>
                ))}
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onFocus={() => setOpen(true)}
                    placeholder={selected.length === 0 ? 'Search for books...' : ''}
                    className="flex-1 min-w-24 text-sm outline-none bg-transparent text-parchment-800 placeholder-parchment-300"
                />
            </div>

            {/* Dropdown */}
            {open && filtered.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-parchment-50 border border-parchment-200 rounded-lg shadow-md max-h-48 overflow-y-auto">
                    {filtered.map(book => (
                        <li
                            key={book.book_id}
                            onClick={() => toggleBook(book)}
                            className="px-4 py-2 text-sm text-parchment-700 hover:bg-parchment-100 hover:text-parchment-900 cursor-pointer transition-colors"
                        >
                            {book.title}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};

export default BookSelect;