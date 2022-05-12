import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { POSTaddFriend } from '../../../common/api/users';
import { useConnectedUserData, useFriends } from '../../../common/hooks/users';

const FollowButton = ({ userId }) => {
    const [connectedUser] = useConnectedUserData();
    const [userFriends] = useFriends(connectedUser?._id);
    const [followBtnProps, setFollowBtnProps] = useState({ text: 'Follow', color: 'primary' });

    const isFriend = () => {
        return userFriends?.findIndex((friend) => friend._id === userId) >= 0;
    };

    useEffect(() => {
        if (isFriend()) {
            setFollowBtnProps({ text: 'Following', color: 'dark' });
        } else setFollowBtnProps({ text: 'Follow', color: 'primary' });
    }, [userFriends]);

    const handleClick = async () => {
        if (followBtnProps.text === 'Follow') {
            setFollowBtnProps({ text: 'Following', color: 'dark' });
            POSTaddFriend(userId);
        } else {
            setFollowBtnProps({ text: 'Follow', color: 'primary' });
            // POSTdeleteFriend(userId); TODO: add unfollow to api
        }
    };

    return (
        <Button
            className={`btn btn-${followBtnProps.color} position-absolute end-0 translate-middle`}
            onClick={handleClick}
            size='sm'>
            {followBtnProps.text}
        </Button>
    );
};

export default FollowButton;
