import React from 'react';
import styles from './app.module.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";

function App() {
    const titleStyles = `text text_type_main-large pt-4 ${styles.title}`;
    const contentStyles = `${styles.content}`;
  return (
    <div className="App">
      <AppHeader/>
        <div className={contentStyles}>
            <h1 className={titleStyles}>Соберите бургер</h1>
            <BurgerIngredients/>
        </div>
    </div>
  );
}

export default App;
