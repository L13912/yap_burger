import React, {useState} from 'react';
import styles from './ingredient-card.module.css';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import image from '../../images/img.png';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Portal from "../../utils/create-portal";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";

const IngredientCard = ({card}) => {
    IngredientCard.propTypes = {
        card: PropTypes.object
    };

    const [isOn, setOn] = useState(false);

    const handleCloseModal = () => {
        setOn(false );
    }

    const cardStyles = `mt-5 mr-5 mb-8 ${styles.card}`;
    const costStyles  = `mt-1 mr-5 ${styles.cost}`;
    const descriptionStyles  = `mt-5 mr-5 text text_type_main-default ${styles.description}`;

    return (
        <div className={cardStyles} onClick={() => setOn(!isOn)}>
            <Counter count={1} size="default" />
            <div className={image}>
                <img className={styles.image} alt='Фото ингредиента' src={card.image}/>
            </div>
            <div className={costStyles }>
                <p className="pr-1 text text_type_digits-default">{card.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={descriptionStyles}>{card.name}</p>
            {
                isOn &&
                <Portal>
                    <ModalOverlay  close={handleCloseModal}>
                        <Modal close={handleCloseModal} title={"Детали ингредиента"}>
                            <IngredientDetails card={card}/>
                        </Modal>
                    </ModalOverlay>
                </Portal>
            }
        </div>
    );
};

export default IngredientCard;
