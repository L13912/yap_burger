import React, { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from "./components/app-header/app-header";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "./components/burger-constructor/burger-constructor";
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

    const titleStyles = `text text_type_main-large pt-4 ${styles.title}`;
    const contentStyles = `${styles.content}`;
  return (
    <div className="App">
      <AppHeader/>
      <div className={contentStyles}>
            <h1 className={titleStyles}>Соберите бургер</h1>
            <BurgerIngredients data={state.data}/>
            <BurgerConstructor data={state.data}/>
      </div>
      <div id="react-modals"/>
    </div>
  );
}

export default App;
