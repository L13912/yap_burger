import React, {useState} from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Portal from "../../utils/create-portal";
import OrderDetails from "../order-details/order-details";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import PropTypes from 'prop-types';

const BurgerConstructor = ({data}) => {
    BurgerConstructor.propTypes = {
        data: PropTypes.array
    };

    const [isOn, setOn] = useState(false);

    const handleCloseModal = () => {
        setOn(false );
    }

    const constructor = `mt-5 ml-5 ${styles.constructor}`;
    const list = `mt-10 ${styles.list}`;
    const listItem = `${styles.listItem}`;
    const top = `${styles.top}`;
    const center = `${styles.center}`;
    const bottom = `${styles.bottom}`;
    const total = `mt-10 ${styles.total}`;
    const totalCount = `mr-2 text text_type_digits-medium ${styles.totalCount}`;
    const totalCont = `mr-10 ${styles.totalCont}`;

    let items = [];
    const bun = data[0];
    for (let i=1; i < data.length; i++) {
        items.push(data[i]);
    }

    return (
        <div className={constructor}>
            <section className={list}>
                <div className={top}>
                    {bun && <div className={listItem}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div> }
                </div>
                {items && <div className={center}>
                    {items.map((card) => (
                        <div key={card._id} className={listItem}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={card.name}
                                price={card.price}
                                thumbnail={card.image}
                            />
                        </div>
                    ))}
                </div>
                }

                <div className={bottom}>
                    {bun && <div className={listItem}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div> }
                </div>
            </section>
            <div className={total}>
                <div className={totalCont}>
                    <p className={totalCount}>610</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large"
                        onClick={() => setOn(!isOn)}
                        >
                    Оформить заказ
                </Button>
                {
                    isOn &&
                    <Portal>
                        <ModalOverlay  close={handleCloseModal}>
                            <Modal close={handleCloseModal}>
                                <OrderDetails/>
                            </Modal>
                        </ModalOverlay>
                    </Portal>
                }
            </div>
        </div>
    )
};

export default BurgerConstructor;
