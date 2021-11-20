import React, {useState} from 'react';
import styles from './ingredient-card.module.css';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import image from '../../images/img.png';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import {IngredientCardProps} from "../../types/ingredientsProps";

const IngredientCard = ({card}) => {
    const [isOn, setOn] = useState(false);

    const handleCloseModal = () => {
        setOn(false);
    }

    const cardClasses = `mt-5 mr-5 mb-8 ${styles.card}`;
    const costClasses = `mt-1 mr-5 ${styles.cost}`;
    const descriptionClasses = `mt-5 mr-5 text text_type_main-default ${styles.description}`;

    return (
        <div className={cardClasses} onClick={() => setOn(!isOn)}>
            <Counter count={1} size="default"/>
            <div className={image}>
                <img className={styles.image} alt='Фото ингредиента' src={card.image}/>
            </div>
            <div className={costClasses}>
                <p className="pr-1 text text_type_digits-default">{card.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={descriptionClasses}>{card.name}</p>
            {
                isOn &&
                <Modal close={handleCloseModal} title={"Детали ингредиента"}>
                        <IngredientDetails card={card}/>
                </Modal>
            }
        </div>
    );
};

IngredientCard.propTypes = {
    card: PropTypes.shape(IngredientCardProps)
};

export default IngredientCard;
