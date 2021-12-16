import React, {useRef} from 'react';
import styles from './constructor-card.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientsProps} from "../../types/ingredientsProps";
import {useDispatch, useSelector} from 'react-redux';
import {useDrag, useDrop} from 'react-dnd';
import {
    DELETE_CONSTRUCTOR_INGREDIENT
} from "../../services/actions/actions";
import PropTypes from "prop-types";

export const ConstructorCard = ({card, moveCard, type, index}) => {
    const dispatch = useDispatch();
    const moveRef = useRef(null);
    const ingredients = useSelector(store => store.reducer.constructorIngredients);

    const listItem = `mr-1 ${styles.listItem}`;

    const deleteIngredient = (guid) => {
        dispatch({
            type: DELETE_CONSTRUCTOR_INGREDIENT,
            guid
        })
    }

    const [, drag] = useDrag({
        type: 'card',
        item: card,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const [{opacity}, drop] = useDrop({
        accept: 'card',
        hover: (card) => {
            const dragIndex = ingredients.toppings.findIndex(elem => elem._id === card._id);
            if (dragIndex === -1) return;
            moveCard(dragIndex, index)
        },
        collect: (monitor) => ({
            opacity: monitor.isOver() ? 0.2 : 1
        })
    })

    drag(drop(moveRef))

    return (
        type === 'top' ?
            <ConstructorElement
                type="top"
                key={card.guid + index}
                isLocked={true}
                text={card.name + ' (верх)'}
                price={card.price}
                thumbnail={card.image}
            />
            :
            type === 'bottom' ?
                <ConstructorElement
                    key={card.guid + index}
                    type="bottom"
                    isLocked={true}
                    text={card.name + ' (низ)'}
                    price={card.price}
                    thumbnail={card.image}
                /> :
                <div key={card.guid + index}
                     ref={moveRef}
                     style={{opacity}}
                     className={listItem}>
                    <DragIcon type="primary"/>
                    <ConstructorElement handleClose={() => {
                        deleteIngredient(card.guid)
                    }}
                                        text={card.name}
                                        price={card.price}
                                        thumbnail={card.image}
                                        moveCard={moveCard}
                    />
                </div>
    );
}

ConstructorCard.propTypes = {
    card: IngredientsProps.isRequired,
    moveCard: PropTypes.func, /*не обязательная, тк булки не перетаскиваются*/
    type: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
};
