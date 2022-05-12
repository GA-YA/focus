import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { POSTlogin } from '../../common/api/login';
import { useConnectedUserId } from '../../common/hooks/auth';
import Register from '../register/Register';

function Login({ setToken }) {
    const formComp = useRef(null);
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { setConnectedUser } = useConnectedUserId();

    async function handleSubmit(event) {
        event.preventDefault();
        formComp.current.reset();
        const res = await POSTlogin(formData);
        if (res.status === 200) {
            const user = res.data;
            setConnectedUser(user?._id);
            setToken(user?.token);
        } else {
            res.status === 400 ? window.alert('user or password incorrect') : window.alert('somthing went wrong');
        }
    }

    function handleChagne() {
        const form = new FormData(formComp.current);
        let email = form.get('email');
        let password = form.get('password');
        setFormData({ email, password });
    }

    function validateForm() {
        return formData.email.length > 0 && formData.password.length > 0;
    }

    function moveRegisterPage() {
        setIsRegister(true);
    }

    return (
        <Container>
            {!isRegister ? (
                <div className='card w-25 bg-light p-3 h-auto position-absolute top-50 start-50 translate-middle'>
                    <Form className='card-body' onSubmit={handleSubmit} ref={formComp}>
                        <h2 className='card-title text-center mb-4 fw-bold'>Log in to Focus</h2>

                        <Form.Group className='w-100 mb-2' controlId='email'>
                            <Form.Control
                                autoFocus
                                type='email'
                                placeholder='Enter email'
                                name='email'
                                value={formData.email}
                                onChange={handleChagne}
                            />
                        </Form.Group>

                        <Form.Group className='w-100 mb-4' controlId='password'>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                name='password'
                                value={formData.password}
                                onChange={handleChagne}
                            />
                        </Form.Group>

                        <div className='text-center'>
                            <Button className='w-100 mb-2' block type='submit' disabled={!validateForm()}>
                                Login
                            </Button>
                        </div>

                        <div className='text-center'>
                            <Button className='w-100' onClick={moveRegisterPage}>
                                Register
                            </Button>
                        </div>
                    </Form>
                </div>
            ) : (
                <Register setIsRegister={setIsRegister} setConnectedUser={setConnectedUser} setToken={setToken} />
            )}
        </Container>
    );
}

export default Login;
