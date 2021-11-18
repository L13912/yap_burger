import React, {useState} from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "../ingredient-card/ingredient-card";

const BurgerIngredients = ({data}) => {

    const [current, setCurrent] = React.useState('Булки')
    const ingredients = `mt-5 mr-5 ${styles.ingredients}`;
    const type = `mt-10 ${styles.type}`;
    const title = `mb-6 ${styles.title}`;
    const cards = `ml-4 mb-8 ${styles.cards}`;

    const buns = [];
    const sauces = [];
    const main = [];

    function sortData(data) {
        for (const item of data) {
            if (item.type === 'bun') buns.push(item);
            if (item.type === 'sauce') sauces.push(item);
            if (item.type === 'main') main.push(item);
        }
    }
    sortData(data);
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
                    {buns.map((card) => (
                        <IngredientCard key={card._id} card={card}/>
                    ))}
                </div>
            </section>
            <section className={type}>
                <h2 className={title}>Соусы</h2>
                <div className={cards}>
                    {sauces.map((card) => (
                        <IngredientCard key={card._id} card={card}/>
                    ))}
                </div>
            </section>
            <section className={type}>
                <h2 className={title}>Начинки</h2>
                <div className={cards}>
                    {main.map((card) => (
                        <IngredientCard key={card._id} card={card}/>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BurgerIngredients;
