import React, {} from 'react';
import styles from './app-header.module.css';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom';


const AppHeader = () => {
    const location = useLocation();
    const currentPage = location.pathname.split('/')[1];

    const headerClasses = `mb-5 ${styles.header}`
    const navClasses = `${styles.nav}`
    const itemClasses = `pr-5 pl-5 ${styles.navItem}`
    const logoClasses = `pt-4 pr-5 pb-4 pl-5 ${styles.logo}`
    const activeClass = 'text text_type_main-default pl-2';
    const inactiveClass = 'text text_type_main-default pl-2 text_color_inactive';
    return (
        <header className={headerClasses}>
            <div className={styles.content}>
                <nav className={navClasses}>
                    <Link to='/' className={itemClasses} >
                        <h2 className={styles.navItem}>
                            <BurgerIcon type={currentPage === '' ? 'primary' : 'secondary'}/>
                            <span className={currentPage === '' ? activeClass : inactiveClass}>Конструктор</span>
                        </h2>
                    </Link>
                    <Link to='/orders' className={itemClasses} >
                        <h2  className={styles.navItem}>
                            <ListIcon type={currentPage === 'orders' ? 'primary' : 'secondary'}/>
                            <span className={currentPage === 'orders' ? activeClass : inactiveClass}>Лента заказов</span>
                        </h2>
                    </Link>
                </nav>
                <h2  className={logoClasses}>
                    <Link to='/'>
                        <Logo/>
                    </Link>
                </h2>
                <Link to='/profile' className={styles.login} >
                    <h2 className={styles.login}>
                        <ProfileIcon type={currentPage === 'profile' ? 'primary' : 'secondary'}/>
                        <span className={currentPage === 'profile' ? activeClass : inactiveClass}>Личный кабинет</span>
                    </h2>
                </Link>
            </div>
        </header>
    );
};

export default AppHeader;
