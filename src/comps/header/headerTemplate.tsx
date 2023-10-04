import React from 'react'
import './header.scss'
import {Navigation} from "../navigation/navigation";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/logo.png';
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

export const HeaderTemplate: React.FC = (props) => {
    const navigate = useNavigate();

    return <div>
        <Navbar className="header p-3" expand="sm">
            <Container>
                <div className='img_container' onClick={() => {navigate('/')}}>
                    <img src={Logo}/>
                </div>
                <Navigation/>
            </Container>
        </Navbar>
    </div>
};