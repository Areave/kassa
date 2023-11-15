import React, {Dispatch, SetStateAction} from "react";
import {SaveAndCloseModal} from "../comps/SaveAndCloseModal/SaveAndCloseModal";

export namespace Types {

    // state

    export interface ITotalInfo {
        taken_total: number;
        actualBalance: number,
        plannedBalance: number,
        cash_out_total: number,
        cash_in_total: number,
    }
    export interface IItem {
        id: string,
        old_sum?: number,
        cash_in: number,
        cash_out: number,
        taken: number
    }

    export interface ISessionInfo {
        terminalNumber: number,
        clientName: string,
        items: IItem[],
    }
}