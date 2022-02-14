import React, { useState, FC, ChangeEvent, FormEvent } from 'react'
import styles from './commonStyles.module.css'
import { Link, Redirect } from 'react-router-dom'
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../utils/hooks'
import { resetPassword } from '../services/actions/user-actions'

const ResetPassword: FC = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.userReducer.user)
  const [form, setValue] = useState({ password: '', token: '', name: '', email: '' })
  const forgotPasswordSuccess = useSelector(store => store.userReducer.forgotPasswordSuccess)
  const resetPasswordSuccess = useSelector(store => store.userReducer.resetPasswordSuccess)

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  function onSubmit(e: FormEvent): void {
    e.preventDefault()
    dispatch(resetPassword(form))
  }

  const linkClasses = `mt-10 text text_type_main-default pl-2 ${styles.link}`
  return user.email !== '' ? (
    <Redirect to={{ pathname: '/' }} />
  ) : resetPasswordSuccess ? (
    <Redirect to={{ pathname: '/' }} />
  ) : forgotPasswordSuccess ? (
    <div className={styles.page}>
      <form onSubmit={onSubmit}>
        <h1 className={'text text_type_main-medium mb-6'}>Восстановление пароля</h1>
        <PasswordInput value={form.password} name="password" onChange={onChange} />
        <div className={'mb-6'} />
        <Input placeholder="Введите код из письма" value={form.token} name="token" onChange={onChange} />
        <div className={'mb-6'} />
        <Button type="primary">Сохранить</Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive mt-10 pt-10  mb-4'}>
        Вспомнили пароль?
        <Link to="/login" className={linkClasses}>
          Войти
        </Link>
      </p>
    </div>
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  )
}

export default ResetPassword
