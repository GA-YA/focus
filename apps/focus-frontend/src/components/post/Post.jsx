import React, { useRef, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { DELETEcomment, POSTcomment } from '../../common/api/video';
import { useUser } from '../../common/hooks/users';
import { useVideo } from '../../common/hooks/videos';
import UserNameHeader from '../shared/userNameHeader/UserNameHeader';
import VideoContainer from '../video/VideoContainer';
import Comment from './Comment';

const Post = () => {
    const { id: videoId } = useParams();
    const [video, setVideo] = useVideo(videoId);
    const [user] = useUser(video?.userId);
    const [body, setBody] = useState();
    const commentForm = useRef();

    const handleInputChange = (e) => {
        const body = { toUserId: video?.userId, text: e.target.value };
        setBody(body);
    };

    const handleEnterComment = async (event) => {
        event.preventDefault();
        commentForm.current.reset();
        const comment = await POSTcomment(videoId, body);
        const comments = [comment._id, ...video.comments];
        setVideo({ ...video, comments });
    };

    const handleRemoveComment = async (commentId) => {
        await DELETEcomment(commentId);
        const commentsAfterDelete = video.comments.reduce((prev, curr) => {
            return curr === commentId ? prev : [...prev, curr];
        }, []);
        setVideo({ ...video, comments: commentsAfterDelete });
    };

    return (
        <div>
            <div className='mb-3'>
                <VideoContainer
                    videoId={videoId}
                    user={user}
                    properties={{ header: false, likeBtn: true, commentBtn: true }}
                />
                <div className='fs-3 fw-bold border-bottom mt-3'>{video?.description ? video.description : ''}</div>
                <div className='fs-6 mt-1'>{new Date(video?.date).toUTCString()}</div>
            </div>
            <div className='border p-2 rounded overflow-scroll'>
                <UserNameHeader user={user} properties={{ className: 'border-bottom mb-3 border-2 fw-bold' }} />
                <div className='overflow-scroll' style={{ height: '300px' }}>
                    {video?.comments.map((commentId) => {
                        return (
                            <Comment key={commentId} commentId={commentId} handleRemoveComment={handleRemoveComment} />
                        );
                    })}
                </div>
                <Form onSubmit={handleEnterComment} ref={commentForm}>
                    <InputGroup onSubmit={handleEnterComment}>
                        <FormControl onChange={handleInputChange} placeholder='new comment' />
                        <Button type='submit' variant='outline-secondary'>
                            Enter
                        </Button>
                    </InputGroup>
                </Form>
            </div>
        </div>
    );
};

export default Post;
