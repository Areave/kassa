import './authPage.scss'
import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
// import LoginForm from "../../comps/LoginForm/loginForm";
import Loader from "../../comps/loader/loader";
import {useNavigate} from "react-router";
import apiService from "../../utils/apiService";
// import TableItem from "../../comps/actionButton/actionButton";

const AuthPage = ({isAuthorized, setIsAuthorized, sid}: any) => {
    const [formData, setFormData] = useState({login: '', password: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginError = () => {
        event.preventDefault();
        if (!error) {
            setError('Wrong login or password, try again');
        } else {
            setError('');
        }
    };
    const login = (event: any) => {
        event.preventDefault();
        console.log(formData);
        setIsLoading(true);
        // const loginData = formData;
        const loginData = {
            'username': 'demon2',
            'password': '1234'
        };
        apiService.startCollection(sid, loginData).then(res => {
            console.log(res);
            setIsLoading(false);
            setIsAuthorized(true);
            navigate('/main');
        }).catch(console.log);

        // setTimeout(()=>{
        //     setIsLoading(false);
        //     setIsAuthorized(true);
        //     // navigate('/main');
        // }, 1000)
        // const loginData = {
        //     login: 'joe',
        //     password: '1234'
        // };
        // dispatch(fetchLogin(loginData));
    };
    const onLoginChange = (event: any) => {
        setFormData({...formData, login: event.target.value});
    };
    const onPasswordChange = (event: any) => {
        setFormData({...formData, password: event.target.value});
    };

    useEffect(() => {
        if (isAuthorized) {
            navigate('/a')
        }
    }, []);

    return <div className="page auth-page">
        <div className="login-form__wrapper">
            <div className='login-form__container'>
                {isLoading ? (<Loader/>) : (
                    <Form className='login-form'>
                        <Form.Label className='form-label'>Login to start collection</Form.Label>
                        <Form.Group className="formLogin" controlId="formLogin">
                            <Form.Control type="text" placeholder="username" onChange={onLoginChange}/>
                        </Form.Group>
                        <Form.Group className="formPassword" controlId="formPassword">
                            {/*<Form.Label>Password</Form.Label>*/}
                            <Form.Control type="password" placeholder="password" onChange={onPasswordChange}/>
                        </Form.Group>
                        {/*<div className="">*/}
                        {/*    <input type="text" placeholder="username" onChange={onLoginChange}/>*/}
                        {/*    <input type="text" placeholder="username" onChange={onLoginChange}/>*/}
                        {/*</div>*/}
                        <div className="login-form__button-wrapper">
                            {/*<TableItem className='mb-3' onClick={login} label={'start'}/>*/}

                            <button className='form-button'
                                    onClick={login}>
                                {'start'}
                            </button>
                            <button className='form-button'
                                    onClick={loginError}>
                                {'login error'}
                            </button>
                            {/*<TableItem onClick={register} label={'register'}/>*/}
                        </div>
                        <div className="error">{error}</div>
                    </Form>
                )}
            </div>
        </div>
    </div>
};
export default AuthPage;
