import React, {useState} from 'react';
import styles from './ingredient-card.module.css';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import image from '../../images/img.png';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ({}) => {

    const card = `mt-5 mr-5 mb-8 ${styles.card}`;
    const cost = `mt-1 mr-5 ${styles.cost}`;
    const description = `mt-5 mr-5 text text_type_main-default ${styles.description}`;

    return (
        <div className={card}>
            <Counter count={1} size="default" />
            <div className={image}>
                <img className={styles.image} alt='Фото ингредиента' src={image}/>
            </div>
            <div className={cost}>
                <p className="pr-1 text text_type_digits-default">20</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={description}>Краторная булка N-200i</p>
        </div>
    );
};

export default IngredientCard;
