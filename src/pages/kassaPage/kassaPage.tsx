import './kassaPage.scss'
import React, {useEffect, useState} from 'react';
import TableItem from "../../comps/TableItem/TableItem";
import {itemTypes} from "../../utils/itemTypes";
import {AddItemModal} from "../../comps/AddItemModal/addItemModal";
import {useNavigate} from "react-router";
import Header from "../../comps/header/header";

const KassaPage = (props: any) => {

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    // const {sessionInfo, items} = props;

    const {isAuthorized, setIsAuthorized} = props;

    const sessionInfo = {
        clientName: 'Mariana Karasyuk',
        terminalNumber: '213',
        actualBalance: 132455,
        plannedBalance: 234234,
        substractTotal: 34224,
        addTotal: 0
    };

    const items = [
        {
            name: 'Mary Jane',
            actualBalance: 112900,
            substract: 12000,
            add: 600,
            plannedBalance: 34689
        },
        {
            name: 'Peter Parker',
            actualBalance: 112900,
            substract: 12000,
            add: 600,
            plannedBalance: 34689
        },
        {
            name: 'Otto Octavius',
            actualBalance: 112900,
            substract: 12000,
            add: 600,
            plannedBalance: 34689
        },
    ];

    const openInputModal = () => {
        console.log('save');
        setShowModal(true);
    };
    const saveAndClose = () => {
        console.log('save');
        setIsAuthorized(false);
        navigate('/');
    };
    useEffect(() => {
        if (!isAuthorized) {
            navigate('/')
        }
    }, []);

    return <div className="page kassa-page">
        <AddItemModal showModal={showModal} closeModal={() => setShowModal(false)}/>

        <div className="content">
            <div className="info">
                <div className="info_operation">
                    <div className="info_operation_item info_operation__name">{sessionInfo.clientName + ','}</div>
                    <div className="info_operation_item info_operation__welcome">Welcome to Cash Collection Manager</div>
                    <div className="info_operation_item info_operation__terminal">{'Terminal: ' + sessionInfo.terminalNumber}</div>
                    <div className="info_operation_item info_operation__button-container">
                        <button className='info_operation__button' onClick={saveAndClose}>
                            save & close
                        </button>
                    </div>
                </div>
                <div className="info_money">
                    <div className="info_money__left">
                        <div className="info_money__left-balance balance info-item">
                            <div className="info_money_item_label">Actual balance</div>
                            <div className="info_money_item_value actual-balance">{sessionInfo.actualBalance + ' CZK'}</div>
                        </div>
                        <div className="info_money__left-total total info-item">
                            <div className="info_money_item_label">Substract total</div>
                            <div className="info_money_item_value substract">{sessionInfo.substractTotal + ' CZK'}</div>
                        </div>
                    </div>
                    <div className="info_money__right">
                        <div className="info_money__right-balance balance info-item">
                            <div className="info_money_item_label">Planned balance</div>
                            <div className="info_money_item_value planned-balance">{sessionInfo.plannedBalance + ' CZK'}</div>
                        </div>
                        <div className="info_money__right-tolal total info-item">
                            <div className="info_money_item_label">Add total</div>
                            <div className="info_money_item_value add">{sessionInfo.addTotal + ' CZK'}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="infotable">
                <div className="infotable_header">
                    <div className="item name">Name</div>
                    <div className="item actual-balance">Actual balance</div>
                    <div className="item substract">Substract</div>
                    <div className="item add">Add</div>
                    <div className="item planned-balance">Planned balance</div>
                </div>
                <div className="infotable_items">
                    {items.map((item: any, index: number) => <TableItem
                        key={index + item.name}
                        index={index}
                        name={item.name}
                        actualBalance={item.actualBalance}
                        substract={item.substract}
                        add={item.add}
                        openModal={openInputModal}
                        plannedBalance={item.plannedBalance}
                    />)}
                </div>
            </div>
        </div>

    </div>
};
export default KassaPage;
