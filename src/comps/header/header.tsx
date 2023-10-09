import React from "react";
import './header.scss'
import DateAndTime from "../DateAndTime/DateAndTime";
import ExitToTerminalButton from "../ExitToTerminalButton/ExitToTerminalButton";

const Header = (props: any) => {

    const {user, terminalNumber, exit} = props;

    return <div className='header'>
        <ExitToTerminalButton exit={exit}/>
        <div className='data-container'>
            <div className="infostring">{user + ' ,'}</div>
            <DateAndTime/>
            <div className="number">{terminalNumber}</div>
        </div>
    </div>

};

export default Header;