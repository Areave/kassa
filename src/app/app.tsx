import React, {useEffect, useState} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, useNavigate} from "react-router";
import AuthPage from "../pages/authPage/authPage";
import apiService from "../utils/apiService";
import KassaPage from "../pages/kassaPage/kassaPage";
import LoadingPage from "../pages/loadingPage/loadingPage";

const App: React.FC<any> = () => {

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [currency, setCurrency] = useState('');
    const [sessionInfo, setSessionInfo] = useState({
        terminalNumber: '',
        clientName: '',
        items: [],
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const urlParam = new URLSearchParams(window.location.search);
    let sid = urlParam.get('token_key');
    if (!sid) {
        sid = '046fe6d41e3c243fae5f48b1b2edc5c7';
    }
    let apiUrl = urlParam.get('api_url');
    //TODO: поправить
    if (apiUrl) {
        apiUrl += '/';
    } else {
        apiUrl = 'https://api.dev.100czk.cz/api_v2/';
    }

    useEffect(() => {
        setIsLoading(true);
        apiService.getCollectionStatus(sid, apiUrl).then((res: any) => {
            setIsLoading(false);
            if (res.status === 'COLLECTION_ALREADY_OPENED') {
                setIsAuthorized(true);
            } else if (res.status === 'BAD_SESSION_KEY') {
                setError('Bad session key: ' + sid);
            } else if (res.data.opened) {
                setIsAuthorized(true);
                const sessionInfo = {
                    terminalNumber: res.data.kiosk,
                    clientName: res.data.user_id,
                    items: res.data.objects,
                };
                setSessionInfo(sessionInfo);
                if (res.data.objects?.length) {
                    setCurrency(res.data.objects[0].currency || '-');
                }
            }
        }).catch(error => {
            setError('error: ' + error.message);
        })
    }, []);

    return <React.StrictMode>
        {isLoading && <LoadingPage/>}
        {!isLoading && <Routes>
            {isAuthorized && <Route path='/*' element={<KassaPage
                sid={sid}
                apiUrl={apiUrl}
                sessionInfo={sessionInfo}
                currency={currency}
                isAuthorized={isAuthorized}
                setIsAuthorized={setIsAuthorized}/>}/>}
            {!isAuthorized && <Route path='/*' element={<AuthPage sid={sid}
                                                                  apiUrl={apiUrl}
                                                                  setSessionInfo={setSessionInfo}
                                                                  error={error}
                                                                  setError={setError}
                                                                  setCurrency={setCurrency}
                                                                  isAuthorized={isAuthorized}
                                                                  setIsAuthorized={setIsAuthorized}/>}/>}
        </Routes>}
    </React.StrictMode>
};

export default App;