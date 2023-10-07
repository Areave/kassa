import React, {useEffect, useState} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    const [isLoading, setIsLoading] = useState(false);

    const urlParam = new URLSearchParams(window.location.search);
    let sid = urlParam.get('token_key');
    if (!sid) {
        sid = 'eaebe17f67cae519b26146140acea3d7';
    }
    let apiUrl = urlParam.get('api_url');
    if (apiUrl) {
        apiUrl += '/';
    } else {
        apiUrl = 'https://api.dev.100czk.cz/api_v2/';
    }


    const navigate = useNavigate();
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        apiService.getCollectionStatus(sid, apiUrl).then((res: any) => {
            console.log(res);
            setTimeout(() => {
                setIsLoading(false);
                setIsAuthorized(res.data.opened);
                if (res.data.opened) {

                    // res.data.objects = res.data.objects
                    //     .concat(res.data.objects)
                    //     .concat(res.data.objects)
                    //     .concat(res.data.objects)
                    //     .concat(res.data.objects);


                    const sessionInfo = {
                        terminalNumber: res.data.kiosk,
                        clientName: res.data.user_id,
                        items: res.data.objects,
                    };
                    setSessionInfo(sessionInfo);
                    if (res.data.objects && res.data.objects.length) {
                        setCurrency(res.data.objects[0].currency);
                    }
                } else if (res.status === 'COLLECTION_ALREADY_OPENED') {
                    navigate('/main')
                }
            }, 1000);
        });
    }, []);

    return <React.StrictMode>
        {isLoading && <LoadingPage/>}
        {!isLoading && <Routes>
            {isAuthorized && <Route path='/*' element={<KassaPage
                objects={objects}
                sid={sid}
                apiUrl={apiUrl}
                sessionInfo={sessionInfo}
                currency={currency}
                isAuthorized={isAuthorized}
                setIsAuthorized={setIsAuthorized}/>}/>}
            {!isAuthorized && <Route path='/*' element={<AuthPage sid={sid}
                                                                  apiUrl={apiUrl}
                                                                  setSessionInfo={setSessionInfo}
                                                                  setCurrency={setCurrency}
                                                                  isAuthorized={isAuthorized}
                                                                  setIsAuthorized={setIsAuthorized}/>}/>}
        </Routes>}
    </React.StrictMode>
};

export default App;