import {Outlet} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NavBar from '../components/NavBar.jsx';

//Put stuff that you want to show on every page here!

const MainLayout = () => {
    return (
        <>
            <NavBar/>
            <Outlet/>
            <ToastContainer/>
        </>
    )
}

export default MainLayout