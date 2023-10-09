import React from "react";
import './header.scss'
import {useNavigate} from "react-router";
import DateAndTime from "../DateAndTime/DateAndTime";
import apiService from "../../utils/apiService";

const Header = (props: any) => {

    const navigate = useNavigate();
    const {user, terminalNumber, setIsAuthorized, apiUrl, sid} = props;

    const exit = () => {
        apiService.goHome(apiUrl, sid);
        setIsAuthorized(false);
        navigate('/');
    };

    return <div className='header'>
        <button className='button terminal-home-button' onClick={exit}>
            Terminal home
        </button>
        <div className='data-container'>
            <div className="infostring">{user + ' ,'}</div>
            <DateAndTime/>
            <div className="number">{terminalNumber}</div>
        </div>
    </div>

};

export default Header;