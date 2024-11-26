import { Transaction } from "../models/transaction";

export type Stats = {
    start: Date,
    end: Date,
    income: number,
    expenses: number,
    balance: number
}

export function stats(start: Date, end: Date, transactions: Transaction[]): Stats {
    console.log('[Debug] Computing stats. Transactions: ', transactions);
    let balance = 0;
    let income = 0;
    let expenses = 0;
    for(let transaction of transactions) {
        const transactionDate = new Date(transaction.timestamp);
        if (transactionDate > end) {
            continue;
        }
        balance += transaction.amount;
        if (transactionDate < start) {
            continue;
        }
        if (transaction.amount < 0) {
            expenses += transaction.amount;
        }
        if (transaction.amount > 0) {
            income += transaction.amount;
        }
    }
    return {start, end, balance, income, expenses}
}

export type PieChartData = {
    labels: string[],
    datasets: { label: string, data: number[] }[]
}

export function pieChartData(start: Date, end: Date, transactions: Transaction[]): PieChartData {
//First step: compute the expenses by category    
    const dictionary: { [key: string]: number } =  {};
    for (let transaction of transactions) {
        const transactionDate = new Date(transaction.timestamp);
        if (transactionDate < start || transactionDate > end) {
            continue;
        }
        if (transaction.amount >= 0) {
            continue;
        }
        const key: string = transaction.category.name;
        if (!dictionary[key]) {
            dictionary[key] = transaction.amount;
        } else {
            dictionary[key] += transaction.amount;
        }
    }
//find the five categories with the most expenses:
    const topEntries = Object.entries(dictionary)
        .sort((x, y) => x[1] - y[1])
        .slice(0, 5);
    const topKeys = topEntries.map(entry => entry[0]);
//sum up all the other expenses
    let allOtherExpenses = 0;
    for (let key of Object.keys(dictionary)) {
        if (topKeys.includes(key)) {
            continue;
        }
        allOtherExpenses += dictionary[key];
    }
    const labels = topKeys
    const data = topEntries.map(entry => entry[1]);
    if (allOtherExpenses !== 0) {
        labels.concat("_Other");
        data.concat(allOtherExpenses);
    }
    return {
        labels,
        datasets: [{ label: "Expenses", data }]
    };

}

let expensesData = {
labels: ['Miete', 'Lebensmittel', 'Kleidung', 'Unterhaltung', 'Fahrtkosten', 'Sonstiges'],
datasets: [
    {
    label: 'Ausgaben',
    data: [12, 19, 3, 5, 2, 3]
    },
],
}