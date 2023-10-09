import React, {useEffect, useState} from 'react'
import './ExitToTerminalButton.scss'

const ExitToTerminalButton = ({exit}: any) => {

    return <button className='exit-to-terminal-button' onClick={exit}>
        Terminal home
    </button>
};

export default ExitToTerminalButton;