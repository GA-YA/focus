import React, { useRef } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { POSTprofilePic } from '../../../common/api/users';

const UploadPicButton = () => {
    const inputRef = useRef();
    const handelOpenFileChooser = () => {
        inputRef.current.click();
    };

    const onFileChange = async (event) => {
        const formData = new FormData();
        formData.append('profilePic', event.target.files[0]);
        await POSTprofilePic(formData);
        inputRef.current.reset();
    };

    return (
        <>
            <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                id='contained-button-file'
                ref={inputRef}
                onChange={onFileChange}
            />
            <label htmlFor='contained-button-file'>
                <button className='btn rounded-circle' variant='contained' onClick={handelOpenFileChooser}>
                    <AiFillEdit size={30} />
                </button>
            </label>
        </>
    );
};

export default UploadPicButton;
