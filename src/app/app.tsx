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
    const [currency, setCurrency] = useState('-');
    const [sessionInfo, setSessionInfo] = useState({
        terminalNumber: '',
        clientName: '',
        items: [],
    });
    const [isLoading, setIsLoading] = useState(false);

    // const messages: Types.Message[] = useSelector((state: Types.MainState) => {
    //     return state.messages.messages;
    // });

    const urlParam = new URLSearchParams(window.location.search);
    let sid = urlParam.get('token');
    if (!sid) {
        sid = '46e3d2c1311bcb307b58c5005d00fe8e';
    }
    const navigate = useNavigate();
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        apiService.getCollectionStatus(sid).then((res: any) => {
            console.log(res);
            setTimeout(() => {
                setIsLoading(false);
                setIsAuthorized(res.data.opened);
                if (res.data.opened) {
                    const sessionInfo = {
                        terminalNumber: res.data.kiosk,
                        clientName: res.data.user_id,
                        items: res.data.objects,
                    };
                    // sessionInfo.items = [
                    //     {
                    //         cash_in: 1,
                    //         cash_out: 1,
                    //         currency: "CZK",
                    //         id: 5,
                    //         name: "Oksjdfnk Nlwkf ",
                    //         old_sum: 1
                    //     }, {
                    //         cash_in: 2,
                    //         cash_out: 2,
                    //         currency: "CZK",
                    //         id: 6,
                    //         name: "Pkksjdnl Rlskl ",
                    //         old_sum: 2
                    //     }
                    //     {
                    //     cash_in: 1150,
                    //     cash_out: 900,
                    //     currency: "CZK",
                    //     id: 6,
                    //     name: "Oksjdfnk Nlwkf ",
                    //     old_sum: 550
                    // }, {
                    //     cash_in: 15,
                    //     cash_out: 9,
                    //     currency: "CZK",
                    //     id: 6,
                    //     name: "Pkksjdnl Rlskl ",
                    //     old_sum: 1250
                    // }

                    // , {
                    //     cash_in: 6456456456,
                    //     cash_out: 5,
                    //     currency: "CZK",
                    //     id: 6,
                    //     name: "Oksjdfnk Nlwkf Uksjdfksksdbksdbksd",
                    //     old_sum: 2342344324
                    // }, {
                    //     cash_in: 0,
                    //     cash_out: 0,
                    //     currency: "CZK",
                    //     id: 8,
                    //     name: "000200",
                    //     old_sum: 50
                    // }
                    // ];
                    setSessionInfo(sessionInfo);
                    if (res.data.objects.length) {
                        setCurrency(res.data.objects[0].currency);
                    }
                }
                // setIsAuthorized(true);
            }, 1000);
        });
    }, []);


    return <React.StrictMode>
        {isLoading && <LoadingPage/>}
        {!isLoading && <Routes>
            {isAuthorized && <Route path='/*' element={<KassaPage
                objects={objects}
                sid={sid}
                sessionInfo={sessionInfo}
                currency={currency}
                isAuthorized={isAuthorized}
                setIsAuthorized={setIsAuthorized}/>}/>}
            {!isAuthorized && <Route path='/*' element={<AuthPage sid={sid}
                                                                  setSessionInfo={setSessionInfo}
                                                                  setCurrency={setCurrency}
                                                                  isAuthorized={isAuthorized}
                                                                  setIsAuthorized={setIsAuthorized}/>}/>}
        </Routes>}
    </React.StrictMode>
};

export default App;