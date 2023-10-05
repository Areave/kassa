import React, {useEffect, useState} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Navigate, Route, Routes} from "react-router";
import AuthPage from "../pages/authPage/authPage";
import apiService from "../utils/apiService";
import KassaPage from "../pages/kassaPage/kassaPage";
import LoadingPage from "../pages/loadingPage/loadingPage";

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

    useEffect(() => {
        // setIsLoading(true);
        apiService.getCollectionStatus(sid).then((res: any) => {
            setTimeout(() => {
                // setIsLoading(false);
                // setIsAuthorized(res.open);
                // setKioskNumber(res.kiosk);
                setIsLoading(false);
                setIsAuthorized(true);
                setKioskNumber('00250');
            }, 1000);
        });
    }, []);


    return <React.StrictMode>
        {isLoading && <LoadingPage/>}
        {!isLoading && <Routes>
            {isAuthorized && <Route path='/main' element={<KassaPage isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>}/>}
            {!isAuthorized && <Route path='/' element={<AuthPage isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>}/>}
        </Routes>}
    </React.StrictMode>
};

export default App;