import React, {useState} from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import img from '../../images/img.png';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "../ingredient-card/ingredient-card";

const BurgerConstructor = ({data}) => {
    const constructor = `mt-5 ml-5 ${styles.constructor}`;
    const list = `mt-10 ${styles.list}`;
    const listItem = `${styles.listItem}`;
    const top = `${styles.top}`;
    const center = `${styles.center}`;
    const bottom = `${styles.bottom}`;
    const total = `mt-10 ${styles.total}`;
    const totalCount = `mr-2 text text_type_digits-medium ${styles.totalCount}`;
    const totalCont = `mr-10 ${styles.totalCont}`;

    console.log(data);
    const bun = data[0];
    data.splice(0, 1);
    const items = data;
    return (
        <div className={constructor}>
            <section className={list}>
                <div className={top}>
                    {bun && <div className={listItem}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div> }
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
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div> }
                </div>
            </section>
            <div className={total}>
                <div className={totalCont}>
                    <p className={totalCount}>610</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
};

export default BurgerConstructor;
