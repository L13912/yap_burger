import React, {useEffect, useState} from 'react';
import styles from './indredient-details.module.css';
import {useSelector} from "react-redux";
import {useParams} from 'react-router-dom';


const IngredientDetails = () => {
    const {id} = useParams();
    const [card, setCard] = useState({});
    const ingredients = useSelector(store => store.reducer.ingredients);
    const tCard = useSelector(store => store.reducer.ingredientDetails);

    function getCurrentIngredient() {
        if (!id) return tCard;
        return ingredients.find(i => i._id === id);
    }

    useEffect(() => {
        const crd = getCurrentIngredient()
        setCard(crd === null ? {} : crd);
    }, [ingredients])

    const imageClasses = `pt-4 pb-8 ${styles.image}`;
    const textClasses = `text text_type_main-medium pb-8 ${styles.idText} ${styles.light}`;
    const details = `${styles.details}`;
    const cont = `text text_type_main-default ${styles.navy}`;
    const name = `pr-8 text text_type_main-default ${styles.navy}`;
    const value = `pt-1  text text_type_digits-default ${styles.navy}`;

    if (card === {} || card === undefined) {
        return null;
    }

    return (
        <div className={styles.detailsCard}>
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
