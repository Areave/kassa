import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import AuthPage from "../pages/authPage/authPage";
import 'materialize-css'
import {useSelector} from "react-redux";
import {Types} from "../utils/types";
import LoadingPage from "../pages/loadingPage/loadingPage";


export const MyRouter = ({isAuthorized}: any) => {

    const isUserLoading: boolean = useSelector((state: Types.MainState) => {
        return state.user.isUserLoading;
    });

    if (isUserLoading) return <LoadingPage/>;
    return <>
        {/*{isAuthorized && <div className="action-buttons">*/}

        {/*    <ActionButton onClick={() => {*/}
        {/*    }} label={'Add'}/>*/}
        {/*</div>}*/}
        <Routes>
            {isAuthorized ? (
                <>

                </>
            ) : (
                <>
                    <Route path='/auth' element={<AuthPage/>}/>
                    <Route path='/*' element={isUserLoading ? <LoadingPage/> : <Navigate to={'/auth'}/>}/>
                </>
            )}
        </Routes>
    </>
};