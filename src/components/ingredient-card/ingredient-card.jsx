import React, {useEffect, useState} from 'react';
import styles from './ingredient-card.module.css';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import image from '../../images/img.png';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {IngredientCardProps} from "../../types/ingredientsProps";
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import {SET_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS } from "../../services/actions/actions";

const IngredientCard = ({card}) => {
    const dispatch = useDispatch();
    const [isVisible, setVisible] = useState(false);
    const handleCloseModal = (e) => {
        setVisible(false);
        dispatch({
            type: DELETE_INGREDIENT_DETAILS
        })
    }

    const [{opacity}, dragRef] = useDrag({
        type: 'card',
        item: {card: {...card, guid: guid()} },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    })
    const ingredients = useSelector(store => store.reducer.constructorIngredients);
    const count = () => {
        let value = 0;
        for (let bun of ingredients.buns)
            if (bun._id === card._id) value += 1;
        for (let topping of ingredients.toppings)
            if (topping._id === card._id) value += 1;
        return value;
    }

    const cardClasses = `mt-5 mr-5 mb-8 ${styles.card}`;
    const costClasses = `mt-1 mr-5 ${styles.cost}`;
    const descriptionClasses = `mt-5 mr-5 text text_type_main-default ${styles.description}`;

    return (
        <div className={cardClasses} ref={dragRef} style={{opacity}} onClick={() => {
            setVisible(!isVisible);
            dispatch({
                type: SET_INGREDIENT_DETAILS,
                card
            });
        }}>
            { count() > 0  && <Counter count={count()} size="default"/> }
            <div className={image}>
                <img className={styles.image} alt='Фото ингредиента' src={card.image}/>
            </div>
            <div className={costClasses}>
                <p className="pr-1 text text_type_digits-default">{card.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={descriptionClasses}>{card.name}</p>
            {
                isVisible &&
                <Modal close={handleCloseModal} title={"Детали ингредиента"}>
                        <IngredientDetails/>
                </Modal>
            }
        </div>
    );
};

function guid () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

IngredientCard.propTypes = {
    card: IngredientCardProps
};

export default IngredientCard;
