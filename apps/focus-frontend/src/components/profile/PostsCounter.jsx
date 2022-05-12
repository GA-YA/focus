import React from 'react';
import { Badge } from 'react-bootstrap';

const PostsCounter = ({ videos }) => {
    const commentsCounter = videos ? videos.length : 0;

    return (
        <div>
            <Badge pill bg='secondary'>
                {commentsCounter} posts
            </Badge>
        </div>
    );
};

export default PostsCounter;
