import React from 'react';
import { useVideo } from '../../common/hooks/videos';
import CommentButton from '../buttons/commentButton/CommentButton';
import LikeButton from '../buttons/likeButton/LikeButton';
import UserNameHeader from '../shared/userNameHeader/UserNameHeader';
import Video from './Video';
import VCommentButton from '../buttons/vCommentButton/VCommentButton';

const VideoContainer = ({
    user,
    videoId,
    properties = { header: true, commentBtn: true, likeBtn: true, controls: true },
}) => {
    const [video, setVideo] = useVideo(videoId);

    return (
        <div>
            {video ? (
                <div>
                    {properties.header && <UserNameHeader user={user} />}
                    <Video video={video} properties={properties.controls} />
                    <div className='position-relative'>
                        <div className='position-absolute end-0'>
                            {properties.commentBtn && <VCommentButton video={video} />}
                            {properties.commentBtn && <CommentButton video={video} />}
                            {properties.likeBtn && <LikeButton video={video} setVideo={setVideo} />}
                        </div>
                    </div>
                </div>
            ) : (
                <div>loading...</div>
            )}
        </div>
    );
};

export default VideoContainer;
