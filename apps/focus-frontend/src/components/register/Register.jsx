import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { POSTregister } from '../../common/api/login';

function Register({ setIsRegister, setConnectedUser, setToken }) {
    const formComp = useRef();
    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birth: new Date(),
    });

    async function handleSubmit(event) {
        event.preventDefault();
        formComp.current.reset();
        const res = await POSTregister(formData);
        if (res.status === 201) {
            const user = res.data;
            setConnectedUser(user?._id);
            setToken(user?.token);
        } else {
            window.alert('somthing went wrong');
        }
    }

    function handleChange() {
        const form = new FormData(formComp.current);
        let userName = form.get('userName');
        let firstName = form.get('firstName');
        let lastName = form.get('lastName');
        let email = form.get('email');
        let password = form.get('password');
        let birth = form.get('birth');
        setFormData({ userName, firstName, lastName, email, password, birth });
    }

    function validateForm() {
        return (
            formData.userName.length > 0 &&
            formData.firstName.length > 0 &&
            formData.lastName.length > 0 &&
            formData.email.length > 0 &&
            formData.password.length > 0
        );
    }

    function moveToLoginPage() {
        setIsRegister(false);
    }

    return (
        <div className='card bg-light p-4 h-auto position-absolute w-25 top-50 start-50 translate-middle'>
            <Form onSubmit={handleSubmit} ref={formComp}>
                <h2 className='card-title text-center mb-4 fw-bold'>Register to Focus</h2>

                <Form.Group className='w-100 mb-2' controlId='userName'>
                    <Form.Control
                        autoFocus
                        type='text'
                        placeholder='Enter user name'
                        name='userName'
                        value={formData.userName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className='w-100 mb-2' controlId='firstName'>
                    <Form.Control
                        autoFocus
                        type='text'
                        placeholder='Enter first name'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className='w-100 mb-2' controlId='lastName'>
                    <Form.Control
                        autoFocus
                        type='text'
                        placeholder='Enter last name'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className='w-100 mb-2' controlId='email'>
                    <Form.Control
                        autoFocus
                        type='email'
                        placeholder='Enter email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className='w-100 mb-2' controlId='password'>
                    <Form.Control
                        autoFocus
                        type='password'
                        placeholder='Enter password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className='w-100 mb-2' controlId='birth'>
                    <Form.Control
                        autoFocus
                        type='date'
                        placeholder='Choose birth'
                        name='birth'
                        value={formData.birth}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Check className='w-100 m-4' type='checkbox' label={`I'm a Trainer!`} />

                <Button className='w-100 mb-2' block type='submit' disabled={!validateForm()}>
                    Register
                </Button>

                <Button className='w-100' onClick={moveToLoginPage}>
                    back
                </Button>
            </Form>
        </div>
    );
}

export default Register;
