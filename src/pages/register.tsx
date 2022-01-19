import React, { useState, FC, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './commonStyles.module.css';
import { Link, Redirect } from 'react-router-dom';
import { registerUser } from '../services/actions/user-actions';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const Register: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.userReducer.user);
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const registerUserSuccess = useSelector((store: any) => store.userReducer.registerUserSuccess);

  function onSubmit(e: FormEvent): void {
    e.preventDefault();
    dispatch(registerUser(form));
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const linkClasses = `mt-10 text text_type_main-default pl-2 ${styles.link}`;

  return user ? (
    <Redirect to={{ pathname: '/' }} />
  ) : registerUserSuccess ? (
    <Redirect to={{ pathname: '/' }} />
  ) : (
    <div className={styles.page}>
      <form onSubmit={onSubmit}>
        <h1 className={'text text_type_main-medium mb-6'}>Регистрация</h1>
        <Input placeholder="Имя" value={form.name} name="name" onChange={onChange} />
        <div className={'mb-6'} />
        <Input placeholder="Email" value={form.email} name="email" onChange={onChange} />
        <div className={'mb-6'} />
        <PasswordInput value={form.password} name="password" onChange={onChange} />
        <div className={'mb-6'} />
        <Button type="primary">Зарегистрироваться</Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive mt-10 pt-10  mb-4'}>
        Уже зарегистрированы?
        <Link to="/login" className={linkClasses}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;
