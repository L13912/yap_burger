import {Link} from 'react-router-dom';
import styles from './not-found.module.css'

export default function NotFound404() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={'mt-10 pt-10 text text_type_main-large'}>Oops! 404 Error</h1>
                    <p>Такой страницы не существует</p>
                    <br/>
                    <Link to='/' className={'mt-10 text text_type_main-medium'}>
                        Вернитесь на главную
                    </Link>
                </div>
            </div>
        </div>
    )
}
