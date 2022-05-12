import React from 'react';
import { useConnectedUserData, useUser } from '../../common/hooks/users';
import { useComment } from '../../common/hooks/videos';
import UserNameHeader from '../shared/userNameHeader/UserNameHeader';

const Comment = ({ commentId, handleRemoveComment }) => {
    const [comment] = useComment(commentId);
    const [connectedUser] = useConnectedUserData();
    const [user] = useUser(comment?.fromUserId);

    const showRemoveBtn = () => {
        return connectedUser?._id === comment.fromUserId;
    };

    return (
        <div className='card comment mb-3 w-75 rounded'>
            {comment ? (
                <div className='card-body'>
                    <UserNameHeader user={user} properties={{ className: 'card-title fw-bold rounded' }} />
                    <div className='card-subtitle mb-2 text-muted'>{new Date(comment.date).toDateString()}</div>
                    <div className='card-text mb-2 fs-6 rounded'>{comment.text}</div>
                    <div className='text-end'>
                        {showRemoveBtn() ? (
                            <button className='btn btn-danger' onClick={() => handleRemoveComment(commentId)}>
                                remove
                            </button>
                        ) : (
                            <div />
                        )}
                    </div>
                </div>
            ) : (
                <div>loading...</div>
            )}
        </div>
    );
};

export default Comment;
