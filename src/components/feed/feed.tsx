import React, {useEffect, FC} from 'react';
import styles from './feed.module.css';
import { WS_START, WS_CONNECTION_CLOSE } from "../../services/actions/ws-actions";
import { TOrder } from "../../types/data-types";
import {useDispatch, useSelector} from '../../utils/hooks';

import OrderCard from "../order-card/order-card";

const Feed:FC = () => {
    const orders = useSelector(store => { return store.wsReduser.orders}) || [];
    const dispatch = useDispatch();
    const scrollCont = `custom-scroll  ${styles.cont}`;

    useEffect(() => {
        dispatch({type: WS_START, payload: ''});
        return () => {
            dispatch({type: WS_CONNECTION_CLOSE, payload: ''})
        }
    }, []);
            return (
                <div className={styles.feed}>
                    <div className={styles.left}>
                    <div className={scrollCont}>
                        {[...orders].reverse().map((order: TOrder, index: number) => <OrderCard order={order} key={index} />)}
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.ordersTable}/>
                    <div className={styles.totalCont}>
                        <h3>Выполнено за все время:</h3>
                        <span>28 752</span>
                        <h3>Выполнено за сегодня:</h3>
                        <span>138</span>
                    </div>
                </div>
            </div>

        )
};

export default Feed;
