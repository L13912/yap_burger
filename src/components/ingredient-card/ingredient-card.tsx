import React, {useState, FC} from 'react';
import styles from './ingredient-card.module.css';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import image from '../../images/img.png';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import {useDrag} from 'react-dnd';
import {useHistory, useLocation} from 'react-router-dom';
import {SET_INGREDIENT_DETAILS} from "../../services/actions/actions";
import {TIngredientCard} from "../../types/data-types";


const IngredientCard:FC<TIngredientCard> = ({card}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [isVisible, setVisible] = useState(false);

    const [{opacity}, dragRef] = useDrag({
        type: 'card',
        item: {card: {...card, guid: guid()}},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
    })
    const ingredients = useSelector((store: any) => store.reducer.constructorIngredients);
    const count = () => {
        let value = 0;
        for (let bun of ingredients.buns)
            if (bun._id === card._id) value += 2;
        for (let topping of ingredients.toppings)
            if (topping._id === card._id) value += 1;
        return value;
    }

    const openModal = () => {
        setVisible(!isVisible);
        dispatch({
            type: SET_INGREDIENT_DETAILS,
            card
        });
        history.push(`/ingredients/${card._id}`, {background: location});
    }

    const cardClasses = `mt-5 mr-5 mb-8 ${styles.card}`;
    const costClasses = `mt-1 mr-5 ${styles.cost}`;
    const descriptionClasses = `mt-5 mr-5 text text_type_main-default ${styles.description}`;

    return (
        <div className={cardClasses} ref={dragRef} style={{opacity}} onClick={openModal}>
            {count() > 0 && <Counter count={count()} size="default"/>}
            <div className={image}>
                <img className={styles.image} alt='Фото ингредиента' src={card.image}/>
            </div>
            <div className={costClasses}>
                <p className="pr-1 text text_type_digits-default">{card.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={descriptionClasses}>{card.name}</p>
        </div>
    );
};

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export default IngredientCard;
