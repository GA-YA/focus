import React from 'react';
import { Button } from 'react-bootstrap';
import { BsEasel } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const VCommentButton = ({ video }) => {
    const navigate = useNavigate();
    const commentsCounter = video.comments ? video.comments.length : 0;

    function handleClick() {
        navigate(window.location.pathname + '/vcomment');
    }

    return (
        <Button className='me-3 border' variant='light' size='lg' onClick={handleClick}>
            <BsEasel />
        </Button>
    );
};

export default VCommentButton;
