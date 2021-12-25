import React, { useCallback, useState } from 'react';
import styles from './commonStyles.module.css';
import { useAuth } from '../services/auth';
import {Link, Redirect} from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ForgotPassword() {
    /*  let auth = useAuth();*/

    const [form, setValue] = useState({email: ''});

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

    const linkClasses = `mt-10 text text_type_main-default pl-2 ${styles.link}`

    return (
        <div className={styles.page}>
            <form className={''}>
                <h1 className={'text text_type_main-medium mb-6'}>Восстановление пароля</h1>
                <Input placeholder="Укажите e-mail" value={form.email} name="email" onChange={onChange} />
                <div  className={'mb-6'}/>
                <Button  primary={true}>Восстановить</Button>
            </form>
            <p className={'text text_type_main-default text_color_inactive mt-10 pt-10  mb-4'}>Уже зарегистрированы?
                <Link to='/login' className={linkClasses}>
                    Войти
                </Link>
            </p>
        </div>
    );
}
/*onClick={login}*/
