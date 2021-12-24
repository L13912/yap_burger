import React, {} from 'react';
import styles from './app-header.module.css';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from "react-router-dom";


const AppHeader = () => {
    const headerClasses = `mb-5 ${styles.header}`
    const navClasses = `${styles.nav}`
    const itemClasses = `pr-5 pl-5 ${styles.navItem}`
    const logoClasses = `pt-4 pr-5 pb-4 pl-5 ${styles.logo}`
    return (
        <header className={headerClasses}>
            <div className={styles.content}>
                <nav className={navClasses}>
                    <Link to='/' className={itemClasses} >
                        <h2>
                            <BurgerIcon type="primary"/>
                            <span className="text text_type_main-default pl-2">Конструктор</span>
                        </h2>
                    </Link>
                    <h2  className={itemClasses}>
                        <ListIcon type="secondary"/>
                        <span  className="text text_type_main-default pl-2 text_color_inactive">Лента заказов</span>
                    </h2>
                </nav>
                <h2  className={logoClasses}>
                    <Link to='/'>
                        <Logo/>
                    </Link>
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
