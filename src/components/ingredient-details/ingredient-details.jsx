import React, {} from 'react';
import styles from './indredient-details.module.css';
import {useSelector} from "react-redux";

const IngredientDetails = () => {
    const card = useSelector(store => store.reducer.ingredientDetails);
    const imageClasses = `pt-4 pb-8 ${styles.image}`;
    const textClasses = `text text_type_main-medium pb-8 ${styles.idText} ${styles.light}`;
    const details = `${styles.details}`;
    const cont = `text text_type_main-default ${styles.navy}`;
    const name = `text text_type_main-default ${styles.navy}`;
    const value = `pt-1  text text_type_digits-default ${styles.navy}`;

    return (
        <div>
            <img className={imageClasses} alt="Заказ принят" src={card.image}/>
            <p className={textClasses}>{card.name}</p>
            <div className={details}>
                <div className={cont}>
                    <p className={name}>Калории, ккал</p>
                    <p className={value}>{card.calories}</p>
                </div>
                <div className={cont}>
                    <p className={name}>Белки, г</p>
                    <p className={value}>{card.proteins}</p>
                </div>
                <div className={cont}>
                    <p className={name}>Жиры, г</p>
                    <p className={value}>{card.fat}</p>
                </div>
                <div className={cont}>
                    <p className={name}>Углеводы, г</p>
                    <p className={value}>{card.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
};

export default IngredientDetails;
