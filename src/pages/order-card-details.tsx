import React, { FC, useEffect } from 'react'
import FeedOrderDetails from '../components/feed-order-details/feed-order-details'
import styles from './commonStyles.module.css'
import { WS_CONNECTION_CLOSE, WS_START } from '../services/actions/ws-actions'
import { useDispatch } from '../utils/hooks'

const OrderCardDetails: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: WS_START, payload: '' })
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE, payload: '' })
    }
  }, [])
  return (
    <div className={styles.ingredient}>
      <FeedOrderDetails />
    </div>
  )
}

export default OrderCardDetails
