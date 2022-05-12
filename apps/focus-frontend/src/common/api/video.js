import axios from 'axios';
import { API_URL } from '../constants';
axios.defaults.withCredentials = true;

export const GETvideo = async (videoId) => {
    try {
        const res = await axios.get(`${API_URL}videos/${videoId}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const GETcomment = async (commentId) => {
    try {
        const res = await axios.get(`${API_URL}videos/comments/${commentId}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const POSTcomment = async (videoId, body) => {
    try {
        const res = await axios.post(`${API_URL}videos/comments/${videoId}`, body);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const DELETEcomment = async (commentId) => {
    try {
        const res = await axios.delete(`${API_URL}videos/comments/${commentId}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const POSTlike = async (videoId) => {
    try {
        const res = await axios.post(`${API_URL}videos/likes/${videoId}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const DELETElike = async (videoId) => {
    try {
        const res = await axios.delete(`${API_URL}videos/likes/${videoId}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
