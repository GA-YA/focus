import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { DELETEcomment, POSTcomment } from '../../common/api/video';
import { useUser } from '../../common/hooks/users';
import { useVideo } from '../../common/hooks/videos';
import Video from '../video/Video';
import Canvas from './Canvas';

const VcommentPost = () => {
    const { id: videoId } = useParams();
    const [video, setVideo] = useVideo(videoId);
    const [user] = useUser(video?.userId);

    return (
        <div>
            <div>hi</div>
            <div>
                <Canvas />
            </div>
            <div className='mb-3'>
                <Video video={video} properties={{ clickable: false, controls: true }} />
            </div>
            <div>
                <Button>arrow</Button>
                <Button>circle</Button>
                <Button>squre</Button>
            </div>
        </div>
    );
};

export default VcommentPost;
