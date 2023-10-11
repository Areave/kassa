import React, {useEffect, useState} from 'react'
import './ExitToTerminalButton.scss'
import Loader from "../loader/loader";

const ExitToTerminalButton = ({exit, isGoHomeLoading}: any) => {

    return <button className={isGoHomeLoading ? 'exit-to-terminal-button loading' : 'exit-to-terminal-button'} onClick={exit}>
        {isGoHomeLoading && <Loader/>}
        {!isGoHomeLoading && 'Terminal Home'}
    </button>
};

export default ExitToTerminalButton;