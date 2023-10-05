import React, {useEffect, useState} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Navigate, Route, Routes, useNavigate} from "react-router";
import AuthPage from "../pages/authPage/authPage";
import apiService from "../utils/apiService";
import KassaPage from "../pages/kassaPage/kassaPage";
import LoadingPage from "../pages/loadingPage/loadingPage";
import Header from "../comps/header/header";

const App: React.FC<any> = () => {

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [kioskNumber, setKioskNumber] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // const messages: Types.Message[] = useSelector((state: Types.MainState) => {
    //     return state.messages.messages;
    // });

    const urlParam = new URLSearchParams(window.location.search);
    // const sid = urlParam.get('sid');
    const sid = '6b781ce68f71070d52cd417197310a23';
    const navigate = useNavigate();

    useEffect(() => {
        // setIsLoading(true);
        apiService.getCollectionStatus(sid).then((res: any) => {
            console.log(res);
            setTimeout(() => {
                setIsLoading(false);
                // setIsAuthorized(res.data.opened);
                setIsAuthorized(true);
                setKioskNumber(res.data.kiosk);
                // if (isAuthorized) {
                //     navigate('/main')
                // } else {
                //     navigate('/')
                // }
                // setIsLoading(false);
                // setIsAuthorized(true);
                // setKioskNumber('00250');
                // navigate('/main')
            }, 1000);
        });
    }, []);


    return <React.StrictMode>
        {isLoading && <LoadingPage/>}
        {isAuthorized && <Header setIsAuthorized={setIsAuthorized} />}
        {!isLoading && <Routes>
            {isAuthorized && <Route path='/' element={<KassaPage isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>}/>}
            {!isAuthorized && <Route path='/' element={<AuthPage isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>}/>}
        </Routes>}
    </React.StrictMode>
};

export default App;