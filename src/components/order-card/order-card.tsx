import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, useState} from "react";
import {useHistory, useLocation} from 'react-router-dom';
import { useSelector } from "../../utils/hooks";
import { TOrder, TCard } from "../../types/data-types";
import styles from './order-card.module.css';
import {useDispatch} from '../../utils/hooks';

type T = {
    order: TOrder;
};

const OrderCard: FC<T> = ({order}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [isVisible, setVisible] = useState(false);
    const ingredients = useSelector(store => store.reducer.ingredients);


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


    const contClass = `${styles.cont} p-6 mr-2 mb-4`;
    const numberClass = `${styles.number} text text_type_main-small`;
    const dateClass = `${styles.date} text text_type_main-small text_color_inactive`
    const nameClass = `${styles.name} text text_type_main-default mt-6`
    const totalClass = `${styles.totalCost} text text_type_digits-default`
    const imageContClass = `${styles.items} mt-6`
    const res = order.status
    const statusClass = `text text_type_main-small ${styles[res]}`;

    return (
        <div className={contClass} onClick={openModal}>
            <div className={styles.top}>
                <span className={numberClass}>
               #{order.number}
                </span>
                <span className={dateClass}>
                            {order.createdAt}
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
                    {order?.ingredients?.map((itemId:string, index: number) => {
                    const currentIngredient = ingredients?.find((el: TCard) => el._id === itemId);
                    return (<img className={styles.image} src={currentIngredient?.image} key={index} alt={'ingredient_picture'}/>)
                })}
                </div>
                <div className={totalClass}>
                    <span className="mr-1">{total}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}

export default OrderCard;


