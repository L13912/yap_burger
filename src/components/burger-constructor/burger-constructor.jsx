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
    const total = `mt-10 ${styles.total}`;
    const totalCount = `mr-2 text text_type_digits-medium ${styles.totalCount}`;
    const totalCont = `mr-10 ${styles.totalCont}`;


    const totalValue = 0;

    const [{ isHover } , dropRef] = useDrop({
    accept: "card",
    collect: monitor => ({
        isHover: monitor.isOver(),
    }),
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

const borderColor = isHover ? 'lightgreen' : 'transparent';

    return (
        <>
            <div className={constructor} ref={dropRef}>
{/*                {totalValue === 0 && <div className={styles.info}>
                    Выберите булки, начинки и соусы в левой части, и перетащите сюда
                </div>}*/}
                {/*totalValue !== 0 && */ <section className={list}>
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
                                <ConstructorElement
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
                {totalValue !== 0 && <div className={total}>
                    <div className={totalCont}>
                        <p className={totalCount}>610</p>
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
