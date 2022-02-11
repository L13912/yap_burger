import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from '../../utils/hooks';
import {useHistory, useLocation} from 'react-router-dom';
import { useSelector } from "../../utils/hooks";
import {TCard, TIngredients, TOrder} from "../../types/data-types";

import styles from './feed-order-details.module.css';
import {getDate} from "../../utils/date";

const FeedOrderDetails: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [isVisible, setVisible] = useState(false);
    const orders = useSelector(store => { return store.wsReduser.orders}) || [];
    const ingredients = useSelector(store => store.reducer.ingredients);
    const tN = location.pathname.split(':');
    const number = parseInt(tN[1]);
    const order: TOrder | undefined = orders.find((el: TOrder) => el.number === number);
    const orderDate: string = getDate(order);

    const total = order?.ingredients?.reduce((prev, current) => {
        const ingredient = ingredients?.find((el) => current === el._id);
        if(!ingredient) return 0;
        if(ingredient.type === 'bun') return prev + (ingredient!.price*2);
        return prev + ingredient.price;
    }, 0);
    const ingredientsIds = order?.ingredients;
    const orderIngredients = prepareIngredients();

    function prepareIngredients() {
        let orderIngredients = [];
        if (!ingredientsIds) return [];
        for (const item of ingredientsIds) {
            orderIngredients.push(

                ingredients?.find((el: TCard) => el._id === item)
            );
        }
        console.log(orderIngredients)
        return orderIngredients;
    }
    const filterIngredients = orderIngredients
        .filter((item, index, arr) => arr.indexOf(item) === index)
        .map((item) => [item, orderIngredients.filter((el) => el === item).length]);




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
    const nameClass = `mb-3 text text_type_main-medium ${styles.name}`;
    const footerClass = `${styles.footer} mt-10`;
    const sumClass = `${styles.sum} text text_type_digits-default pr-1`

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
                    <div className={`mb-10 pr-6 ${styles.ingredients}`}>
                    {filterIngredients.map((item: any, index: number) => {
                        return (
                            <div key={index}  className={styles.ingredient}>
                                    <div
                                        className={styles.image}
                                        style={{
                                            backgroundImage: 'url(' + item[0]?.image_mobile + ')',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                    <p className="text text_type_main-default pr-5">{item[0]?.name}</p>
                                    <p className={sumClass}>
                                        {item[0]?.type === 'bun' ? `2 x ${item[0]?.price}` : `${item[1]} x ${item[0]?.price}`}
                                    </p>
                                <CurrencyIcon type='primary' />
                                </div>
                        );
                    })}
                    </div>
                </div>
            </div>
            <div className={footerClass}>
                <div className='text text_type_main-default text_color_inactive'>
                    {orderDate}
                </div>
                <div className={totalClass}>
                    <span className='mr-2'>{total}</span>
                    <CurrencyIcon type='primary' />
                </div>
            </div>
        </div>
    );
}

export default FeedOrderDetails;
