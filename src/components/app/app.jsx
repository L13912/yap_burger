import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

    const titleClasses = `text text_type_main-large pt-4 ${styles.title}`;
    return (
        <div className="App">
            <AppHeader/>
            <div className={styles.content}>
                <h1 className={titleClasses}>Соберите бургер</h1>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </div>
        </div>
    );
}

export default App;