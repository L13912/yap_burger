import React, {} from 'react';
import styles from './modal-overlay.module.css';
import ReactDOM from 'react';
import OrderDetails from "../order-details/order-details";


const ModalOverlay = ({children}) => {
        return (
            <div className={styles.modalOverlay}>
                    {children}
            </div>
        )
};

export default ModalOverlay;
