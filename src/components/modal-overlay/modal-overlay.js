import React, {useRef, useEffect } from 'react';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({children, close}) => {

    window.onkeydown = (e) => {
        if (e.key === 'Escape') close();
    }

    return (
        <div className={styles.modalOverlay} onClick={close}>
            {children}
        </div>
    )
};

export default ModalOverlay;
