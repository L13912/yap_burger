import React, {useEffect, useState, FC, ChangeEvent, FormEvent} from 'react';
import styles from './commonStyles.module.css';
import {Link, Redirect} from 'react-router-dom';
import {loginUser} from '../services/actions/user-actions';
import {Input, Button, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';

const Login:FC = () => {
    const dispatch = useDispatch();
    //@ts-ignore - Помогите пожалуйста - как типизировать хуки  react-router-dom? Не нашла документации
    const history = useHistory() as any;
    const user = useSelector((store:any) => store.userReducer.user);
    const [form, setValue] = useState({email: '', password: ''});
    const loginUserSuccess = useSelector((store:any) => store.userReducer.loginUserSuccess);

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(loginUser(form));
    }

    useEffect(() => {
        console.log('use eff')
        if (loginUserSuccess) history.replace('/')
    }, [loginUserSuccess])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const fromPage = history.location?.state?.from;

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


export default Login;
