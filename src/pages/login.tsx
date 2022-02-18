import React, { useEffect, useState, FC, ChangeEvent, FormEvent } from 'react'
import styles from './commonStyles.module.css'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../services/actions/user-actions'
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../utils/hooks'
import { useHistory } from 'react-router-dom'
import {PUBLIC_URL} from "../constants";

const pUrl = PUBLIC_URL;

const Login: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory() as any
  const user = useSelector(store => store.userReducer.user)
  const [form, setValue] = useState({ email: '', password: '', name: '' })
  const loginUserSuccess = useSelector(store => store.userReducer.loginUserSuccess)
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(loginUser(form))
  }

  const fromPage = history.location?.state?.from;
  useEffect(() => {
    if (loginUserSuccess) {
      history.replace(fromPage);
    }
  }, [loginUserSuccess])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  const linkClasses = `mt-10 text text_type_main-default pl-2 ${styles.link}`

  return user.email !== '' && fromPage ? (
    <Redirect to={fromPage} />
  ) : user.email !== '' ? (
    <Redirect to={{ pathname: `${pUrl}/` }} />
  ) : (
    <div className={styles.page}>
      <form onSubmit={onSubmit}>
        <h1 className={'text text_type_main-medium mb-6'}>Вход</h1>
        <Input placeholder="Email" value={form.email} name="email" onChange={onChange} />
        <div className={'mb-6'} />
        <PasswordInput value={form.password} name="password" onChange={onChange} />
        <div className={'mb-6'} />
        <Button type="primary">Войти</Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive mt-10 pt-10  mb-4'}>
        Вы - новый пользователь?
        <Link to={`${pUrl}/register`} className={linkClasses}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={'text text_type_main-default text_color_inactive  mb-4'}>
        Забыли пароль?
        <Link to={`${pUrl}/forgot-password`} className={linkClasses}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  )
}

export default Login
