import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from "../context/AuthContext.jsx";

const NavBar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className='bg-parchment-900 border-b border-parchment-800 shadow-lg'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>

                    {/* Logo / Brand */}
                    <Link className='flex items-center gap-2' to='/'>
                        <img className='h-9 w-auto' src='/react.svg'  alt='the react logo'/>
                        <span className='text-parchment-50 text-2xl font-bold tracking-wide'>
                    Bookish
                        </span>
                    </Link>

                    {/* Right side */}
                    <div className='flex items-center gap-4'>
                        <Link
                            to={`/users/${currentUser}/account-info`}
                            className='text-parchment-300 text-sm font-medium hover:text-parchment-100 transition-colors flex items-center gap-2'
                        >
                            <img className='h-5 w-auto' src='/user.svg' alt='user profile'/>
                            {currentUser}
                        </Link>
                        <button
                            className='bg-parchment-50 text-parchment-800 hover:bg-parchment-200 font-semibold text-sm py-1.5 px-4 rounded-full transition-colors duration-200'
                            onClick={() => {
                                logout();
                                navigate('/login');
                            }}
                        >
                            Log Out
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default NavBar;