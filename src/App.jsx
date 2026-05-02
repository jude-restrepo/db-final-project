import { addUser, loginUser } from './services/authService';
import { addCommunity, deleteCommunity, updateCommunity } from './services/communityService';
import { addThread, closeThread } from './services/threadService';
import { addPost, deletePost } from './services/postService';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate} from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import CreateUserPage from "./pages/CreateUserPage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import AddCommunityPage from "./pages/AddCommunityPage.jsx";
import UpdateCommunityPage from "./pages/UpdateCommunityPage.jsx";
import CommunityPage, { communityLoader } from "./pages/CommunityPage.jsx";
import ThreadPage, { threadLoader } from "./pages/ThreadPage.jsx";
import UserPage from "./pages/UserPage.jsx"
import NotFoundPage from "./pages/NotFoundPage.jsx";
import {useEffect} from "react";
import {useAuth} from "./context/AuthContext.jsx";


const App = () => {
    const ProtectedRoute = ({ children }) => {
        const { currentUser } = useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            if (currentUser === null) {
                navigate('/login');
            }
        }, []);

        return children;
    };

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/login' element={<LoginPage loginSubmit={loginUser} />} />
                <Route path='/new-user' element={<CreateUserPage addUserSubmit={addUser} />} />
                <Route path='/' element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                    <Route index element={<HomePage />} />
                    <Route path='/add-community' element={<AddCommunityPage addCommunitySubmit={addCommunity} />} />
                    <Route path='/edit-community/:community_name' element={<UpdateCommunityPage updateCommunitySubmit={updateCommunity} />} loader={communityLoader} />
                    <Route path='/communities/:community_name' element={<CommunityPage deleteCommunity={deleteCommunity} addThread={addThread}/>} loader={communityLoader} />
                    <Route path='/threads/:thread_id' element={<ThreadPage closeThread={closeThread} addPost={addPost} deletePost={deletePost}/>} loader={threadLoader}/>
                    <Route path='/users/:username/account-info' element={<UserPage />}/>
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </>
        )
    );

    return <RouterProvider router={router} />;
};

export default App;