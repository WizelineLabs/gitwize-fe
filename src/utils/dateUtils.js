import * as moment from 'moment'

export const getCurrentDate = () => {
    return moment();
}

export const getStartOfMonth = (date) => {
    return moment(date).startOf('month')
}

export const getEndOfMonth = (date) => {
    return moment(date).endOf('month')
}

export const getNumberOfMonthBackward = (date, number) => {
    return moment(date).subtract(number, 'month')
}

export const getMonthFromDate = (date) => {
    console.log(moment(date).month())
    return moment(date).month() + 1
}