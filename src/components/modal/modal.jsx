import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({children, close, title}) => {
    const modalRoot = document.getElementById("react-modals");

    Modal.propTypes = {
        children: PropTypes.element,
        close: PropTypes.func,
        title: PropTypes.string
    };

    const closeIconClasses = `mt-15 mr-10 ${styles.closeIcon}`;
    const modalClasses = `pt-30 pb-30 pl-25 pr-25 ${styles.orderDetails}`;
    const titleClasses = ` ml-10 mt-15 text text_type_main-large ${styles.title}`

    return createPortal(
        <ModalOverlay close={close}>
            <div className={modalClasses}>
                {title && <h3 className={titleClasses}>{title}</h3>
                }
                <div className={closeIconClasses} onClick={close}>
                    <CloseIcon type="primary"/>
                </div>
                {children}
            </div>
        </ModalOverlay>
        , modalRoot
    )
};

export default Modal;
