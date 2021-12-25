import React, { useCallback, useState } from 'react';
import styles from './commonStyles.module.css';
import { useAuth } from '../services/auth';
import {Link, Redirect} from 'react-router-dom';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Profile() {
    /*  let auth = useAuth();*/

    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    /*  let login = useCallback(
        e => {
          e.preventDefault();
          auth.signIn(form);
        },
        [auth, form]
      );

      if (auth.user) {
        return (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
      }*/

    const linkClasses = `${styles.profileLink} text text_type_main-medium text_color_inactive pl-2`
    const activeLinkClasses = `${styles.profileLink} mt-10 text text_type_main-medium text_color_primary pl-2`
    return (
        <div className={styles.profilePage}>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link to='/profile' className={activeLinkClasses}>Профиль</Link>
                    </li>
                    <li>
                        <Link to='/orders' className={linkClasses}>История заказов</Link>
                    </li>
                    <li>
                        <Link to='/' className={linkClasses}>Выход</Link>
                    </li>
                </ul>
                <p className={'text text_type_main-default text_color_inactive mt-10 pt-10'}>В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </nav>
            <form className={'form'}>
                <Input placeholder="Имя" value={form.email} name="name" onChange={onChange}  icon={'EditIcon'} />
                <div  className={'mb-6'}/>
                <Input placeholder="Email" value={form.email} name="email" onChange={onChange} icon={'EditIcon'} />
                <div  className={'mb-6'}/>
                <Input
                    placeholder="Password"
                    value={form.password}
                    name="password"
                    onChange={onChange}
                    icon={'EditIcon'}
                />
            </form>
        </div>
    );
}
