import React from 'react'
import './itemType.scss'
import {itemTypes} from "../../utils/itemTypes";

export const ItemType: React.FC<any> = ({itemType}) => {

    if (!itemType) {
        itemType = 'none';
    }

    let itemText  = itemType.toUpperCase().slice(0,1);
    return <div title={itemType} className={'item-type ' + itemType + 'Type'}>
        {itemText}
    </div>
};