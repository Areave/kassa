import React, {useEffect, useState} from 'react'
import './TableItem.scss'
import {Types} from '../../utils/types'
import Form from "react-bootstrap/Form";

const TableItem = ({tableItemData, index, setDataToSend, dataToSend, setIsErrorState, isErrorState}: any) => {

    const [localTableItemData, setLocalTableItemData] = useState(tableItemData);

    const colorClass = +index % 2 === 0 ? 'gray' : 'darkergray';

    const onCashInChange = (event: any): any => {
        if (!event.target.value || event.target.value === '-') {
            event.target.value = '0';
        }
        if (event.target.value.length > 1 && event.target.value[0] === '0') {
            if (event.target.value[1] === ',') {
                event.target.value = event.target.value.substring(2) ;
            } else {
                event.target.value = event.target.value.substring(1) ;
            }
        }

        const value = +event.target.value;


        if (localTableItemData.actualBalance + value - localTableItemData.substract < 0) {
            setIsErrorState(true)
        } else {
            setIsErrorState(false)
        }

        setLocalTableItemData({...localTableItemData,
            add: value,
            plannedBalance: localTableItemData.actualBalance + value - localTableItemData.substract});
    };
    const onCashOutChange = (event: any): any => {
        if (!event.target.value || event.target.value === '-') {
            event.target.value = '0';
        }
        if (event.target.value.length > 1 && event.target.value[0] === '0') {
            if (event.target.value[1] === ',') {
                event.target.value = event.target.value.substring(2) ;
            } else {
                event.target.value = event.target.value.substring(1) ;
            }
        }
        const value = +event.target.value;

        if (localTableItemData.actualBalance - value - + localTableItemData.add < 0) {
            setIsErrorState(true)
        } else {
            setIsErrorState(false)
        }

        setLocalTableItemData({...localTableItemData,
            substract: value,
            plannedBalance: localTableItemData.actualBalance - value + localTableItemData.add});
    };

    const updateDataToSend = (localTableItemData:any, index: number) => {

        const newDataToSend:any[] = [];

        dataToSend.forEach((dataObject:any, dataObjectIndex: number) => {
            if (dataObjectIndex === index) {
                newDataToSend.push({
                    id: localTableItemData.id,
                    old_sum: localTableItemData.old_sum,
                    cash_in: localTableItemData.add,
                    cash_out: localTableItemData.substract
                });
            } else {
                newDataToSend.push(dataObject);
            }
        });
        setDataToSend(newDataToSend)
    };

    useEffect(()=>{
        updateDataToSend(localTableItemData, index)
    }, [localTableItemData]);

    const onInputClick = (event: any): any => {
        event.target.select();
    };

    const getPlannedBalanceClassName = (balance: string) => {
        let className = 'item planned-balance';
        if (+balance < 0) {
            className += ' error'
        }
        return className;
    }

    // @ts-ignore
    return <div className={'table-item ' + colorClass}>
        <div className="item name">{tableItemData.name}</div>
        <div className="item actual-balance">{tableItemData.actualBalance}</div>
        <div className="item substract">
            <div className="input-container">
                <Form.Control as="input" type="number" defaultValue={tableItemData.substract}
                              onClick={onInputClick}
                              onChange={onCashOutChange}/>
            </div>
        </div>
        <div className="item add">
            <div className="input-container">
                <Form.Control as="input" type="number" defaultValue={tableItemData.add}
                              onClick={onInputClick}
                              onChange={onCashInChange}/>
            </div>

        </div>
        <div className={getPlannedBalanceClassName(localTableItemData.plannedBalance)}>{localTableItemData.plannedBalance}</div>
    </div>
};

export default TableItem;