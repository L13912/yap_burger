import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from "../../utils/hooks";
import {TCard, TOrder} from "../../types/data-types";
import styles from './order-card.module.css';
import {getDate} from "../../utils/date";

type T = {
    order: TOrder;
};

const OrderCard: FC<T> = ({order}) => {
    const history = useHistory();
    const location = useLocation();
    const [isVisible, setVisible] = useState(false);
    const ingredients = useSelector(store => store.reducer.ingredients);
    const orderIngredients = order.ingredients;


    const total = order?.ingredients?.reduce((prev, current) => {
        const ingredient = ingredients?.find((el) => current === el._id);
        if(!ingredient) return 0;
        if(ingredient.type === 'bun') return prev + (ingredient!.price*2);
        return prev + ingredient.price;
    }, 0);

    const openModal = () => {
        setVisible(!isVisible);
        console.log(order.number)
        history.push(`${location.pathname}/:${order.number}`, {background: location});
    }

    const statusText:string = order.status === 'done' ? 'Выполнен'
        : order.status === 'pending' ? 'Готовится' : 'Создан';

    const orderDate: string = getDate(order);

    const contClass = `${styles.cont} p-6 mr-2 mb-4`;
    const numberClass = `${styles.number} text text_type_main-small`;
    const dateClass = `${styles.date} text text_type_main-small text_color_inactive`
    const nameClass = `${styles.name} text text_type_main-default mt-6`
    const totalClass = `${styles.totalCost} text text_type_digits-default`
    const imageContClass = `${styles.items} mt-6`
    const res = order.status
    const statusClass = `text text_type_main-small ${styles[res]}`;
    const restClass = `text text_type_digits-default ${styles.count}`

    function uniqIngredients(array: Array<string> | undefined) {
        const res: any = new Set(array);
        return [...res];
    }

    return (
        <div className={contClass} onClick={openModal}>
            <div className={styles.top}>
                <span className={numberClass}>
               #{order.number}
                </span>
                <span className={dateClass}>
                            {orderDate}
                </span>
            </div>
            <div className={nameClass}>
                {order.name}
            </div>
            <div className={statusClass}>
                {statusText}
            </div>
            <div className={imageContClass}>
                <div className={styles.images}>
                    {uniqIngredients(order?.ingredients).filter((itemId:string, index: number) => index < 6).map((itemId:string, index: number) => {
                    const currentIngredient = ingredients?.find((el: TCard) => el._id === itemId);
                    const rest = order?.ingredients ? (order?.ingredients?.length - 6) : 0
                    return (
                        <div className={styles.imageBorder} key={index}>
                            <img className={styles.image} src={currentIngredient?.image} key={index} alt={'ingredient_picture'}/>
                            {index === 5 && <span className={restClass}>+{rest}</span>}
                        </div>)
                })}
                </div>
                <div className={totalClass}>
                    <span className="mr-1">{total}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

export default OrderCard;


