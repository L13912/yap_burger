import React, {useRef, useEffect } from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({children, close}) => {
    const modal = useRef(null);

    window.onkeydown = (e) => {
        if (e.key === 'Escape') close();
    }

    let closeModal = () => {};

    useEffect(() => {
        closeModal = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.target !== modal.current) return;
            close();
        };
    }, [modal])

    return (
        <div className={styles.modalOverlay} ref={modal}
             onClick={(e) => { closeModal(e) }
        }>
            {children}
        </div>
    )
};

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
    close: PropTypes.func.isRequired
};

export default ModalOverlay;
