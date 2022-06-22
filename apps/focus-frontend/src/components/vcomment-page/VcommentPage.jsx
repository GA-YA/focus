import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useUser } from '../../common/hooks/users';
import { useVideo } from '../../common/hooks/videos';
import Video from '../video/Video';
import CanvasDraw from 'react-canvas-draw';

const VcommentPost = () => {
    const { id: videoId } = useParams();
    const [video, setVideo] = useVideo(videoId);
    const [user] = useUser(video?.userId);
    const canvasRef = useRef(null);

    return (
        <div>
            <div>
                <CanvasDraw lazyRadius={0} brushRadius={2} ref={canvasRef}></CanvasDraw>
            </div>

            <div className='mb-3'>
                <Video video={video} properties={{ clickable: false, controls: true }} />
            </div>
        </div>
    );
};

export default VcommentPost;
