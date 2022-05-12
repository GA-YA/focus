import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Video = ({ video, properties = { controls: true, clickable: true } }) => {
    const videoRef = useRef(null);
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

    useEffect(() => {
        console.log('videoObserver called');
        const options = {
            root: document.querySelector('#feed'),
            rootMargin: '0px',
            threshold: [0.5, 1.0],
        };
        let observer = new IntersectionObserver(handlePlay, options);
        observer.observe(videoRef.current);
    }, []);

    function handleClick() {
        const { clickable } = properties;
        if (clickable) {
            navigate('/post/' + video._id);
        }
    }

    return (
        <video
            className='w-100 rounded mx-auto'
            style={{ aspectRatio: '1 / 1', backgroundColor: 'black' }}
            ref={videoRef}
            muted={true}
            src={video?.url}
            controls={properties.controls}
            onClick={handleClick}
        />
    );
};

export default Video;
