import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './not-found.module.css'
import { PUBLIC_URL } from '../constants'

const pUrl = PUBLIC_URL

const NotFound404: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={'mt-10 pt-10 text text_type_main-large'}>Oops! 404 Error</h1>
          <p>Такой страницы не существует</p>
          <br />
          <Link to={`${pUrl}/`} className={'mt-10 text text_type_main-medium'}>
            Вернитесь на главную
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound404
