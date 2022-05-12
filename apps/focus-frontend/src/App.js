import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { useToken } from './common/hooks/auth';
import Feed from './components/feed/Feed';
import Login from './components/login/Login';
import Navigation from './components/navigation/Navbar';
import Post from './components/post/Post';
import Profile from './components/profile/Profile';
import Search from './components/search/Search';
import Upload from './components/upload/Upload';
import VcommentPost from './components/vcomment-page/VcommentPage';

function App() {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={setToken} />;
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-2 border-end border-3'>
                    <Navigation setToken={setToken} />
                </div>
                <div className='col-7 p-5 bg-light'>
                    <Routes>
                        <Route path='/' element={<Feed />}></Route>
                        <Route path='/feed' element={<Feed />}></Route>
                        <Route path='/profile/:id' element={<Profile />}></Route>
                        <Route path='/upload' element={<Upload />}></Route>
                        <Route path='/post/:id' element={<Post />}></Route>
                        <Route path='/post/:id/vcomment' element={<VcommentPost />}></Route>
                    </Routes>
                </div>
                <div className='col-3 border-start border-3'>
                    <Search />
                </div>
            </div>
        </div>
    );
}

export default App;
