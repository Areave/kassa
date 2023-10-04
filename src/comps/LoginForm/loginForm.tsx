import React from "react";
import {LoginFormTemplate} from "./loginFormTemplate";
import apiService from "../../utils/apiService";
import {setIsAuthorizedAction} from "../../utils/store/actionCreators";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {fetchLogin} from "../../utils/store/asyncThunks";
import Loader from "../loader/loader";
import Form from "react-bootstrap/Form";
import ActionButton from "../actionButton/actionButton";

const LoginForm = (props?: any) => {

    // const dispatch = useDispatch();
    const [formData, setFormData] = useState({login: '', password: ''});
    const [isLoading, setIsLoading] = useState(false);

    const login = (event: any) => {
        event.preventDefault();
        console.log(formData);
        setIsLoading(true);

        setTimeout(()=>{
            setIsLoading(false);
        }, 1000)
        // const loginData = {
        //     login: 'joe',
        //     password: '1234'
        // };
        // dispatch(fetchLogin(loginData));
    };

    // const register = (event: any) => {
    //     event.preventDefault();
    //     apiService.logout().then(res => {
    //         dispatch(setIsAuthorizedAction(false));
    //     });
    // };

    const onEmailChange = (event:any) => {
        setFormData({...formData, login: event.target.value});
    };
    const onPasswordChange = (event:any) => {
        setFormData({...formData, password: event.target.value});
    };

    // props = {...props, login, register, onEmailChange, onPasswordChange, isLoading};

    return <div className='login-form__container'>
        {isLoading ? ( <Loader/>) : (
            <Form className='login-form'>
                <Form.Label className='w-100 fs-2 text-center fw-bolder'>Login to start collection</Form.Label>
                <Form.Group className="mb-3" controlId="formLogin">
                    <Form.Control type="text" placeholder="login" onChange={onEmailChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    {/*<Form.Label>Password</Form.Label>*/}
                    <Form.Control type="password" placeholder="password" onChange={onPasswordChange}/>
                </Form.Group>
                <div className="login-form__button-wrapper">
                    <ActionButton className='mb-3' onClick={login} label={'start'}/>
                    {/*<ActionButton onClick={register} label={'register'}/>*/}
                </div>
            </Form>
        )}
    </div>
};

export default LoginForm;