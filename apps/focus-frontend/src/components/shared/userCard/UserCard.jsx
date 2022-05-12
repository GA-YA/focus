import React from 'react';
import FollowButton from '../../buttons/followButton/FollowButton';
import UserNameHeader from '../../shared/userNameHeader/UserNameHeader';

const UserCard = ({ user }) => {
    return (
        <div key={user._id} className='position-relative mt-2 border p-4'>
            <div className='ms-2'>
                <div className='position-absolute translate-middle border rounded-circle p-2 m-2 w-auto'>img</div>
                <FollowButton userId={user._id} />
                <UserNameHeader user={user} properties={{ className: 'ms-5 w-auto' }} />
            </div>
        </div>
    );
};

export default UserCard;
