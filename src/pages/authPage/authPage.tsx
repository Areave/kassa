import './authPage.scss'
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import apiService from "../../utils/apiService";
import LoadingPage from "../loadingPage/loadingPage";
import {useNavigate} from "react-router";
import ExitToTerminalButton from "../../comps/ExitToTerminalButton/ExitToTerminalButton";

const AuthPage = ({isAuthorized, setIsAuthorized, sid, setSessionInfo, setCurrency, apiUrl, error, setError, exit}: any) => {
    const [loginData, setFormData] = useState({username: '', password: ''});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        let data = loginData;
        if(!loginData.password && !loginData.username) {
            data = {username: 'xxxx', password: 'xxxx'}
        }
        apiService.startCollection(sid, apiUrl, data).then(res => {

            if (res.status === 'COLLECTION_ALREADY_OPENED') {
                setIsAuthorized(true);
            } else if (res.status === 'PARAMETER_NOT_FOUND') {
                setError('Incorrect login or password'
                    // + ', response: ' + JSON.stringify(res)
                );
                return;
            } else if (res.status !== 'OK') {
                setError(res.message
                    // + ', response: ' + JSON.stringify(res)
                );
                return;
            } else {
                const sessionInfo = {
                    terminalNumber: res.data.kiosk || '-',
                    clientName: res.data.user_id || '-',
                    items: res.data.objects || [],
                    // // @ts-ignore
                    // items: [],
                };
                if (res.data.objects.length) {
                    setCurrency(res.data.objects[0].currency);
                }
                setSessionInfo(sessionInfo);
                setIsAuthorized(true);
            }
        }).catch(e => {
            setError(e.message + ' catch')
        }).finally(() => {
            setIsLoading(false);
        })
    };
    const onUsernameChange = (event: any) => {
        setFormData({...loginData, username: event.target.value});
    };
    const onPasswordChange = (event: any) => {
        setFormData({...loginData, password: event.target.value});
    };

    return <div className="page auth-page">
        {isLoading && <LoadingPage/>}
        {!isLoading && <>

            <div className="login-form__wrapper">
                <div className='login-form__container'>
                    <Form className='login-form'>
                        <Form.Label className='form-label'>Login to start collection</Form.Label>
                        <Form.Group className="formLogin" controlId="formLogin">
                            <Form.Control defaultValue={loginData.username} type="text" placeholder="username" onChange={onUsernameChange}/>
                        </Form.Group>
                        <Form.Group className="formPassword" controlId="formPassword">
                            <Form.Control defaultValue={loginData.password} type="password" placeholder="password" onChange={onPasswordChange}/>
                        </Form.Group>
                        <div className="login-form__button-wrapper">
                            <button className='form-button'
                                    onClick={login}>
                                {'Start'}
                            </button>
                        </div>
                        <div className="error">{error}</div>
                    </Form>
                </div>
            </div>
        </>}
    </div>
};
export default AuthPage;
