import React, {useState} from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "../ingredient-card/ingredient-card";

const BurgerIngredients = ({}) => {

    const [current, setCurrent] = React.useState('Булки')
    const ingredients = `mt-5 mr-5 ${styles.ingredients}`;
    const type = `mt-10 ${styles.type}`;
    const title = `mb-6 ${styles.title}`;
    const cards = `ml-4 mb-8 ${styles.cards}`;

    return (
        <div className={ingredients}>
            <nav className={styles.tabs}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </nav>

            <section className={type}>
                <h2 className={title}>Булки</h2>
                <div className={cards}>
                    <IngredientCard/>
                    <IngredientCard/>
                    <IngredientCard/>
                </div>

            </section>
        </div>
    );
};

export default BurgerIngredients;
