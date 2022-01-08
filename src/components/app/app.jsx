import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    Switch,
    Route,
    useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NotFound from '../../pages/not-found';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import {getUser} from '../../services/actions/user-actions';


function App() {
    const location = useLocation();
    const background = location.state && location.state.background;
    const dispatch = useDispatch();

    dispatch(getUser())

    const titleClasses = `text text_type_main-large pt-4 ${styles.title}`;
    return (
        <div className="App">
            <AppHeader/>
            <Switch>
                <Route path={'/'} exact={true}>
                    <div className={styles.content}>
                        <h1 className={titleClasses}>Соберите бургер</h1>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </DndProvider>
                    </div>
                </Route>
                <Route path='/login' component={Login} exact={true}/>
                <Route path='/register' component={Register} exact={true}/>
                <Route path='/forgot-password' component={ForgotPassword} exact={true}/>
                <Route path='/reset-password' component={ResetPassword}/>
                <Route path='/profile' component={Profile}/>
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

export default App;
