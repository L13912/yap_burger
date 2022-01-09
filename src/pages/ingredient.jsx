import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './commonStyles.module.css';

export default function Ingredient() {
    return (
        <div className={styles.ingredient}>
            <span className='text text_type_main-large mt-10 mr-10 ml-10'>Детали ингредиента</span>
            <IngredientDetails />
        </div>
    );
}
