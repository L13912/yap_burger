import React, {} from 'react';
import styles from './app-header.module.css';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Typography} from '@ya.praktikum/react-developer-burger-ui-components';
import {Box} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = ({}) => {
    return (
        <header className='m-5' style={{display: 'flex'}}>
            <nav className='p-5'  style={{display: 'flex'}}>
                <h2  className="pt-4 pr-5 pb-4 pl-5" >
                    <BurgerIcon type="primary"/>
                    <span className="text text_type_main-default pl-2">Конструктор</span>
                </h2>
                <h2  className={styles.navItem}>
                    <ListIcon type="primary"/>
                    <span  className="text text_type_main-default pl-2">Лента заказов</span>
                </h2>
                <h2  className={styles.navItem}>
                    <Logo/>
                </h2>
            </nav>
            <h2 className={styles.login}>
                <ProfileIcon type="primary"/>
                <span  className="text text_type_main-default pl-2">Личный кабинет</span>
            </h2>
        </header>

    );
};

export default AppHeader;
