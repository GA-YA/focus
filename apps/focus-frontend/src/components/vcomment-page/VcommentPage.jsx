import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import CanvasDraw from 'react-canvas-draw';
import { useParams } from 'react-router-dom';
import { useUser } from '../../common/hooks/users';
import { useVideo } from '../../common/hooks/videos';
import Video from '../video/Video';
import './vcomment.css';

const VcommentPost = () => {
    const { id: videoId } = useParams();
    const [video, setVideo] = useVideo(videoId);
    const [user] = useUser(video?.userId);

    const [canvasHeight, setCanvasHeight] = useState(400);
    const [canvasWidth, setCanvasWidth] = useState(400);

    const canvasRef = useRef(null);
    let videoRef = useRef(null);
    let photoRef = useRef(null);
    let vcommentRef = useRef(null);

    const calcCanvasDimensions = (width, height) => {
        if (width) {
            setCanvasWidth(width);
        }
        if (height) {
            setCanvasHeight(height - 60);
        }
    };

    const clearCanvas = () => {
        canvasRef.current.clear();
    };

    const setRef = (vRef, pRef, cRef) => {
        videoRef = vRef;
        photoRef = pRef;
        vcommentRef = cRef;
    };

    const save = () => {
        const canvasData = canvasRef.current.getSaveData();
        let video = videoRef.current;
        // let photo = document.createElement('canvas');
        let photo = photoRef.current;
        let vcomment = vcommentRef.current;

        const width = video.videoWidth;
        const height = video.videoHeight;
        vcomment.loadSaveData(canvasData);

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);
        console.log(vcomment.getSaveData());

        //console.log(photo.toDataURL('image/jpg'));
    };

    return (
        <div>
            <div className='mb-1'>
                <Button className='me-1 border' variant='danger' size='md' onClick={clearCanvas}>
                    delete
                </Button>
                <Button className='border' size='md' onClick={save}>
                    save
                </Button>
            </div>
            <div className='vcomment-container'>
                <div className='vcomment'>
                    <Video
                        video={video}
                        properties={{ clickable: false, controls: true }}
                        calcCanvasDimensions={calcCanvasDimensions}
                        setRef={setRef}
                    />
                </div>
                <div className='vcomment'>
                    <CanvasDraw
                        canvasWidth={canvasWidth}
                        canvasHeight={canvasHeight}
                        lazyRadius={0}
                        brushRadius={2}
                        hideGrid={true}
                        ref={canvasRef}
                        brushColor={'rgba(0,0,0,1)'}
                        backgroundColor={'transparent'}
                    />
                </div>
            </div>
        </div>
    );
};

export default VcommentPost;
