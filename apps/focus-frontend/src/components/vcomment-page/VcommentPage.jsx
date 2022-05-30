import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useUser } from '../../common/hooks/users';
import { useVideo } from '../../common/hooks/videos';
import Video from '../video/Video';
import Canvas from '../canvas/Canvas';

const VcommentPost = () => {
    const { id: videoId } = useParams();
    const [video, setVideo] = useVideo(videoId);
    const [user] = useUser(video?.userId);
    const [shapes, setShapes] = useState([]);

    function clearDraw(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function drawRect(ctx, frameCount) {
        clearDraw(ctx);
        ctx.beginPath();
        ctx.rect(20, 20, 50, 50);
        ctx.stroke();
    }

    const drawCircle = (ctx, frameCount) => {
        clearDraw(ctx);
        ctx.beginPath();
        ctx.arc(50, 100, 20, 0, 2 * Math.PI);
        ctx.stroke();
    };

    function addRect() {
        const newShape = shapes.concat('rect');
        setShapes(newShape);
    }

    function addCircle() {
        const newShape = shapes.concat('circle');
        setShapes(newShape);
    }

    return (
        <div>
            <div className='mb-3'>
                <div className='overflow-scroll' style={{ height: '400px' }}>
                    {shapes.map((draw) => {
                        if (draw === 'rect') {
                            return <Canvas draw={drawRect} />;
                        }
                        if (draw === 'circle') {
                            return <Canvas draw={drawCircle} />;
                        }
                    })}
                </div>
                <div>
                    <Button onClick={addRect}>add rect</Button>
                    <Button onClick={addCircle}>add circle</Button>
                </div>
            </div>

            <div className='mb-3'>
                <Video video={video} properties={{ clickable: false, controls: true }} />
            </div>
        </div>
    );
};

export default VcommentPost;
