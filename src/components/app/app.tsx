import React, {useEffect, FC} from 'react';
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import styles from './app.module.css';

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import NotFound from '../../pages/not-found';
import Login from '../../pages/login';
import Register from '../../pages/register';
import Ingredient from '../../pages/ingredient';
import ForgotPassword from '../../pages/forgot-password';
import ResetPassword from '../../pages/reset-password';
import Profile from '../../pages/profile';
import {getUser} from '../../services/actions/user-actions';
import ProtectedRoute from '../protected-route/protected-route';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {DELETE_INGREDIENT_DETAILS} from "../../services/actions/actions"
import {getIngredients} from '../../services/actions/actions';

const App:FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const state = location.state as any;
    const background = state && state.background;
    const refreshToken = localStorage.getItem('refreshToken');

    useEffect(() => {
        dispatch(getIngredients())
    }, [])

    useEffect(() => {
        dispatch(getUser())
    }, [refreshToken])

    const handleCloseModal = ():void  => {
        dispatch({
            type: DELETE_INGREDIENT_DETAILS
        })
        history.push('/');
    };

    const titleClasses = `text text_type_main-large pt-4 ${styles.title}`;
    return (
        <div className="App">
            <AppHeader/>
            <Switch location={background || location}>
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
                <ProtectedRoute path='/profile'>
                    <Profile/>
                </ProtectedRoute>
                <Route path='/ingredients/:id' component={Ingredient}/>
                <Route component={NotFound}/>
            </Switch>
            {background && <Route path='/ingredients/:id'>
                <Modal
                    title='Детали ингредиента'
                    close={handleCloseModal}
                >
                    <IngredientDetails/>
                </Modal>
            </Route>}
        </div>
    );
}

export default App;
