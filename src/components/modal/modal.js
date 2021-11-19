import React, {} from 'react';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({children, close, title}) => {

    const closeIcon = `mt-15 mr-10 ${styles.closeIcon}`;
    const modalStyles = `pt-30 pb-30 pl-25 pr-25 ${styles.orderDetails}`;
    const titleStyles = ` ml-10 mt-15 text text_type_main-large ${styles.title}`

        return (
            <div className={modalStyles}>
                {title && <h3 className={titleStyles}>{title}</h3>
                }
                <div className={closeIcon} onClick={close} >
                    <CloseIcon  type="primary"/>
                </div>
                {children}
            </div>

        )
};

export default Modal;
