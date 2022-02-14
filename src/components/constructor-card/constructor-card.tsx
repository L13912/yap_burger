import React, {useRef, FC} from 'react';
import styles from './constructor-card.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from '../../utils/hooks';
import {useDrag, useDrop} from 'react-dnd';
import {
    DELETE_CONSTRUCTOR_INGREDIENT
} from "../../services/actions/actions";
import {TCard, TConstCard} from "../../types/data-types";

export const ConstructorCard: FC<TConstCard> = ({card, moveCard, type, index}) => {
    const dispatch = useDispatch();
    const moveRef = useRef(null);
    const ingredients = useSelector(store => store.reducer.constructorIngredients);

    const listItem = `mr-1 ${styles.listItem}`;

    const deleteIngredient = (guid: string) => {
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
        hover: (card: TCard) => {
            const dragIndex: number = ingredients.toppings.findIndex((elem: { _id: string; }) => elem._id === card._id);
            if (dragIndex === -1) return;
            if (moveCard) moveCard(dragIndex, index)
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
                isLocked={true}
                text={card.name + ' (верх)'}
                price={card.price}
                thumbnail={card.image}
            />
            :
            type === 'bottom' ?
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={card.name + ' (низ)'}
                    price={card.price}
                    thumbnail={card.image}
                /> :
                <div
                    ref={moveRef}
                    style={{opacity}}
                    className={listItem}>
                    <DragIcon type="primary"/>
                    <ConstructorElement handleClose={() => {
                        deleteIngredient(card.guid!)
                    }}
                                        text={card.name}
                                        price={card.price}
                                        thumbnail={card.image}
                    />
                </div>
    );
}
