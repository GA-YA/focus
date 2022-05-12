import { useEffect, useState } from 'react';
import { GETcomment, GETvideo } from '../api/video';

export function useVideo(videoId) {
    const [video, setVideo] = useState();

    useEffect(() => {
        console.log('useVideo called');
        if (!video && videoId) {
            GETvideo(videoId).then((video) => {
                video.comments = video.comments.reverse();
                setVideo(video);
            });
        }
    }, []);

    return [video, setVideo];
}

export function useComment(commentId) {
    const [comment, setComment] = useState();

    useEffect(() => {
        console.log('useComment called');
        if (!comment && commentId) {
            GETcomment(commentId).then((comment) => {
                setComment(comment);
            });
        }
    }, []);

    return [comment];
}
