import React, {useEffect, FC} from 'react';
import styles from './feed.module.css';
import {WS_START, WS_CONNECTION_CLOSE} from "../../services/actions/ws-actions";
import {TOrder} from "../../types/data-types";
import {useDispatch, useSelector} from '../../utils/hooks';

import OrderCard from "../order-card/order-card";

const Feed: FC = () => {
    const orders = useSelector(store => {
        return store.wsReduser.orders
    }) || [];
    const total = useSelector(store => {
        return store.wsReduser.total
    }) || 0;
    const totalToday = useSelector(store => {
        return store.wsReduser.totalToday
    }) || 0;
    const dispatch = useDispatch();
    const scrollCont = `custom-scroll  ${styles.cont}`;
    const scrollOrdersCont = `custom-scroll ml-10 pl-10 ${styles.right}`;
    const orderContClass = `${styles.ordersCont} mb-15`;
    const orderListClass = `${styles.ordersList} mr-6`
    const ordersClass = `${styles.ordersWidth} mr-6`
    const orderClass = `${styles.order} text text_type_digits-default mr-9`
    const totalClass = `${styles.total} text text_type_digits-large`

    useEffect(() => {
        dispatch({type: WS_START, payload: ''});
        return () => {
            dispatch({type: WS_CONNECTION_CLOSE, payload: ''})
        }
    }, []);
    return (
        <div className={styles.feed}>
            <h1 className='text text_type_main-large pt-8 mb-4'>Лента заказов</h1>
            <div  className={styles.feedCont}>
                <section className={styles.left}>
                    <div className={scrollCont}>
                        {[...orders].reverse().map((order: TOrder, index: number) =>
                            <OrderCard order={order} key={index}/>)}
                    </div>
                </section>

                <section className={scrollOrdersCont}>
                    <div className={orderContClass}>
                        <div className={ordersClass}>
                            <div className='text text_type_main-medium mb-6'>
                                Готовы:
                            </div>
                            <ul className={orderListClass}>
                                {orders.filter((el: TOrder) => el.status === 'done').map((el, index) => {
                                    return <li className={orderClass}
                                               key={index}>{el.number}</li>
                                })}
                            </ul>
                        </div>
                        <div className={ordersClass}>
                            <div className="text text_type_main-medium  mb-6">
                                В работе:
                            </div>
                            <ul className={orderListClass}>
                                {orders.filter((el: TOrder) => el.status === 'pending').map((el, index) => {
                                    return <li className="text text_type_digits-default" key={index}>{el.number}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="text text_type_main-medium mb-15">
                        Выполнено за всё время:
                        <div
                        className={totalClass}>{total}</div>
                    </div>
                    <div className="text text_type_main-medium mb-10">
                        Выполнено за сегодня:
                        <div
                        className={totalClass}>{totalToday}</div>
                    </div>
                </section>
            </div>
        </div>

    )
};

export default Feed;
