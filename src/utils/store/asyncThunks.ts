import {
    createAddDishAction, createAddMealAction,
    createAddMessageAction, createAddProductAction, createSetDishAction, createSetDishesAction, createSetItemsLoadingAction, createSetMealAction,
    createSetMealsAction, createSetProductAction, createSetProductsAction,
    setIsAuthorizedAction,
    setIsUserLoading, setIsUserStatLoading,
    setUserAction,
    setUserStatAction
} from "./actionCreators";
import apiService from "../apiService";
import {itemTypes} from "../itemTypes";

const checkResponseForMessage = (response: any, dispatch: any) => {
    if (response.message) {
        dispatch(createAddMessageAction(response.message));
    }
};

type Response = {
    user?: any,
    message?: any
}

export const fetchUser = () => {
    return (dispatch: any) => {
        dispatch(setIsUserLoading(true));
        apiService.getUserData().then((response: Response) => {
            checkResponseForMessage(response, dispatch);
            dispatch(setIsAuthorizedAction(true));
            dispatch(setUserAction(response.user));
            // dispatch(createSetMealsAction(response.user.meals));
            // dispatch(createSetDishesAction(response.user.dishes));
            // dispatch(createSetProductsAction(response.user.products));
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
            dispatch(setIsAuthorizedAction(false));
        }).finally(() => {
            dispatch(setIsUserLoading(false));
        })
    }
};
export const fetchLogin = (data: any) => {
    return (dispatch: any) => {
        dispatch(setIsUserLoading(true));
        apiService.login(data).then((response: Response) => {
            checkResponseForMessage(response, dispatch);
            dispatch(setIsAuthorizedAction(true));
            dispatch(setUserAction(response.user));
            dispatch(createSetMealsAction(response.user.meals));
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
            dispatch(setIsAuthorizedAction(false));
        }).finally(() => {
            dispatch(setIsUserLoading(false));
        })
    }
};

export const fetchUserStatForToday = () => {
    return (dispatch: any) => {
        const date = new Date();
        dispatch(setIsUserStatLoading(true));
        apiService.getStatsForOneDay({date}).then((dailyStat) => {
            checkResponseForMessage(dailyStat, dispatch);
            dispatch(setUserStatAction(dailyStat));
        }).catch((error) => {
            checkResponseForMessage(error, dispatch);
        }).finally(() => {
            dispatch(setIsUserStatLoading(false));
        })
    }
};
export const addNewItem = (fetchFunction: any, setItemsAction: any, data: any) => {

    return (dispatch: any) => {
        dispatch(createSetItemsLoadingAction(true));
        fetchFunction(data).then((response: any) => {
            checkResponseForMessage(response, dispatch);
            dispatch(setItemsAction(response));
        }).catch((error: any) => {
            checkResponseForMessage(error, dispatch);
        }).finally(() => {
            dispatch(fetchUserStatForToday());
            dispatch(createSetItemsLoadingAction(false));
        })
    }
};
export const removeNewItem = (removeFunction: any, setItemsAction: any, id: string) => {

    return (dispatch: any) => {
        dispatch(createSetItemsLoadingAction(true));
        removeFunction(id).then((response: any) => {
            checkResponseForMessage(response, dispatch);
            dispatch(setItemsAction(response));
        }).catch((error: any) => {
            checkResponseForMessage(error, dispatch);
        }).finally(() => {
            dispatch(fetchUserStatForToday());
            dispatch(createSetItemsLoadingAction(false));
        })
    }
};
export const fetchItems = (itemType: string, setItemsAction: any) => {

    // console.log('from fetch', itemType);

    const fetchMethod = apiService.getApiMethodsObject(itemType).getAllItems;

    return (dispatch: any) => {
        dispatch(createSetItemsLoadingAction(true));

        setTimeout(() => {

            fetchMethod().then((response: any) => {
                dispatch(createSetItemsLoadingAction(false));
                // if (itemType === itemTypes.MEAL && response.length > 0) {
                //     dispatch(fetchUserStatForToday());
                // }
                checkResponseForMessage(response, dispatch);
                dispatch(setItemsAction(response));
            }).catch((error: any) => {
                checkResponseForMessage(error, dispatch);
            }).finally(() => {
                // dispatch(fetchUserStatForToday());
                // dispatch(createSetItemsLoadingAction(false));
            })
        }, 1000)
    }
};