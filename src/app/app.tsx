import React, {useEffect, useState} from "react";
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useDispatch, useSelector} from 'react-redux'
import {MyRouter} from "../comps/myRouter";
import Header from "../comps/header/header";
import {Footer} from "../comps/footer/footer";
import {Types} from "../utils/types";
import LoadingPage from "../pages/loadingPage/loadingPage";
import {ToastContainer} from "../comps/ToastContainer/toastContainer";
import {fetchItems, fetchUser} from "../utils/store/asyncThunks";
import {getCreateSetItemsActionByType} from "../utils/store/actionCreators";
import {itemTypes} from "../utils/itemTypes";
import {Navigate, Route, Routes} from "react-router";
import {MealsPage} from "../pages/ItemsPage/mealsPage";
import {DishesPage} from "../pages/ItemsPage/dishesPage";
import {ProductsPage} from "../pages/ItemsPage/productsPage";
import AuthPage from "../pages/authPage/authPage";
import apiService from "../utils/apiService";
import KassaPage from "../pages/kassaPage/kassaPage";

const App: React.FC<any> = () => {

    const dispatch = useDispatch();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [token, setToken] = useState('');
    // const isUserLoading: boolean = useSelector((state: Types.MainState) => {
    //     return state.user.isUserLoading;
    // });
    const messages: Types.Message[] = useSelector((state: Types.MainState) => {
        return state.messages.messages;
    });

    const urlParam = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (!token) {
            if (urlParam.has('token_key')) {
                setToken(urlParam.get('token_key'));
            } else {
                apiService.authRequest().then((res: any) => {
                    setToken(res.sid);
                });
            }
        }
    }, []);


    useEffect(() => {
        // console.log('token heere hook')
        if (token) {
            // apiService.dataRequest(token).then((data: any) => {
            //     console.log(data)
            // });
        }
    }, [token]);


    useEffect(() => {
        if (!isAuthorized) {
            // dispatch(fetchItems(itemTypes.PRODUCT, getCreateSetItemsActionByType(itemTypes.PRODUCT)));
            // dispatch(fetchItems(itemTypes.DISH, getCreateSetItemsActionByType(itemTypes.DISH)));
            // dispatch(fetchItems(itemTypes.MEAL, getCreateSetItemsActionByType(itemTypes.MEAL)));
        }

    }, [isAuthorized]);

    return <React.StrictMode>
        <Header setIsAuthorized={setIsAuthorized} />
        {/*<ToastContainer messages={messages}/>*/}
        {/*{isUserLoading ? (*/}
        {/*    <LoadingPage/>*/}
        {/*) : (<>*/}
        <Routes>
            {isAuthorized && <Route path='/main' element={<KassaPage isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />}/>}
            {!isAuthorized && <Route path='/' element={<AuthPage isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}/>}/>}
            {/*{isAuthorized ? (*/}
            {/*    <>*/}
            {/*        <Route path='/' element={<MealsPage/>}/>*/}
            {/*        <Route path='/dishes' element={<DishesPage/>}/>*/}
            {/*        <Route path='/products' element={<ProductsPage/>}/>*/}
            {/*        <Route path='/*' element={<Navigate to={'/'}/>}/>*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*    <>*/}
            {/*        <Route path='/auth' element={<AuthPage/>}/>*/}
            {/*        <Route path='/*' element={isUserLoading ? <LoadingPage/> : <Navigate to={'/auth'}/>}/>*/}
            {/*    </>*/}
            {/*)}*/}
        </Routes>
        {/*    </>*/}
        {/*)}*/}
        {/*<Footer/>*/}
    </React.StrictMode>
};

export default App;