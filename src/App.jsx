import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './app.module.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";

import OrderDetails from "./components/order-details/order-details";
import doRequest from "./utils/doRequest";

function App() {

    const [state, setState] = React.useState({
        isLoading: false,
        error: false,
        data: []
    })

    useEffect(() => {
        doRequest()
            .then(res => {
               setState({ ...state, data: res.data})
            })
            .catch(err => {
                setState({ ...state, error: err})
            });
    }, []);

    console.log(state.data);


    const titleStyles = `text text_type_main-large pt-4 ${styles.title}`;
    const contentStyles = `${styles.content}`;
  return (
    <div className="App">
      <AppHeader/>
        <div className={contentStyles}>
            <h1 className={titleStyles}>Соберите бургер</h1>
            <BurgerIngredients data={state.data}/>
            <BurgerConstructor data={state.data}/>
{/*            <OrderDetails/>*/}
        </div>
    </div>
  );
}

export default App;
