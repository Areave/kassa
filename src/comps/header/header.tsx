import React from "react";
import './header.scss'
import {useNavigate} from "react-router";

const Header = (props: any) => {

    const navigate = useNavigate();
    const {user, terminalNumber, setIsAuthorized} = props;
    // const user = 'User';
    const data = '2023.12.03';
    const time = '17:59:03';
    const infoString = [user, data, time].join(', ');

    const exit = () => {
        setIsAuthorized(false);
        navigate('/');
    };

    return <div className='header'>
        <button className='button terminal-home-button' onClick={exit}>
            Terminal home
        </button>
        <div className='data-container'>
            <div className="infostring">{infoString}</div>
            <div className="number">{terminalNumber}</div>
        </div>
    </div>

};

export default Header;