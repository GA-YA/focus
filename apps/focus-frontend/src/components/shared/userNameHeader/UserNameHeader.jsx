import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserNameHeader = ({ user, properties = { className: 'fs-3' } }) => {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/profile/' + user._id);
    }

    return (
        <div className={properties.className} style={{ cursor: 'pointer' }} onClick={handleClick}>
            {user?.userName}
        </div>
    );
};

export default UserNameHeader;
