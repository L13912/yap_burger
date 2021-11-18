import React from 'react';
import styles from './app.module.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import OrderDetails from "./components/order-details/order-details";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

function App() {
    const titleStyles = `text text_type_main-large pt-4 ${styles.title}`;
    const contentStyles = `${styles.content}`;
  return (
    <div className="App">
      <AppHeader/>
        <div className={contentStyles}>
            <h1 className={titleStyles}>Соберите бургер</h1>
            <BurgerIngredients/>
            <BurgerConstructor/>
{/*            <OrderDetails/>*/}
        </div>
    </div>
  );
}

export default App;
