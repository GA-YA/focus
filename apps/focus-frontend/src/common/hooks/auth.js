import { useState } from 'react';

export function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    return { token, setToken: saveToken };
}

export function useConnectedUserId() {
    const getConnectedUser = () => {
        const connectedUserString = localStorage.getItem('userId');
        const connectedUser = JSON.parse(connectedUserString);
        return connectedUser;
    };

    const [connectedUser, setConnectedUser] = useState(getConnectedUser());

    const saveConnectedUser = (connectedUser) => {
        localStorage.setItem('userId', JSON.stringify(connectedUser));
        setConnectedUser(connectedUser);
    };

    return { connectedUser, setConnectedUser: saveConnectedUser };
}

