import './kassaPage.scss'
import React, {useEffect, useState} from 'react';
import TableItem from "../../comps/TableItem/TableItem";
import {itemTypes} from "../../utils/itemTypes";
import {AddItemModal} from "../../comps/AddItemModal/addItemModal";
import {useNavigate} from "react-router";
import Header from "../../comps/header/header";
import {totalmem} from "os";

const KassaPage = (props: any) => {

    const [showModal, setShowModal] = useState(false);
    const [dataToSend, setDataToSend] = useState([]);
    const [totalInfo, setTotalInfo] = useState({
        actualBalance: 0,
        plannedBalance: 0,
        substractTotal: 0,
        addTotal: 0

    });

    const navigate = useNavigate();

    const {sessionInfo, sid, currency, isAuthorized, setIsAuthorized} = props;

    const openInputModal = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (!isAuthorized) {
            navigate('/')
        }
    }, []);

    useEffect(() => {
        const tempTotalInfo = {
            actualBalance: 0,
            plannedBalance: 0,
            substractTotal: 0,
            addTotal: 0
        };
        const dataToSend: any[] = [];

        if (sessionInfo.items?.length) {

            sessionInfo.items.forEach((item: any) => {
                tempTotalInfo.actualBalance += item.old_sum;
                tempTotalInfo.plannedBalance += item.old_sum - item.cash_out + item.cash_in;
                tempTotalInfo.substractTotal += item.cash_out;
                tempTotalInfo.addTotal += item.cash_in;

                const dataObjectToSend = {
                    id: item.id,
                    old_sum: item.old_sum,
                    cash_in: item.cash_in,
                    cash_out: item.cash_out
                };

                dataToSend.push(dataObjectToSend);
            });

            setTotalInfo(tempTotalInfo);
            setDataToSend(dataToSend);
        }
    }, [sessionInfo]);

    useEffect(() => {
        const tempTotalInfo: any = {
            plannedBalance: 0,
            substractTotal: 0,
            addTotal: 0
        };
        dataToSend.forEach((item: any) => {
            tempTotalInfo.plannedBalance += item.old_sum - item.cash_out + item.cash_in;
            tempTotalInfo.substractTotal += item.cash_out;
            tempTotalInfo.addTotal += item.cash_in;
            setTotalInfo({...totalInfo, ...tempTotalInfo});
        });

    }, [dataToSend]);

    return <div className="page kassa-page">
        <AddItemModal sid={sid}
                      dataToSend={dataToSend}
                      showModal={showModal}
                      closeModal={() => setShowModal(false)}
                      setIsAuthorized={setIsAuthorized}/>
        <Header user={sessionInfo.clientName} terminalNumber={sessionInfo.terminalNumber} setIsAuthorized={setIsAuthorized}/>
        <div className="content">
            <div className="info">
                <div className="info_operation">
                    <div className="info_operation_item info_operation__name">{sessionInfo.clientName + ','}</div>
                    <div className="info_operation_item info_operation__welcome">Welcome to Cash Collection Manager</div>
                    <div className="info_operation_item info_operation__terminal">{'Terminal: ' + sessionInfo.terminalNumber}</div>
                    <div className="info_operation_item info_operation__button-container">
                        <button className='info_operation__button' onClick={openInputModal}>
                            save & close
                        </button>
                    </div>
                </div>
                <div className="info_money">
                    <div className="info_money__left">
                        <div className="info_money__left-balance balance info-item">
                            <div className="info_money_item_label">Actual balance</div>
                            <div className="info_money_item_value actual-balance">{totalInfo.actualBalance + ' ' + currency}</div>
                        </div>
                        <div className="info_money__left-total total info-item">
                            <div className="info_money_item_label">Cash OUT TOTAL:</div>
                            <div className="info_money_item_value substract">{totalInfo.substractTotal + ' ' + currency}</div>
                        </div>
                    </div>
                    <div className="info_money__right">
                        <div className="info_money__right-balance balance info-item">
                            <div className="info_money_item_label">Planned balance</div>
                            <div className="info_money_item_value planned-balance">{totalInfo.plannedBalance + ' ' + currency}</div>
                        </div>
                        <div className="info_money__right-tolal total info-item">
                            <div className="info_money_item_label">Cash IN - TOTAL:</div>
                            <div className="info_money_item_value add">{totalInfo.addTotal + ' ' + currency}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="infotable">
                <div className="infotable_header">
                    <div className="item name">Name</div>
                    <div className="item actual-balance">Actual balance</div>
                    <div className="item substract">Cash OUT</div>
                    <div className="item add">Cash IN</div>
                    <div className="item planned-balance">Planned balance</div>
                </div>
                <div className="infotable_items">
                    {sessionInfo.items.map((item: any, index: number) => {
                        const tableItemData = {
                            id: item.id,
                            name: item.name,
                            actualBalance: item.old_sum,
                            plannedBalance: item.old_sum - item.cash_out + item.cash_in,
                            substract: item.cash_out,
                            add: item.cash_in,
                            old_sum: item.old_sum
                        };
                        return <TableItem
                            key={index + item.id}
                            index={index}
                            tableItemData={tableItemData}
                            dataToSend={dataToSend}
                            setDataToSend={setDataToSend}/>
                    })}
                </div>
            </div>
        </div>

    </div>
};
export default KassaPage;
