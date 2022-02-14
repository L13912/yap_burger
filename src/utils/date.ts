import moment from 'moment'
import 'moment/locale/ru.js'
import { TOrder } from '../types/data-types'

export const getDate = (order: TOrder | undefined) => {
  let tDate: moment.Moment
  const createdAt = order ? order.createdAt : 0
  tDate = moment(new Date(createdAt))
  tDate.locale('ru')
  return `${tDate.calendar()} i-GMT+3`
}
