import React, {useState} from 'react';
import styles from './ingredient-card.module.css';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import image from '../../images/img.png';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ({card}) => {

    const cardStyles = `mt-5 mr-5 mb-8 ${styles.card}`;
    const costStyles  = `mt-1 mr-5 ${styles.cost}`;
    const descriptionStyles  = `mt-5 mr-5 text text_type_main-default ${styles.description}`;

    return (
        <div className={cardStyles}>
            <Counter count={1} size="default" />
            <div className={image}>
                <img className={styles.image} alt='Фото ингредиента' src={card.image}/>
            </div>
            <div className={costStyles }>
                <p className="pr-1 text text_type_digits-default">{card.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={descriptionStyles}>{card.name}</p>
        </div>
    );
};

export default IngredientCard;
