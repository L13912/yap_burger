import React, {useEffect, useState} from 'react';
import styles from './commonStyles.module.css';
import {Link, Redirect} from 'react-router-dom';
import {loginUser} from '../services/actions/user-actions';
import {Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.userReducer.user);
    const [form, setValue] = useState({email: '', password: ''});
    const loginUserSuccess = useSelector(store => store.userReducer.loginUserSuccess);

    function onSubmit(e) {
        e.preventDefault();
        dispatch(loginUser(form));
    }

    useEffect(() => {
        console.log('use eff')
        if (loginUserSuccess) history.replace('/')
    }, [loginUserSuccess])

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const fromPage = history.location.state.from;

    const linkClasses = `mt-10 text text_type_main-default pl-2 ${styles.link}`;

    return (
        user && fromPage ?
            <Redirect to={fromPage} /> :
            user ?
            <Redirect
                to={{pathname: '/'}}/> :
            <div className={styles.page}>
                <form onSubmit={onSubmit}>
                    <h1 className={'text text_type_main-medium mb-6'}>Вход</h1>
                    <Input placeholder="Email" value={form.email} name="email" onChange={onChange}/>
                    <div className={'mb-6'}/>
                    <PasswordInput
                        placeholder="Password"
                        value={form.password}
                        name="password"
                        onChange={onChange}
                    />
                    <div className={'mb-6'}/>
                    <Button type='primary'>
                        Войти
                    </Button>
                </form>
                <p className={'text text_type_main-default text_color_inactive mt-10 pt-10  mb-4'}>Вы - новый
                    пользователь?
                    <Link to='/register' className={linkClasses}>
                        Зарегистрироваться
                    </Link>
                </p>
                <p className={'text text_type_main-default text_color_inactive  mb-4'}>Забыли пароль?
                    <Link to='/forgot-password' className={linkClasses}>
                        Восстановить пароль
                    </Link>
                </p>
            </div>
    );
}
