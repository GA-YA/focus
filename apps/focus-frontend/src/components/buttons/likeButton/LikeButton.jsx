import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { DELETElike, POSTlike } from '../../../common/api/video';

const LikeButton = ({ video, setVideo }) => {
    const connectedUserId = JSON.parse(localStorage.getItem('userId'));
    const isLiked = video.likes.includes(connectedUserId);
    const [liked, setLiked] = useState(isLiked ? isLiked : false);
    const likedCounter = video.likes ? video.likes.length : 0;
    const ready = useRef(false);

    const clickHandler = async () => {
        setLiked(!liked);
    };

    useEffect(() => {
        if (ready.current) {
            if (liked) {
                POSTlike(video._id);
                setVideo({ ...video, likes: [...video.likes, connectedUserId] });
            } else {
                DELETElike(video._id);
                const [connectedUserId, ...rest] = video.likes;
                setVideo({ ...video, likes: rest });
            }
        }
        ready.current = true;
    }, [liked]);

    return (
        <Button className='border' variant='light' size='lg' onClick={clickHandler}>
            <div>
                {liked ? <BsHeartFill color='red' /> : <BsHeart />} {likedCounter}
            </div>
        </Button>
    );
};

export default LikeButton;
