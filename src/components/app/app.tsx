import React, {useEffect, FC} from 'react';
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Switch, Route, useLocation, useHistory} from 'react-router-dom';
import {useDispatch} from '../../utils/hooks';

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
import FeedOrderDetails from "../feed-order-details/feed-order-details";
import Feed from "../feed/feed";
import OrderCardDetails from "../../pages/order-card-details";
import ProfileOrderDetails from "../../pages/profile-order-details";
import {PUBLIC_URL} from "../../constants";

const pUrl = PUBLIC_URL;

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
        history.goBack();
    };

    const titleClasses = `text text_type_main-large pt-4 ${styles.title}`;
    return (
        <div className="App">
            <AppHeader/>
            <Switch location={background || location}>
                <Route path={`${pUrl}/`} exact={true}>
                    <div className={styles.content}>
                        <h1 className={titleClasses}>Соберите бургер</h1>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </DndProvider>
                    </div>
                </Route>
                <Route path={`${pUrl}/login`} component={Login} exact={true}/>
                <Route path={`${pUrl}/register`} component={Register} exact={true}/>
                <Route path={`${pUrl}/forgot-password`} component={ForgotPassword} exact={true}/>
                <Route path={`${pUrl}/reset-password`} component={ResetPassword}/>
                <Route path={`${pUrl}/feed/:id`} component={OrderCardDetails}/>
                <Route path={`${pUrl}/feed`}>
                    <Feed/>
                </Route>
                <ProtectedRoute path={`${pUrl}/profile/orders/:id`}>
                    <ProfileOrderDetails/>
                </ProtectedRoute>
                <ProtectedRoute path={`${pUrl}/profile/orders`}>
                    <Profile/>
                </ProtectedRoute>
                <ProtectedRoute path={`${pUrl}/profile`}>
                    <Profile/>
                </ProtectedRoute>
                <Route path={`${pUrl}/ingredients/:id`} component={Ingredient}/>
                <Route component={NotFound}/>
            </Switch>
            {background &&
            <Route path={`${pUrl}/ingredients/:id`}>
                <Modal
                    title='Детали ингредиента'
                    close={handleCloseModal}
                >
                    <IngredientDetails/>
                </Modal>
            </Route>}
            {background &&
            <ProtectedRoute path={`${pUrl}/profile/orders/:id`}>
                <Modal
                    title=''
                    close={handleCloseModal}
                >
                    <FeedOrderDetails/>
                </Modal>
            </ProtectedRoute>
            }
            {background &&
            <Route path={`${pUrl}/feed/:id`}>
                <Modal
                    title=''
                    close={handleCloseModal}
                >
                    <FeedOrderDetails/>
                </Modal>
            </Route>
            }
        </div>
    );
};

export default App;
