import {useNavigate} from "react-router-dom";
import {useState} from "react";



const CreateUserPage = ({ addUserSubmit }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');



    const navigate = useNavigate();

    const registerNewUser = async (e) => {
        e.preventDefault();
        const data = await fetch(`api/users/${username}`)
        const json = await data.json();
        if (json.user !== undefined) {
            setError('Username already exists. Pick something else');
        } else {
            const result = addUserSubmit({ username: username, password: password });
            if (result) {
                navigate('/login');
            } else {
                setUsername('');
                setPassword('');
                console.log('Error:', result);
            }
            setError('');
        }
    }

    return (
        <section className='min-h-screen bg-parchment-100 flex items-center justify-center px-4'>
            <div className='w-full max-w-md'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-parchment-900 mb-2'>Bookish</h1>
                    <p className='text-sm text-parchment-500'>Join the conversation</p>
                </div>
                <div className='bg-parchment-50 border border-parchment-200 rounded-xl shadow-sm p-8'>
                    {error && (
                        <div className='bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6'>
                            {error}
                        </div>
                    )}
                    <form onSubmit={registerNewUser}>
                        <h2 className='text-xl font-semibold text-parchment-900 mb-6'>
                            Create an account
                        </h2>
                        <div className='mb-4'>
                            <label htmlFor='username' className='block text-xs font-medium text-parchment-600 uppercase tracking-wider mb-1.5'>
                                Username
                            </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                className='w-full px-4 py-2.5 border border-parchment-200 rounded-lg text-sm text-parchment-800 placeholder-parchment-300 bg-white focus:outline-none focus:ring-2 focus:ring-parchment-400 focus:border-transparent'
                                maxLength={100}
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='mb-6'>
                            <label htmlFor='password' className='block text-xs font-medium text-parchment-600 uppercase tracking-wider mb-1.5'>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                className='w-full px-4 py-2.5 border border-parchment-200 rounded-lg text-sm text-parchment-800 placeholder-parchment-300 bg-white focus:outline-none focus:ring-2 focus:ring-parchment-400 focus:border-transparent'
                                maxLength={100}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className='w-full py-2.5 bg-parchment-100 text-parchment-700 border border-parchment-300 text-sm font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
                            type='submit'
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default CreateUserPage;
