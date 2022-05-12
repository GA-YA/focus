import React, { useEffect, useState } from 'react';
import { Badge, Button, Modal } from 'react-bootstrap';
import { useFriends } from '../../../common/hooks/users';
import UserCard from '../../shared/userCard/UserCard';

const FollowingListButton = ({ userId }) => {
    const [userFriends] = useFriends(userId);
    const friendsCounter = userFriends ? userFriends.length : 0;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        handleClose();
    }, [userFriends]);

    return (
        <div>
            <Badge pill bg='secondary' onClick={handleShow}>
                {friendsCounter} Following
            </Badge>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Following</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userFriends?.map((user) => {
                        return <UserCard user={user} />;
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FollowingListButton;
