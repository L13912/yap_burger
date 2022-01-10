import React from 'react';
import styles from './order-details.module.css';
import image from '../../images/done.gif';
import {useSelector} from 'react-redux';


const OrderDetails = () => {

    const orderInfo = useSelector(store => store.reducer.order);
    const idStyles = `text text_type_digits-large pb-6 ${styles.id}`;
    const idTextStyles = `text text_type_main-medium pb-15 ${styles.idText} ${styles.light}`;
    const imageStyles = `pb-15 ${styles.image}`;
    const lightTextStyles = `pb-2  text text_type_main-default ${styles.light}`;
    const navyTextStyles = `text text_type_main-default ${styles.navy}`;
    return (
        <>
            {orderInfo.order && <p className={idStyles}>{orderInfo.order.number}</p>}
            <p className={idTextStyles}>идентификатор заказа</p>
            <img className={imageStyles} alt="Заказ принят" src={image}/>
            {orderInfo.name && <p className={lightTextStyles}>Ваш заказ "{orderInfo.name}" начали готовить</p>}
            <p className={navyTextStyles}>Дождитесь готовности на орбитальной станции</p>
        </>
    );
}

export default OrderDetails;
