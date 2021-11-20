import React, {} from 'react';
import styles from './indredient-details.module.css';
import {IngredientCardProps} from "../../types/ingredientsProps";

const IngredientDetails = ({card}) => {
    const imageClasses = `pt-4 pb-8 ${styles.image}`;
    const textClasses = `text text_type_main-medium pb-8 ${styles.idText} ${styles.light}`;
    const details = `${styles.details}`;
    const cont = `text text_type_main-default ${styles.navy}`;
    const name = `text text_type_main-default ${styles.navy}`;
    const value = `pt-1  text text_type_digits-default ${styles.navy}`;

    return (
        <>
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
        </>
    );
};

IngredientDetails.propTypes = {
    card: IngredientCardProps
};

export default IngredientDetails;
