import React from 'react';
import { Button } from 'react-bootstrap';
import { BsChat } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const CommentButton = ({ video }) => {
    const navigate = useNavigate();
    const commentsCounter = video.comments ? video.comments.length : 0;

    function handleClick() {
        navigate('/post/' + video._id);
    }

    return (
        <Button className='me-3 border' variant='light' size='lg' onClick={handleClick}>
            <BsChat /> {commentsCounter}
        </Button>
    );
};

export default CommentButton;
