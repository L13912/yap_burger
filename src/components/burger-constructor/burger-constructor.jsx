import React, {useState, useEffect, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import {IngredientsProps} from "../../types/ingredientsProps";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {ADD_CONSTRUCTOR_INGREDIENT, DELETE_CONSTRUCTOR_INGREDIENT} from "../../services/actions/actions";


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.reducer.constructorIngredients);
    const [total, setTotal] = React.useState(0);
    const [isVisible, setVisible] = useState(false);
    const handleCloseModal = (e) => {
        setVisible(false);
    }

    const constructor = `mt-5 ml-5 ${styles.constructor}`;
    const list = `mt-10 ${styles.list}`;
    const listItem = `mr-1 ${styles.listItem}`;
    const top = `${styles.top}`;
    const center = `custom-scroll  ${styles.center}`;
    const bottom = `${styles.bottom}`;
    const totalClass = `mt-10 ${styles.total}`;
    const totalCountClass = `mr-2 text text_type_digits-medium ${styles.totalCount}`;
    const totalContClass = `mr-10 ${styles.totalCont}`;

    function calcSum(ingredients) {
        let sum  = 0;
        for (let bun of ingredients.buns) sum += bun.price;
        for (let topping of ingredients.toppings) sum += topping.price;
        return sum;
    }

    useEffect(()=> {
        const res = calcSum(ingredients);
        setTotal(res);
    },[ingredients])

    const [, dropRef] = useDrop({
    accept: "card",
    drop(card) {
        console.log(card)
      dispatch({
        type: ADD_CONSTRUCTOR_INGREDIENT,
        ...card
      })
    },
});

const deleteIngredient = (guid) => {
  dispatch({
    type: DELETE_CONSTRUCTOR_INGREDIENT,
    guid
  })
}

    return (
        <>
            <div className={constructor} ref={dropRef}>
                {total === 0 && <div className={styles.info}>
                    Выберите булки, начинки и соусы в левой части, и перетащите сюда
                </div>}
                {total !== 0 &&  <section className={list}>
                    <div className={top}>
                        {ingredients.buns[0] && <div className={listItem}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={ingredients.buns[0].name + ' (верх)'}
                                price={ingredients.buns[0].price}
                                thumbnail={ingredients.buns[0].image}
                            />
                        </div>}
                    </div>
                    <div className={center}>
                        {ingredients.toppings && ingredients.toppings.map((card) => (
                            <div key={card.guid} className={listItem}>
                                <DragIcon type="primary"/>
                                <ConstructorElement handleClose= { () => {deleteIngredient(card.guid)}}
                                    text={card.name}
                                    price={card.price}
                                    thumbnail={card.image}
                                />
                            </div>
                        ))}
                    </div>

                    <div className={bottom}>
                        {ingredients.buns[0] && <div className={listItem}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={ingredients.buns[0].name + ' (низ)'}
                                price={ingredients.buns[0].price}
                                thumbnail={ingredients.buns[0].image}
                            />
                        </div>}
                    </div>
                </section>}
                {total !== 0 && <div className={totalClass}>
                    <div className={totalContClass}>
                        <p className={totalCountClass}>{total}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="large"
                            onClick={() => setVisible(!isVisible)}
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
        </>
    )
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientsProps)
}
export default BurgerConstructor;
