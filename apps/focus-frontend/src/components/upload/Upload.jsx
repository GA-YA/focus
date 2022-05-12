import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { uploadVideo } from '../../common/api/upload';

function Upload() {
    const [selectedFile, setSelectedFile] = useState();
    const [description, setDescription] = useState('');
    const formComp = useRef();

    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleChangeDescription = (e) => setDescription(e.target.value);

    const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video', selectedFile);
        formData.append('description', description);
        await uploadVideo(formData);
        formComp.current.reset();
    };

    return (
        <div>
            <h1>Upload Page</h1>
            <Form onSubmit={uploadFile} ref={formComp}>
                <Form.Group controlId='formFile'>
                    <Form.Label>Select a file to upload</Form.Label>
                    <Form.Control type='file' onChange={changeHandler} />
                </Form.Group>

                <Form.Group className='w-100 mb-2' controlId='description'>
                    <Form.Control
                        autoFocus
                        type='text'
                        placeholder='Enter video description'
                        name='description'
                        value={description}
                        onChange={handleChangeDescription}
                        maxlength="20"
                    />
                </Form.Group>
                <Button variant='primary' type='submit'>
                    Upload
                </Button>
            </Form>
        </div>
    );
}

export default Upload;
