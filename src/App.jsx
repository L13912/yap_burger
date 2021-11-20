import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
import getIngredients from "./utils/getIngredients";

function App() {

    const [state, setState] = React.useState({
        isLoading: false,
        error: false
    })

    const [ingredients, setIngredients] = React.useState({
        ingredientsData: []
    })

    useEffect(() => {
        getIngredients()
            .then(res => {
                setIngredients({ingredientsData: res.data})
                console.log(res.data)
            })
            .catch(err => {
                setState({...state, error: err})
            });
    }, []);

    const titleClasses = `text text_type_main-large pt-4 ${styles.title}`;
    return (
        <div className="App">
            <AppHeader/>
            <div className={styles.content}>
                <h1 className={titleClasses}>Соберите бургер</h1>
                <BurgerIngredients ingredients={ingredients.ingredientsData}/>
                <BurgerConstructor ingredients={ingredients.ingredientsData}/>
            </div>
            <div id="react-modals"/>
        </div>
    );
}

export default App;
