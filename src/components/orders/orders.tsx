import React, {useEffect, FC} from 'react';
import styles from './orders.module.css';
import { WS_PRIVAT_START, WS_CONNECTION_CLOSE } from "../../services/actions/ws-actions";
import { TOrder } from "../../types/data-types";
import {useDispatch, useSelector} from '../../utils/hooks';

import OrderCard from "../order-card/order-card";

const Orders:FC = () => {
    const orders = useSelector((store: any) => { return store.wsReduser.orders}) || [];
    const dispatch = useDispatch();
    const scrollCont = `custom-scroll  ${styles.cont}`;

    useEffect(() => {
        dispatch({type: WS_PRIVAT_START, payload: ''});
        return () => {
            dispatch({type: WS_CONNECTION_CLOSE, payload: ''})
        }
    }, []);
    if(typeof orders !== 'undefined' && orders.length) {
        return (
            <div className={scrollCont}>
                {[...orders].reverse().map((order: TOrder, index: number) => <OrderCard order={order} key={index} />)}
            </div>
        )
    } else {
        dispatch({type: WS_PRIVAT_START, payload: ''});
        return null;
    }
};

export default Orders;
