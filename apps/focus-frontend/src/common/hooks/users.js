import { useEffect, useState } from 'react';
import { GETallUsers, GETfriends, GETuser } from '../api/users';

export function useConnectedUserData() {
    const [connectedUser, setConnectedUser] = useState();

    useEffect(() => {
        console.log('useConnectedUserData called');
        if (connectedUser) {
            return;
        }
        const connectedUserIdString = localStorage.getItem('userId');
        const connectedUserId = JSON.parse(connectedUserIdString);
        GETuser(connectedUserId).then((user) => {
            setConnectedUser(user);
        });
    }, []);

    return [connectedUser];
}

export function useFriends(userId) {
    const [userFriends, setUserFriends] = useState();

    useEffect(() => {
        console.log('useFriends called');
        if (userId) {
            GETfriends(userId).then((user) => {
                setUserFriends(user);
            });
        }
    }, [userId]);

    return [userFriends];
}

export function useUser(userId) {
    const [user, setUser] = useState();

    useEffect(() => {
        console.log('useUser called');
        if (userId) {
            GETuser(userId).then((user) => {
                setUser(user);
            });
        }
    }, [userId]);

    const updateUser = (id) => {
        userId = id;
    };

    return [user, updateUser];
}

export function useUsers() {
    const [users, setUsers] = useState();

    useEffect(() => {
        console.log('useUsers called');
        if (!users) {
            GETallUsers().then((users) => {
                setUsers(users);
            });
        }
    }, []);

    return [users];
}
