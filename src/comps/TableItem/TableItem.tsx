import React, {useEffect, useState} from 'react'
import './TableItem.scss'
import {Types} from '../../utils/types'
import Form from "react-bootstrap/Form";

const TableItem = ({tableItemData, index, setDataToSend, dataToSend, setIsErrorState, isErrorState}: any) => {

    const [localTableItemData, setLocalTableItemData] = useState(tableItemData);
    const [isLocalErrorState, setIsLocalErrorState] = useState(false);
    const colorClass = +index % 2 === 0 ? 'gray' : 'darkergray';

    const getValidInputValue = (rawValue: string): string => {
        let validValue: string = rawValue;
        if (!rawValue || rawValue === '-' || rawValue === '00') {
            validValue = '0';
        } else if (rawValue.length === 2 && rawValue[0] === '0') {
            validValue = rawValue[1];
        } else if (rawValue.includes('.')) {
            if (rawValue[0] === '.') {
                validValue = rawValue.substring(1, rawValue.length)
            } else if (rawValue.split('.')[1].length > 2) {
                validValue = rawValue.substring(0, rawValue.length - 1)
            }
        }
        return validValue;
    };

    const onCashInChange = (event: any): any => {

        event.target.value = getValidInputValue(event.target.value);
        const value = +event.target.value;

        if (localTableItemData.actualBalance + value - localTableItemData.cash_out < 0) {
            setIsLocalErrorState(true)
        } else {
            setIsLocalErrorState(false)
        }

        setLocalTableItemData({
            ...localTableItemData,
            cash_in: value,
            taken: localTableItemData.cash_out - value,
            plannedBalance: (localTableItemData.actualBalance + value - localTableItemData.cash_out).toFixed(2)
        });
    };

    const onCashOutChange = (event: any): any => {

        event.target.value = getValidInputValue(event.target.value);
        const value = +event.target.value;

        if (localTableItemData.actualBalance - value + +localTableItemData.cash_in < 0) {
            setIsLocalErrorState(true)
        } else {
            setIsLocalErrorState(false)
        }

        setLocalTableItemData({
            ...localTableItemData,
            cash_out: value,
            taken: value - localTableItemData.cash_in,
            plannedBalance: (localTableItemData.actualBalance - value + localTableItemData.cash_in).toFixed(2)
        });
    };

    const updateDataToSend = (localTableItemData: any, index: number) => {

        const newDataToSend: any[] = [];

        dataToSend.forEach((dataObject: any, dataObjectIndex: number) => {
            if (dataObjectIndex === index) {
                newDataToSend.push({
                    id: localTableItemData.id,
                    old_sum: localTableItemData.old_sum,
                    cash_in: localTableItemData.cash_in,
                    cash_out: localTableItemData.cash_out,
                    taken: localTableItemData.taken,
                });
            } else {
                newDataToSend.push(dataObject);
            }
        });
        setDataToSend(newDataToSend)
    };

    const onInputClick = (event: any): any => {
        event.target.select();
    };

    const getPlannedBalanceClassName = () => {
        let className = 'item planned-balance';
        if (isLocalErrorState) {
            className += ' error'
        }
        return className;
    };

    useEffect(() => {
        updateDataToSend(localTableItemData, index)
    }, [localTableItemData]);

    useEffect(() => {
        setIsErrorState({...isErrorState, [index]: isLocalErrorState});
    }, [isLocalErrorState]);

    return <div className={'table-item ' + colorClass}>
        <div className="item name">{tableItemData.name}</div>
        <div className="item actual-balance">{tableItemData.actualBalance}</div>
        <div className="item substract">
            <div className="input-container">
                <Form.Control as="input" type="number" defaultValue={tableItemData.cash_out}
                              onClick={onInputClick}
                              onChange={onCashOutChange}/>
            </div>
        </div>
        <div className="item add">
            <div className="input-container">
                <Form.Control as="input" type="number" defaultValue={tableItemData.cash_in}
                              onClick={onInputClick}
                              onChange={onCashInChange}/>
            </div>
        </div>
        <div className="item taken">{localTableItemData.taken}</div>
        <div className={getPlannedBalanceClassName()}>{localTableItemData.plannedBalance}</div>
    </div>
};

export default TableItem;