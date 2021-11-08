import React, {useState} from 'react';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import {Box} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({}) => {

    const [current, setCurrent] = React.useState('Булки')

    return (
        <main style={{display: 'flex'}}>
            <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                Начинки
            </Tab>
        </main>

    );
};

export default BurgerIngredients;
