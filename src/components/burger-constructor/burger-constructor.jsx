import React, {useState} from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import {IngredientsProps} from "../../types/ingredientsProps";

const BurgerConstructor = ({ingredients}) => {
    const [isOn, setOn] = useState(false);
    const handleCloseModal = () => {
        setOn(false);
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

    let items = [];
    const bun = ingredients[0];
    for (let i = 1; i < ingredients.length; i++) {
        items.push(ingredients[i]);
    }

    return (
        <div className={constructor}>
            <section className={list}>
                <div className={top}>
                    {bun && <div className={listItem}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name + ' (верх)'}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>}
                </div>
                {items && <div className={center}>
                    {items.map((card) => (
                        <div key={card._id} className={listItem}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={card.name}
                                price={card.price}
                                thumbnail={card.image}
                            />
                        </div>
                    ))}
                </div>
                }

                <div className={bottom}>
                    {bun && <div className={listItem}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name + ' (низ)'}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>}
                </div>
            </section>
            <div className={total}>
                <div className={totalCont}>
                    <p className={totalCount}>610</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large"
                        onClick={() => setOn(!isOn)}
                >
                    Оформить заказ
                </Button>
                {
                    isOn &&
                    <Modal close={handleCloseModal}>
                        <OrderDetails/>
                    </Modal>
                }
            </div>
        </div>
    )
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientsProps).isRequired
}
export default BurgerConstructor;
