import React, {FC} from 'react';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './commonStyles.module.css';

const Ingredient:FC = () => {
    return (
        <div className={styles.ingredient}>
            <span className='text text_type_main-large mt-10 mr-10 ml-10'>Детали ингредиента</span>
            <IngredientDetails/>
        </div>
    );
}

export default Ingredient;
