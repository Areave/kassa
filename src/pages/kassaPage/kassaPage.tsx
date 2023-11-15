import './kassaPage.scss'
import React, {useEffect, useState} from 'react';
import TableItem from "../../comps/TableItem/TableItem";
import {SaveAndCloseModal} from "../../comps/SaveAndCloseModal/SaveAndCloseModal";
import Header from "../../comps/header/header";
import {Types} from "../../utils/types";
import ISessionInfo = Types.ISessionInfo;
import IItem = Types.IItem;
import ITotalInfo = Types.ITotalInfo;

const KassaPage = ({sessionInfo, sid, currency, isAuthorized, setIsAuthorized, apiUrl, exit}: any) => {

    const [showModal, setShowModal] = useState(false);
    const [isNoItemsState, setIsNoItemsState] = useState(false);
    const [isErrorState, setIsErrorState] = useState({});
    const [isError, setIsError] = useState(false);
    const [dataToSend, setDataToSend] = useState([]);
    const [totalInfo, setTotalInfo] = useState({
        actualBalance: 0,
        plannedBalance: 0,
        cash_out_total: 0,
        cash_in_total: 0,
        taken_total: 0
    });

    const openInputModal = () => {
        if (Object.values(isErrorState).includes(true)) {
            return;
        }
        setShowModal(true);
    };

    const createDataToSendFromSessionInfo = (sessionInfo: ISessionInfo) => {
        const dataToSend: IItem[] = [];
        sessionInfo.items.forEach((item: any) => {
            const dataObjectToSend = {
                id: item.id,
                old_sum: item.old_sum,
                cash_in: item.cash_in,
                cash_out: item.cash_out,
                taken: item.taken,
            };
            dataToSend.push(dataObjectToSend);
        });
        return dataToSend;
    };
    const createTotalInfoFromItemsArray = (itemsArray: IItem[]) => {
        const totalInfo: ITotalInfo = {
            actualBalance: 0,
            plannedBalance: 0,
            cash_out_total: 0,
            cash_in_total: 0,
            taken_total: 0
        };
        itemsArray.forEach((item: any) => {
            totalInfo.actualBalance = totalInfo.actualBalance + item.old_sum;
            totalInfo.plannedBalance = +(totalInfo.plannedBalance + item.old_sum - item.cash_out + item.cash_in).toFixed(2);
            totalInfo.cash_out_total = +(totalInfo.cash_out_total + item.cash_out).toFixed(2);
            totalInfo.cash_in_total = +(totalInfo.cash_in_total + item.cash_in).toFixed(2);
            totalInfo.taken_total = +(totalInfo.taken_total + (item.cash_out - item.cash_in)).toFixed(2);
        });
        return totalInfo;
    };

    useEffect(() => {
        if (sessionInfo.items?.length) {
            setTotalInfo(createTotalInfoFromItemsArray(sessionInfo.items));
            setDataToSend(createDataToSendFromSessionInfo(sessionInfo));
            setIsNoItemsState(false);
        } else {
            setIsNoItemsState(true);
        }
    }, [sessionInfo]);

    useEffect(() => {
        setTotalInfo(createTotalInfoFromItemsArray(dataToSend))
    }, [dataToSend]);

    useEffect(() => {
        // let isError = false;
        // Object.values(isErrorState).includes('true');
        setIsError(Object.values(isErrorState).includes(true))
    }, [isErrorState]);

    return <div className="page kassa-page">
        <SaveAndCloseModal sid={sid}
                           apiUrl={apiUrl}
                           exit={exit}
                           dataToSend={dataToSend}
                           showModal={showModal}
                           closeModal={() => setShowModal(false)}
                           isNoItemsState={isNoItemsState}
                           setIsAuthorized={setIsAuthorized}/>
        <Header user={sessionInfo.clientName} terminalNumber={sessionInfo.terminalNumber} setIsAuthorized={setIsAuthorized} apiUrl={apiUrl} sid={sid} exit={exit}/>
        <div className="content">
            <div className="info">
                <div className="info_operation">
                    <div className="info_operation_item info_operation__name">{sessionInfo.clientName + ','}</div>
                    <div className="info_operation_item info_operation__welcome">Welcome to Cash Collection Manager</div>
                    <div className="info_operation_item info_operation__terminal">{'Terminal: ' + sessionInfo.terminalNumber}</div>
                    <div className="info_operation_item info_operation__button-container">
                        <button className={`info_operation__button ' + ${isError ? 'error' : ''}`} onClick={openInputModal}>
                            {isNoItemsState ? 'Close' : isError ? 'Planned balance ERROR' : 'Save & close'}
                        </button>
                    </div>
                </div>
                <div className="info_money">
                    <div className="info_money__left-left">
                        <div className="info_money__left-balance balance info-item">

                        </div>
                        <div className="info_money__left-total total info-item">
                            <div className="info_money_item_label">Taken TOTAL:</div>
                            <div className="info_money_item_value taken">{isNoItemsState ? '-' : totalInfo.taken_total + ' ' + currency}</div>
                        </div>
                    </div>
                    <div className="info_money__left">
                        <div className="info_money__left-balance balance info-item">
                            <div className="info_money_item_label">Actual balance</div>
                            <div
                                className="info_money_item_value actual-balance">{isNoItemsState ? '-' : totalInfo.actualBalance + ' ' + currency}</div>
                        </div>
                        <div className="info_money__left-total total info-item">
                            <div className="info_money_item_label">Cash OUT TOTAL:</div>
                            <div className="info_money_item_value substract">{isNoItemsState ? '-' : totalInfo.cash_out_total + ' ' + currency}</div>
                        </div>
                    </div>
                    <div className="info_money__right">
                        <div className="info_money__right-balance balance info-item">
                            <div className="info_money_item_label">Planned balance</div>
                            <div
                                className="info_money_item_value planned-balance">{isNoItemsState ? '-' : totalInfo.plannedBalance + ' ' + currency}</div>
                        </div>
                        <div className="info_money__right-tolal total info-item">
                            <div className="info_money_item_label">Cash IN - TOTAL:</div>
                            <div className="info_money_item_value add">{isNoItemsState ? '-' : totalInfo.cash_in_total + ' ' + currency}</div>
                        </div>
                    </div>
                </div>
            </div>
            {isNoItemsState && <div className='no_data'>no data</div>}
            {!isNoItemsState && <div className="infotable">
                <div className="infotable_header">
                    <div className="item name">Name</div>
                    <div className="item actual-balance">Actual balance</div>
                    <div className="item substract">Cash OUT</div>
                    <div className="item add">Cash IN</div>
                    <div className="item taken">Taken</div>
                    <div className="item planned-balance">Planned balance</div>
                </div>
                <div className="infotable_items">
                    {sessionInfo.items.map((item: any, index: number) => {
                        const tableItemData = {
                            id: item.id,
                            name: item.name,
                            actualBalance: item.old_sum,
                            plannedBalance: +(item.old_sum - item.cash_out + item.cash_in).toFixed(2),
                            cash_out: item.cash_out,
                            cash_in: item.cash_in,
                            taken: item.cash_out - item.cash_in,
                            old_sum: item.old_sum
                        };
                        return <TableItem
                            key={item.id + '' + index + item.id}
                            index={index}
                            isErrorState={isErrorState}
                            setIsErrorState={setIsErrorState}
                            tableItemData={tableItemData}
                            dataToSend={dataToSend}
                            setDataToSend={setDataToSend}/>
                    })}
                </div>
            </div>}
            {isError && <div className="table-error">Planned balance can not be negative</div>}
        </div>
    </div>
};
export default KassaPage;
