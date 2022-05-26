import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { DELETEcomment, POSTcomment } from '../../common/api/video';
import { useUser } from '../../common/hooks/users';
import { useVideo } from '../../common/hooks/videos';
import Video from '../video/Video';
import Canvas from '../canvas/Canvas';

const VcommentPost = () => {
    const { id: videoId } = useParams();
    const [video, setVideo] = useVideo(videoId);
    const [user] = useUser(video?.userId);

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
        ctx.fill();
    };

    return (
        <div>
            <div>hi</div>
            <div>
                <Canvas draw={draw} />
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
