import React, {Dispatch, SetStateAction} from "react";
import {SaveAndCloseModal} from "../comps/SaveAndCloseModal/SaveAndCloseModal";

export namespace Types {

    // state

    export interface ITotalInfo {
        actualBalance: number,
        plannedBalance: number,
        cash_out_total: number,
        cash_in_total: number,
    }
    export interface IItem {
        id: string,
        old_sum?: number,
        cash_in: number,
        cash_out: number
    }

    export interface ISessionInfo {
        terminalNumber: number,
        clientName: string,
        items: IItem[],
    }

    export interface MainState {
        readonly user: UserState;
        readonly items: ItemsState;
        readonly messages: MessagesState;
    }

    export interface UserState {
        readonly isAuthorized: boolean,
        readonly currentUser?: User,
        readonly userStat?: UserStat,
        readonly isUserLoading: boolean,
        readonly isUserStatLoading: boolean
    }

    export interface ItemsState {
        readonly product: Product | {},
        readonly products: Product[],
        readonly dish: Dish | {},
        readonly dishes: Dish[],
        readonly meal: Meal | {},
        readonly meals: Meal[],
        readonly isItemLoading: boolean,
        readonly isItemsLoading: boolean,
    }

    export interface MessagesState {
        messages: Message[]
    }

    // entities
    export interface User {
        name: string,
        login: string,
        intakeData?: {
            energyValue: {
                calories: number,
                proteines: number,
                fats: number,
                carbohydrates: number
            },
        },
        products?: Product[],
        dishes?: Dish[],
        meals?: Meal[],
    }

    export interface UserStat {
        readonly mainStat: {
            energyValue: {
                calories: number,
                proteines: number,
                fats: number,
                carbohydrates: number
            },
            weight: number,
            price: number,
        },
        readonly statArray: Stat[]
    }

    export interface Stat {
        dateString: string,
        energyValue: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
        energyValueDifference: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
        meals: Meal[],
        price: number,
        weight: number
    }

    export interface Message {
        type: string,
        text: string
    }

    export interface Product {
        _id?: string,
        name: string,
        type: string,
        description?: string,
        weight?: number,
        price?: number,
        energyValue?: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        },
        isThatPieceProduct: boolean,
        amountOfPieces?: number,
        priceForAllPieces?: number,
        energyValueForOnePiece?: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
    }

    export interface Dish {
        _id?: string,
        name: string,
        type: string,
        description: string,
        ingridients: {
            ingridient: Product,
            weight: number,
            amountOfItems: number,
            price: number,
            energyValue: {
                calories: number,
                proteines: number,
                fats: number,
                carbohydrates: number
            }
        }[],
        weight: number,
        price: number,
        energyValue: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
    }

    export interface Meal {
        _id?: string,
        name: string,
        type: string,
        description: string,
        dateString: string,
        ingridients: {
            ingridient: Product | Dish,
            weight: number,
            amountOfItems: number,
            price: number,
            energyValue: {
                calories: number,
                proteines: number,
                fats: number,
                carbohydrates: number
            }
        }[],
        weight: number,
        price: number,
        energyValue: {
            calories: number,
            proteines: number,
            fats: number,
            carbohydrates: number
        }
    }

    // common entities type
    export type CommonEntitiesType = Product | Dish | Meal;

    // props
    export interface ActionButtonProps {
        onClick: (arg?: any) => void,
        label: string,
        className?: string
    }
    export interface AddItemModalProps {
        itemType: string,
        showModal: boolean,
        closeModal: () => void,
        addItem: () => void,
        editedItem: Types.CommonEntitiesType;
    }
}