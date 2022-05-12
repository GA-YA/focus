import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useConnectedUserData, useFriends } from '../../common/hooks/users';
import VideoCard from '../video/VideoCard';

function Feed() {
    const [connectedUser] = useConnectedUserData();
    const [userFriends] = useFriends(connectedUser?._id);

    return (
        <div className='overflow-scroll'>
            <div className='container'>
                {userFriends?.length === 0 ? (
                    <div>No videos yet!</div>
                ) : (
                    userFriends?.map((user) => {
                        return user.videos.map((videoId) => {
                            return <VideoCard key={videoId} user={user} videoId={videoId} />;
                        });
                    })
                )}
            </div>
        </div>
    );
}

export default Feed;
