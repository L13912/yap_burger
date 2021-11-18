import React, {} from 'react';
import styles from './order-details.module.css';
import image from '../../images/done.gif';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';


const OrderDetails = ({}) => {
    const closeIcon = `mt-15 mr-10 ${styles.closeIcon}`;
    const orderDetails = `pt-30 pb-30 pl-25 pr-25 ${styles.orderDetails}`;
    const idStyles = `text text_type_digits-large pb-6 ${styles.id}`;
    const idTextStyles = `text text_type_main-medium pb-15 ${styles.idText} ${styles.light}`;
    const imageStyles = `pb-15 ${styles.image}`;
    const lightTextStyles = `pb-2  text text_type_main-default ${styles.light}`;
    const navyTextStyles = `text text_type_main-default ${styles.navy}`;
    return (
        <div className={orderDetails}>
            <div className={closeIcon}  >
                <CloseIcon  type="primary"/>
            </div>
            <p className={idStyles}>034536</p>
            <p className={idTextStyles}>идентификатор заказа</p>
            <img className={imageStyles} alt="Заказ принят" src={image}/>
            <p className={lightTextStyles}>Ваш заказ начали готовить</p>
            <p className={navyTextStyles}>Дождитесь готовности на орбитальной станции</p>
        </div>

    );
};

export default OrderDetails;
