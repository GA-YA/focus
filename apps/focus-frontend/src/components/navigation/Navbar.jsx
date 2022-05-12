import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineCloudUpload, AiOutlineLogout, AiOutlineUser, AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { POSTlogout } from '../../common/api/login';
import './nav.css';
import { useConnectedUserData } from '../../common/hooks/users';


function Navigation({ setToken }) {
    const [connectedUser] = useConnectedUserData();

    const navigate = useNavigate();

    function logout() {
        setToken(null);
        POSTlogout();
    }

    return (
        <div className='align-items-start w-auto vh-100 pt-5 sticky-top'>
            <div className='nav flex-column nav-pills' id='v-pills-tab' role='tablist' aria-orientation='vertical'>
                <h2 className='fw-bold mb-4 text-center'>Focus</h2>
                <button
                    className='nav-link nav-link-secondary fs-5 fw-bold mb-3'
                    id='v-pills-home-tab'
                    data-bs-toggle='pill'
                    data-bs-target='#v-pills-home'
                    type='button'
                    onClick={() => {
                        navigate('/feed');
                    }}>
                    <AiOutlineHome className='me-2' size={30} color='primary' />
                    Home
                </button>
                <button
                    className='nav-link fs-5 fw-bold mb-3'
                    id='v-pills-profile-tab'
                    data-bs-toggle='pill'
                    data-bs-target='#v-pills-profile'
                    type='button'
                    role='tab'
                    aria-controls='v-pills-profile'
                    aria-selected='false'
                    onClick={() => {
                        navigate(`/profile/${connectedUser._id}`);
                    }}>
                    <AiOutlineUser className='me-2' size={30} color='primary' />
                    Profile
                </button>
                <button
                    className='nav-link fs-5 fw-bold mb-3'
                    id='v-pills-messages-tab'
                    data-bs-toggle='pill'
                    data-bs-target='#v-pills-messages'
                    type='button'
                    role='tab'
                    aria-controls='v-pills-messages'
                    aria-selected='false'
                    onClick={() => {
                        navigate('/upload');
                    }}>
                    <AiOutlineCloudUpload className='me-2' size={30} color='primary' />
                    Publish
                </button>
                <button
                    className='nav-link fs-5 fw-bold mb-3'
                    id='v-pills-settings-tab'
                    data-bs-toggle='pill'
                    data-bs-target='#v-pills-settings'
                    type='button'
                    role='tab'
                    aria-controls='v-pills-settings'
                    aria-selected='false'
                    onClick={logout}>
                    <AiOutlineLogout className='me-2' size={30} color='primary' />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Navigation;
