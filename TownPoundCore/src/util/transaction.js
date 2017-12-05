import dateFormat from 'dateformat'
import _ from 'lodash'
import { isSameMonth, monthRange } from './date'
import { ListView } from 'react-native'
import merge from './merge'

export const sortTransactions = transactions =>
  _(transactions)
    .sortBy([tr => new Date(tr.date)])
    .reverse()
    .value()

const appendNewMonths = (monthlySpendings, newTransactions) => {
  let newMonthlySpendings = monthlySpendings.slice()

  let newestDate = new Date(_.first(newTransactions).date)
  let currentFinalMonth = _.last(newMonthlySpendings).month

  const newMonths = monthRange(currentFinalMonth, newestDate, false)

  _.forEach(newMonths, (month) => {
    newMonthlySpendings.push({
      month: month,
      total: 0,
      transactions: {
        groups: {},
        groupOrder: []
      }
    })
  })

  return _.takeRight(newMonthlySpendings, 12)
}

const integrateNewTransaction = (monthlySpendings, transaction, formatString='mmmm dS, yyyy', toUpper=false) => {
  let monthToUpdate = findMonthToUpdate(monthlySpendings, transaction)

  monthToUpdate.total += Math.min(Number(transaction.amount), 0)

  let groupTitle = dateFormat(new Date(transaction.date), formatString)
  groupTitle = toUpper ? groupTitle.toUpperCase() : groupTitle

  if (monthContainsDate(monthToUpdate, groupTitle)) {
    // If this date is already contained in the monthly transactions, put this
    // transaction to the front of that day's spendings
    monthToUpdate.transactions.groups[groupTitle].unshift(transaction)
  }
  else {
    // If this day does not exist in this month's transactions, create the
    // array and insert it
    let newTransactionDay = {}
    newTransactionDay[groupTitle] = [transaction]
    monthToUpdate.transactions.groups = merge(monthToUpdate.transactions.groups, newTransactionDay)
    // Add the new date to the group order for the section headers
    let newGroupOrder = monthToUpdate.transactions.groupOrder.slice()
    newGroupOrder.unshift(groupTitle)
    monthToUpdate.transactions.groupOrder = newGroupOrder
  }

}

const monthContainsDate = (monthToUpdate, groupTitle) => {
  if(monthToUpdate.transactions.groups[groupTitle]) {
    return true
  }
  return false
}

export const updateMonthlySpendings = (monthlySpendings, newTransactions) => {
  // If the newest transaction is in a different month to the most recently
  // stored one, update the monthly spendings to include new months

  let newMonthlySpendings = appendNewMonths(monthlySpendings, newTransactions)

  _.forEachRight(newTransactions, (transaction) => {
    integrateNewTransaction(newMonthlySpendings, transaction)
  })

  return newMonthlySpendings
}



export const calculateMonthlyTotalSpent = (sortedTransactions) => {

  const lastTransactionDate = sortedTransactions.length > 0
    ? new Date(_.last(sortedTransactions).date)
    : new Date()

  const allMonths = monthRange(lastTransactionDate, new Date())

  const monthlySpendings = allMonths.map(month => ({
    month,
    total: 0,
    transactions: []
  }))
  addMonthlyTotals(monthlySpendings, sortedTransactions)

  _.map(monthlySpendings, (total) => {total.transactions = groupTransactionsByDate(total.transactions)})
  return _.takeRight(monthlySpendings, 12)
}

const addMonthlyTotals = (monthlySpendings, transactions) => {
  transactions.forEach(transaction => {
    const monthToUpdate = findMonthToUpdate(monthlySpendings, transaction)
    // Only interested in money spent, not received - hence Math.min
    monthToUpdate.transactions.push(transaction)
    monthToUpdate.total += Math.min(Number(transaction.amount), 0)
  })
}


const findMonthToUpdate = (monthlySpendings, transaction) => {
  const transactionDate = new Date(transaction.date)
  const monthToUpdate = monthlySpendings.find(total => isSameMonth(total.month, transactionDate))

  return monthToUpdate
}

const groupTransactionsByDate = (transactions, formatString='mmmm dS, yyyy', toUpper=false) => {
  const groups = _.groupBy(transactions, tr => {
    const groupTitle = dateFormat(new Date(tr.date), formatString)
    return toUpper ? groupTitle.toUpperCase() : groupTitle
  })
  return { groups, groupOrder: _.keys(groups) }
}

export const findTransactionsByDate = (transactions, date) =>
  typeof date === 'string'
  ? transactions
    .filter(tr => tr.date === date)
    .map(tr => tr.id)
  : []

export const buildDataSourceForTransactions = (transactions, datasource) => {
  const sortedTransactions = sortTransactions(transactions)
  const group = groupTransactionsByDate(sortedTransactions, 'mmmm yyyy', true)
  if (datasource) {
    return datasource.cloneWithRowsAndSections(group.groups, group.groupOrder)
  }
  const dataSource = new ListView.DataSource({
    rowHasChanged: (a, b) => a.transactionNumber !== b.transactionNumber,
    sectionHeaderHasChanged: (a, b) => a !== b
  })
  return dataSource.cloneWithRowsAndSections(group.groups, group.groupOrder)
}

export const buildNewDataSource = (selectedMonth) => {
  const dataSource = new ListView.DataSource({
    rowHasChanged: (a, b) => a.transactionNumber !== b.transactionNumber,
    sectionHeaderHasChanged: (a, b) => a !== b
  })
  return dataSource.cloneWithRowsAndSections(selectedMonth.groups, selectedMonth.groupOrder)
}
