import { Transaction } from "../models/transaction";
import { toString } from "./date";

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

export type ChartData = {
    labels: (string | string[])[],
    datasets: { label: string, data: number[] }[]
}

export function pieChartData(start: Date, end: Date, transactions: Transaction[]): ChartData {
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

export function barChartData(end: Date, transactions: Transaction[]): ChartData {
    let tempEnd = new Date(end)
    let tempStart: Date = new Date(tempEnd); 
    tempStart.setMonth(tempStart.getMonth() - 1);
    let chartData: ChartData = {
        labels: [],
        datasets: [ 
            { label: "Income", data: [] },
            { label: "Expenses", data: [] },
            { label: "Total", data: [] }
        ]
    };

    for(let i = 0; i < 3; i++) {
        const statistic = stats(tempStart, tempEnd, transactions);
        const label = ['between ' + toString(tempStart), 'and ' + toString(tempEnd)];
        chartData.labels.push(label);
        chartData.datasets[0].data.push(statistic.income);
        chartData.datasets[1].data.push(statistic.expenses);
        chartData.datasets[2].data.push(statistic.income + statistic.expenses);
        tempEnd.setMonth(tempEnd.getMonth() - 1);
        tempStart.setMonth(tempEnd.getMonth() - 1);
    }

    console.log('[Debug] barChartData(end: Date, transaction: Transaction[]): ChartData will return the following',
        chartData
    );
    return chartData;
}

/*
const data: any = {};
data.labels = ['January', 'February', 'March', 'April'];
data.datasets = [
      {
        label: "Income",
        data: ["500", "200", "600", "20"],
      }, 
      {
        label: "Expenses",
        data: ["-300", "-240", "-30", "-540"],
      },
      {
        label: "Total",
        data: ["200", "-40", "570", "-520"],
      },
    ]
*/
