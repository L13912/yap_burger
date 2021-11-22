import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({children, close}) => {

    const handleOverlayClick = (e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) close(e);
    }

    return (
        <div className={styles.modalOverlay}
             onClick={handleOverlayClick}
        >
            {children}
        </div>
    )
};

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    close: PropTypes.func.isRequired
};

export default ModalOverlay;
