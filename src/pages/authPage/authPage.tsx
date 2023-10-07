import './authPage.scss'
import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Loader from "../../comps/loader/loader";
import {useNavigate} from "react-router";
import apiService from "../../utils/apiService";
import DateAndTime from "../../comps/DateAndTime/DateAndTime";

const AuthPage = ({isAuthorized, setIsAuthorized, sid, setSessionInfo, setCurrency, apiUrl}: any) => {
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
        apiService.startCollection(sid, apiUrl, loginData).then(res => {

            if (res.status === 'COLLECTION_ALREADY_OPENED') {
                navigate('/main');
                setIsAuthorized(true);
                setIsLoading(false);
                return;
            }


            const sessionInfo = {
                terminalNumber: res.data.kiosk,
                clientName: res.data.user_id,
                items: res.data.objects,
                // @ts-ignore
                // items: [],
            };
            setSessionInfo(sessionInfo);
            if (res.data.objects.length) {
                setCurrency(res.data.objects[0].currency);
            }
            setIsLoading(false);
            setIsAuthorized(true);
            navigate('/main');
        }).catch(e => {
            setIsLoading(false);
            setError(e.message)
        });
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
                            <Form.Control type="password" placeholder="password" onChange={onPasswordChange}/>
                        </Form.Group>
                        <div className="login-form__button-wrapper">
                            <button className='form-button'
                                    onClick={login}>
                                {'Start'}
                            </button>
                        </div>
                        <div className="error">{error}</div>
                    </Form>
                )}
            </div>
        </div>
    </div>
};
export default AuthPage;
