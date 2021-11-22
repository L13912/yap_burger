import React from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from "prop-types";
import {IngredientsProps} from "../../types/ingredientsProps";

const BurgerIngredients = ({ingredients}) => {

    const [current, setCurrent] = React.useState('Булки')
    const ingredientsClasses = `mt-5 mr-5 ${styles.ingredients}`;
    const title = `mb-6 ${styles.title}`;
    const cards = `ml-4 mb-8 ${styles.cards}`;
    const scrollContClasses = `custom-scroll mt-10 mb-10 ${styles.scrollCont}`;

    const buns = [];
    const sauces = [];
    const main = [];

    function sortIngredients(ingredients) {
        for (const item of ingredients) {
            if (item.type === 'bun') buns.push(item);
            if (item.type === 'sauce') sauces.push(item);
            if (item.type === 'main') main.push(item);
        }
    }
    sortIngredients(ingredients);
    return (
        <div className={ingredientsClasses}>
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
        <div className={scrollContClasses}>
            <section>
                <h2 className={title}>Булки</h2>
                <div className={cards}>
                    {buns.map((card) => (
                        <IngredientCard  key={card._id} card={card}/>
                    ))}
                </div>
            </section>
            <section>
                <h2 className={title}>Соусы</h2>
                <div className={cards}>
                    {sauces.map((card) => (
                        <IngredientCard key={card._id} card={card}/>
                    ))}
                </div>
            </section>
            <section>
                <h2 className={title}>Начинки</h2>
                <div className={cards}>
                    {main.map((card) => (
                        <IngredientCard key={card._id} card={card}/>
                    ))}
                </div>
            </section>
        </div>
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(IngredientsProps).isRequired
}

export default BurgerIngredients;
