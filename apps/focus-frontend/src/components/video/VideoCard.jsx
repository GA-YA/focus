import React from 'react';
import { useVideo } from '../../common/hooks/videos';
import CommentButton from '../buttons/commentButton/CommentButton';
import LikeButton from '../buttons/likeButton/LikeButton';
import UserNameHeader from '../shared/userNameHeader/UserNameHeader';
import Video from './Video';

const VideoCard = ({ user, videoId }) => {
    const [video, setVideo] = useVideo(videoId);

    return (
        <div className='card bg-light mb-4'>
            {video ? (
                <div>
                    <Video key={videoId} className='card-img-top' video={video} />
                    <div className='card-body '>
                        <span className='cart-title fs-4'>
                            <UserNameHeader user={user} />
                        </span>
                        <span className='card-subtitle align-baseline text-muted'>
                            {new Date(video.date).toDateString()}
                        </span>
                        <div className='text-end'>
                            <CommentButton video={video} />
                            <LikeButton video={video} setVideo={setVideo} />
                        </div>
                    </div>
                </div>
            ) : (
                <div>loading...</div>
            )}
        </div>
    );
};

export default VideoCard;
