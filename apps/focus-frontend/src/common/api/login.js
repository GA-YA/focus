import axios from 'axios';
import { API_URL } from '../constants';
axios.defaults.withCredentials = true;

export const POSTlogin = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}login`, formData, {
            headers: {
                Accept: 'application/json',
                credentials: 'same-origin',
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const POSTregister = async (formData) => {
    try {
        const res = await axios.post(`${API_URL}register`, formData, {
            headers: {
                Accept: 'application/json',
                credentials: 'same-origin',
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const POSTlogout = async () => {
    try {
        const res = await axios.post(`${API_URL}logout`);
        return res;
    } catch (e) {
        console.log(e);
    }
};
