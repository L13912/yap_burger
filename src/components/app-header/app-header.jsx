import React, {} from 'react';
import styles from './app-header.module.css';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';


const AppHeader = ({}) => {
    const headerStyles = `mb-5 ${styles.header}`
    const navStyles = `${styles.nav}`
    const itemStyles = `pr-5 pl-5 ${styles.navItem}`
    const logoStyles = `pt-4 pr-5 pb-4 pl-5 ${styles.logo}`
    return (
        <header className={headerStyles}>
            <div className={styles.content}>
                <nav className={navStyles}>
                    <h2  className={itemStyles} >
                        <BurgerIcon type="primary"/>
                        <span className="text text_type_main-default pl-2">Конструктор</span>
                    </h2>
                    <h2  className={itemStyles}>
                        <ListIcon type="primary"/>
                        <span  className="text text_type_main-default pl-2">Лента заказов</span>
                    </h2>
                </nav>
                <h2  className={logoStyles}>
                    <Logo/>
                </h2>
                <h2 className={styles.login}>
                    <ProfileIcon type="primary"/>
                    <span  className="text text_type_main-default pl-2">Личный кабинет</span>
                </h2>
            </div>
        </header>

    );
};

export default AppHeader;
