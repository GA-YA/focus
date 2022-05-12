import axios from 'axios';
import { API_URL } from '../constants';

export const uploadVideo = async (formData) => {
    try {
        await axios.post(`${API_URL}videos`, formData);
    } catch (e) {
        return e.message;
    }
};
