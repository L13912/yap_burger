import { useState, useEffect, FC, FocusEvent, ChangeEvent, FormEvent, SyntheticEvent } from 'react'
import styles from './commonStyles.module.css'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../utils/hooks'
import { logoutUser, patchUser } from '../services/actions/user-actions'
import Orders from '../components/orders/orders'

const Profile: FC = () => {
  const user = useSelector(store => store.userReducer.user)
  const location = useLocation()
  const [edited, setEdited] = useState(false)
  const dispatch = useDispatch()
  const [form, setValue] = useState({ ...user, password: '12345678' })
  const [touched, setTouched] = useState<Array<string>>([])

  const isOrders = user.email !== '' && location.pathname === '/profile/orders'

  useEffect(() => {
    setValue({ ...user, password: '12345678' })
  }, [user])

  function onFocus(e: FocusEvent<HTMLFormElement>): void {
    e.preventDefault()
    if (e.target.name === 'password') {
      setValue({ ...form, password: '' })
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    setEdited(true)
    if (!touched.includes(e.target.name)) setTouched([...touched, e.target.name])
    setValue({ ...form, [e.target.name]: e.target.value })
  }

  function onSave(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    const body: any = {}
    // @ts-ignore
    touched.forEach(el => (body[el] = form[el]))
    setTouched([])
    setEdited(false)
    dispatch(patchUser(body))
  }

  function onCancel(e: SyntheticEvent): void {
    e.preventDefault()
    setValue({ ...user, password: '12345678' })
    setEdited(false)
  }

  const logout = () => dispatch(logoutUser(user))

  const linkClasses = `${styles.profileLink} text text_type_main-medium text_color_inactive pl-2`
  const activeLinkClasses = `${styles.profileLink} mt-10 text text_type_main-medium text_color_primary pl-2`
  return user.email === '' ? (
    <Redirect
      to={{
        pathname: '/login'
      }}
    />
  ) : (
    <div className={styles.profilePage}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/profile" className={!isOrders ? activeLinkClasses : linkClasses}>
              Профиль
            </Link>
          </li>
          <li>
            <Link to="/profile/orders" className={isOrders ? activeLinkClasses : linkClasses}>
              История заказов
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={logout} className={linkClasses}>
              Выход
            </Link>
          </li>
        </ul>
        <p className={'text text_type_main-default text_color_inactive mt-10 pt-10'}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      {!isOrders ? (
        <form className={'form'} onFocus={onFocus} onSubmit={onSave}>
          <Input placeholder="Имя" value={form.name} name="name" onChange={onChange} icon={'EditIcon'} />
          <div className={'mb-6'} />
          <Input placeholder="Email" value={form.email} name="email" onChange={onChange} icon={'EditIcon'} />
          <div className={'mb-6'} />
          <Input placeholder="Password" value={form.password} name="password" onChange={onChange} icon={'EditIcon'} type="password" />
          {edited && (
            <div className="mt-10">
              <Button type="secondary" onClick={onCancel}>
                Отмена
              </Button>
              <Button>Сохранить</Button>
            </div>
          )}
        </form>
      ) : (
        <Orders />
      )}
    </div>
  )
}

export default Profile
