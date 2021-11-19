import React, {} from 'react';
import styles from './order-details.module.css';
import image from '../../images/done.gif';

const OrderDetails = ({}) => {

    const idStyles = `text text_type_digits-large pb-6 ${styles.id}`;
    const idTextStyles = `text text_type_main-medium pb-15 ${styles.idText} ${styles.light}`;
    const imageStyles = `pb-15 ${styles.image}`;
    const lightTextStyles = `pb-2  text text_type_main-default ${styles.light}`;
    const navyTextStyles = `text text_type_main-default ${styles.navy}`;
    return (
        <>
            <p className={idStyles}>034536</p>
            <p className={idTextStyles}>идентификатор заказа</p>
            <img className={imageStyles} alt="Заказ принят" src={image}/>
            <p className={lightTextStyles}>Ваш заказ начали готовить</p>
            <p className={navyTextStyles}>Дождитесь готовности на орбитальной станции</p>
        </>


    );
};

export default OrderDetails;
