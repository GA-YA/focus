import React, { useEffect, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useNavigate } from 'react-router-dom';

const Video = ({ video, properties = { controls: true, clickable: true }, calcCanvasDimensions, setRef }) => {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const vcommentRef = useRef(null);
    const navigate = useNavigate();

    let handlePlay = (entries) => {
        entries.forEach((entry) => {
            if (videoRef.current) {
                if (entry.intersectionRatio === 1) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            }
        });
    };

    const calcVideoDimensions = () => {
        if (calcCanvasDimensions) {
            calcCanvasDimensions(videoRef.current.offsetWidth, videoRef.current.offsetHeight);
        }
    };

    useEffect(() => {
        console.log('videoObserver called');
        const options = {
            root: document.querySelector('#feed'),
            rootMargin: '0px',
            threshold: [0.5, 1.0],
        };
        let observer = new IntersectionObserver(handlePlay, options);
        observer.observe(videoRef.current);
        calcVideoDimensions();
    }, [videoRef, photoRef]);

    window.onresize = calcVideoDimensions;
    if (setRef) {
        setRef(videoRef, photoRef, vcommentRef);
    }

    const handleClick = () => {
        const { clickable } = properties;
        if (clickable) {
            navigate('/post/' + video._id);
        }
    };

    return (
        <div>
            <video
                className='w-100 rounded mx-auto'
                style={{ aspectRatio: '1 / 1', backgroundColor: 'black' }}
                ref={videoRef}
                muted={true}
                src={video?.url}
                controls={properties.controls}
                onClick={handleClick}
            />
            <div className='vcomment-container'>
                <canvas className='vcomment' ref={photoRef}></canvas>
                <CanvasDraw
                    className='vcomment'
                    // canvasWidth={canvasWidth}
                    // canvasHeight={canvasHeight}
                    lazyRadius={0}
                    brushRadius={2}
                    hideGrid={true}
                    ref={vcommentRef}
                    disabled={true}
                    //saveData={true}
                    // brushColor={'rgba(0,0,0,1)'}
                    backgroundColor={'transparent'}
                />
            </div>
        </div>
    );
};

export default Video;
