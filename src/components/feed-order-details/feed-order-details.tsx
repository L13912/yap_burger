import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from '../../utils/hooks';
import {useHistory, useLocation} from 'react-router-dom';
import { useSelector } from "../../utils/hooks";
import {TIngredients, TOrder} from "../../types/data-types";

import styles from './feed-order-details.module.css';

const FeedOrderDetails: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [isVisible, setVisible] = useState(false);
    const orders = useSelector(store => { return store.wsReduser.orders}) || [];
    const ingredients = useSelector(store => store.reducer.ingredients);
    const tN = location.pathname.split(':');
    const number = parseInt(tN[1]);
    const order = orders.find((el: TOrder) => el.number === number);
    console.log(order)

    const total = order?.ingredients?.reduce((prev, current) => {
        const ingredient = ingredients?.find((el) => current === el._id);
        if(!ingredient) return 0;
        if(ingredient.type === 'bun') return prev + (ingredient!.price*2);
        return prev + ingredient.price;
    }, 0);




    const openModal = () => {
        setVisible(!isVisible);
        history.push(`${location.pathname}/${number}`, {background: location});
    }
    const statusText:string = order?.status === 'done' ? 'Выполнен'
        : order?.status === 'pending' ? 'Готовится' : 'Создан';
    const res = order?.status

    const contClass = `${styles.cont} mt-15 mb-15 pl-10 mr-10`;
    const numberClass = `${styles.number}  mb-10 text text_type_digits-default`;

    const totalClass = `${styles.total} text text_type_digits-default`
    const ingredContClass = `${styles.ingredCont} mt-15`
    // @ts-ignore
    const statusClass = `text text_type_main-small ${styles[res]}`;
    const scrollCont = `custom-scroll mt-10 mb-10  ${styles.scrollCont}`;
    const nameClass = `mb-3 text text_type_main-medium ${styles.name}`

    return (
        <div className={contClass}  onClick={openModal}>
            <div className={numberClass}>#{number}</div>
            <div className={nameClass}>{order?.name}</div>
            <div className={statusClass}>
                {statusText}
            </div>
            <div className={ingredContClass}>
                <div className='mb-6 text text_type_main-medium'>Состав:</div>
                <div className={scrollCont}>
                    {order?.ingredients?.map((el, index) => <div key={index}> {el} </div>)}
                </div>
            </div>
            <div className={`${styles.footer} mt-10`}>
                <div className='text text_type_main-default text_color_inactive'>
                    {order?.createdAt}
                </div>
                <div className={totalClass}>
                    <span className='mr-2'>{total}</span><CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    );
}

export default FeedOrderDetails;
