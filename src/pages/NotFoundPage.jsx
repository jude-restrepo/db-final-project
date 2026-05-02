import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <section className='min-h-screen bg-parchment-100 flex flex-col justify-center items-center text-center px-4'>
            <p className='text-8xl mb-4'>📖</p>
            <h1 className='text-6xl font-bold text-parchment-900 mb-3'>404</h1>
            <p className='text-parchment-500 text-lg mb-8'>Looks like this page got lost in the stacks.</p>
            <Link
                to='/'
                className='px-6 py-2.5 bg-parchment-100 text-parchment-700 border border-parchment-300 text-sm font-medium rounded-full hover:bg-parchment-200 transition-colors duration-200'
            >
                Back to the library →
            </Link>
        </section>
    )
}

export default NotFoundPage;