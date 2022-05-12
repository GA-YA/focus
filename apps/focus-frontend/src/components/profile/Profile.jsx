import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import profile from '../../assets/profile.jpeg';
import { useUser } from '../../common/hooks/users';
import FollowingListButton from '../buttons/followingListButton/FollowingListButton';
import UploadPicButton from '../buttons/uploadPicButton/UploadPicButton';
import VideoContainer from '../video/VideoContainer';
import PostsCounter from './PostsCounter';
import ProfilePic from './ProfilePic';

function Profile() {
    const { id: userId } = useParams();
    const [videos, setVideos] = useState();
    const [user, updateUser] = useUser(userId);

    useEffect(() => {
        if (userId) {
            updateUser(userId);
        }
        setVideos(user?.videos);
    }, [videos, setVideos, user, userId]);

    return (
        <div className='container'>
            {user && videos ? (
                <div>
                    <div className='row position-relative'>
                        <div className='position-relative'>
                            <ProfilePic src={user.photo}></ProfilePic>
                            <img src={profile} className='col-6 w-100' alt='user pic'></img>
                        </div>
                        <h2 className='position-absolute bottom-0 fw-bold fs-1 m-4'>{user.userName}</h2>
                        <div className='position-absolute bottom-0 fs-6 ms-5 mb-1'>
                            {user.firstName} {user.lastName}
                        </div>
                        <div className='position-absolute bottom-0 end-0 w-auto'>
                            <UploadPicButton />
                        </div>
                    </div>
                    <PostsCounter videos={videos} />
                    <FollowingListButton userId={userId} />
                    <h3 className='fw-bold text-center mt-3 mb-4 pb-2 border-bottom border-2'>My trainings </h3>
                    <div className='row'>
                        {videos.map((videoId) => {
                            return (
                                <div className='col-4' key={videoId}>
                                    <VideoContainer
                                        user={''}
                                        videoId={videoId}
                                        properties={{
                                            header: false,
                                            commentBtn: false,
                                            likeBtn: false,
                                            controls: false,
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Profile;
