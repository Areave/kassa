import React from "react";
import './header.scss'
import {useNavigate} from "react-router";

const Header = (props: any) => {

    const setIsAuthorized = props.setIsAuthorized;
    const navigate = useNavigate();
    // const {user, data, time, number, isAuthorized} = props;
    const user = 'User';
    const data = '2023.12.03';
    const time = '17:59:03';
    const number = 1894;
    const isAuthorized = true;
    const infoString = [user, data, time].join(', ');

    const exit = () => {
        setIsAuthorized(false);
        navigate('/');
    };

    return <div className='header'>
        <button className='button terminal-home-button' onClick={exit}>
            Terminal home
        </button>
        {isAuthorized && <div className='data-container'>
            <div className="infostring">{infoString}</div>
            <div className="number">{number}</div>
        </div>}
    </div>

};

export default Header;