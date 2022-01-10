import React, {useState} from 'react';
import styles from './commonStyles.module.css';
import {Link, Redirect} from 'react-router-dom';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from '../services/actions/user-actions';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const user = useSelector(store => store.userReducer.user);
    const forgotPasswordSuccess = useSelector(store => store.userReducer.forgotPasswordSuccess);
    const [form, setValue] = useState({email: ''});

    function onSubmit(e) {
        e.preventDefault();
        dispatch(forgotPassword(form));
    }

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const linkClasses = `mt-10 text text_type_main-default pl-2 ${styles.link}`

    return (
        user ?
            <Redirect
                to={{pathname: '/'}}
            /> :
            forgotPasswordSuccess ?
                <Redirect to={{pathname: '/reset-password'}}
                />
                :
                <div className={styles.page}>
                    <form onSubmit={onSubmit}>
                        <h1 className={'text text_type_main-medium mb-6'}>Восстановление пароля</h1>
                        <Input placeholder="Укажите e-mail" value={form.email} name="email" onChange={onChange}/>
                        <div className={'mb-6'}/>
                        <Button type='primary'>Восстановить</Button>
                    </form>
                    <p className={'text text_type_main-default text_color_inactive mt-10 pt-10  mb-4'}>Уже
                        зарегистрированы?
                        <Link to='/login' className={linkClasses}>
                            Войти
                        </Link>
                    </p>
                </div>
    );
}
