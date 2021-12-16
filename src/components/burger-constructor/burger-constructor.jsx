import React, {useState, useEffect, useCallback} from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorCard } from '../constructor-card/constructor-card';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
    ADD_CONSTRUCTOR_INGREDIENT,
    CLEAR_CONSTRUCTOR,
    CLEAR_ORDER,
    getOrder, CHANGE_INGREDIENTS_ORDER
} from "../../services/actions/actions";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.reducer.constructorIngredients);
    const [total, setTotal] = React.useState(0);
    const [isVisible, setVisible] = useState(false);

    const clearConstructor = () => {
        dispatch({type: CLEAR_CONSTRUCTOR})
    };
    const clearOrder = () => {
        dispatch({type: CLEAR_ORDER})
    };


    const handleCloseModal = (e) => {
        setVisible(false);
        clearConstructor();
        clearOrder();
    }

    const constructor = `mt-5 ml-5 ${styles.constructor}`;
    const list = `mt-10 ${styles.list}`;
    const top = `${styles.top}`;
    const center = `custom-scroll  ${styles.center}`;
    const bottom = `${styles.bottom}`;
    const totalClass = `mt-10 ${styles.total}`;
    const totalCountClass = `mr-2 text text_type_digits-medium ${styles.totalCount}`;
    const totalContClass = `mr-10 ${styles.totalCont}`;

    function calcSum(ingredients) {
        let sum  = 0;
        for (let bun of ingredients.buns) sum += bun.price * 2;
        for (let topping of ingredients.toppings) sum += topping.price;
        return sum;
    }

    function sendOrder(event) {
        setVisible(!isVisible);
        event.preventDefault();
        const orderList = [];
        for (let bun of ingredients.buns) orderList.push(bun._id);
        for (let topping of ingredients.toppings) orderList.push(topping._id);
        dispatch(getOrder(orderList))
    }

    useEffect(()=> {
        const res = calcSum(ingredients);
        setTotal(res);
    },[ingredients])

    const [, dropRef] = useDrop({
    accept: "card",
    drop(card) {
      dispatch({
        type: ADD_CONSTRUCTOR_INGREDIENT,
        ...card
      })
    },
});


   const moveCard = useCallback( (dragIndex, hoverIndex) => {
        dispatch({
            type: CHANGE_INGREDIENTS_ORDER,
            item: ingredients.toppings,
            dragIndex, hoverIndex
        })

    },[ingredients.toppings, dispatch])

    return (
            <div className={constructor} ref={dropRef}>
                {total === 0 && <div className={styles.info}>
                    Выберите булки, начинки и соусы в левой части, и перетащите сюда
                </div>}
                {total !== 0 &&  <section className={list}>
                    <div className={top}>
                        { ingredients.buns[0] && ingredients.buns.map((card, index) => (
                        <ConstructorCard key={card.guid} index={index} card={card} type={'top'}/>
                        ))}
                    </div>
                    <div className={center}>
                        {ingredients.toppings && ingredients.toppings.map((card, index) => (
                            <ConstructorCard card={card} type={'topping'}
                                             key={card.guid}
                                             index={index}
                                             moveCard={moveCard}/>
                        ))}
                    </div>
                    <div className={bottom}>
                        { ingredients.buns[0] && ingredients.buns.map((card, index) => (
                            <ConstructorCard card={card} key={card.guid + 'b'}  index={index} type={'bottom'}/>
                        ))}
                    </div>
                </section>}
                {total !== 0 && <div className={totalClass}>
                    <div className={totalContClass}>
                        <p className={totalCountClass}>{total}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="large"
                            onClick={(event) => sendOrder(event)}
                    >
                        Оформить заказ
                    </Button>
                    {
                        isVisible &&
                        <Modal close={handleCloseModal}>
                            <OrderDetails/>
                        </Modal>
                    }
                </div>}
            </div>
    )
};

export default BurgerConstructor;
