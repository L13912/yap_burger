import React, {FC, SyntheticEvent} from 'react';
import styles from './modal-overlay.module.css';
import {TModalOverlay} from "../../types/data-types";

const ModalOverlay:FC<TModalOverlay> = ({children, close}) => {

    const handleOverlayClick = (e: SyntheticEvent) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) close();
    }

    return (
        <div className={styles.modalOverlay}
             onClick={handleOverlayClick}
        >
            {children}
        </div>
    )
};

export default ModalOverlay;
