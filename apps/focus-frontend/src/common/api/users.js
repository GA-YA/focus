import axios from 'axios';
import { API_URL } from '../constants';
axios.defaults.withCredentials = true;

export const GETuser = async (userId) => {
    try {
        const res = await axios.get(`${API_URL}users/${userId}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const GETfriends = async (userId) => {
    try {
        const res = await axios.get(`${API_URL}users/user/friends/${userId}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const GETallUsers = async () => {
    try {
        const res = await axios.get(`${API_URL}users`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const POSTaddFriend = async (userId) => {
    try {
        const res = await axios.post(`${API_URL}users/user/friends/${userId}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const POSTprofilePic = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}users/picture`, formData);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
