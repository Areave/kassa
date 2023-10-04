import React from 'react'
import './TableItem.scss'
import {Types} from '../../utils/types'

const TableItem = ({name, actualBalance, substract, add, plannedBalance, index, openModal}: any) => {

    const colorClass = +index % 2 === 0 ? 'gray' : 'darkergray';

    return <div className={'table-item ' + colorClass}>
        <div className="item name">{name}</div>
        <div className="item actual-balance">{actualBalance}</div>
        <div className="item substract">
            <button onClick={openModal}
                    className='button button_substract'>
                {substract}
            </button>
        </div>
        <div onClick={openModal}
             className="item add">
            <button className='button button_add'>
                {add}
            </button>
        </div>
        <div className="item planned-balance">{plannedBalance}</div>
    </div>
};

export default TableItem;