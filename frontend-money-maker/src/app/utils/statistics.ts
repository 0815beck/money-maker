import { start } from "@popperjs/core";
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

//COMPUTE EXPENSES PER CATEGORY
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

//COMPUTE STATS
    const topEntries = Object.entries(dictionary)
        .sort((x, y) => x[1] - y[1])
        .slice(0, 5);
    const topKeys = topEntries.map(entry => entry[0]);

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
    let chartData: ChartData = {
        labels: [],
        datasets: [ 
            { label: "Income", data: [] },
            { label: "Expenses", data: [] },
            { label: "Total", data: [] }
        ]
    };

    let startOfMonth = new Date(end.getFullYear(), end.getMonth(), 1);
    let statistic = stats(startOfMonth, end, transactions);
    let label: string = getMonth(startOfMonth) + ' ' + startOfMonth.getFullYear();
    chartData.labels.push(label);
    chartData.datasets[0].data.push(statistic.income);
    chartData.datasets[1].data.push(statistic.expenses);
    chartData.datasets[2].data.push(statistic.income + statistic.expenses);

    startOfMonth.setMonth(startOfMonth.getMonth() - 1);
    let endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0)
    statistic = stats(startOfMonth, endOfMonth, transactions);
    label = getMonth(startOfMonth) + ' ' + startOfMonth.getFullYear();
    chartData.labels.push(label);
    chartData.datasets[0].data.push(statistic.income);
    chartData.datasets[1].data.push(statistic.expenses);
    chartData.datasets[2].data.push(statistic.income + statistic.expenses);

    startOfMonth.setMonth(startOfMonth.getMonth() - 1);
    endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0)
    statistic = stats(startOfMonth, endOfMonth, transactions);
    label = getMonth(startOfMonth) + ' ' + startOfMonth.getFullYear();
    chartData.labels.push(label);
    chartData.datasets[0].data.push(statistic.income);
    chartData.datasets[1].data.push(statistic.expenses);
    chartData.datasets[2].data.push(statistic.income + statistic.expenses);

    chartData.labels = chartData.labels.reverse();
    for(let i = 0; i < 3; i++) {
        chartData.datasets[i].data = chartData.datasets[i].data.reverse();
    }

    return chartData;
}

function getMonth(date: Date) {
    let x : number = date.getMonth()
    let month : string = ''
    switch (x) {
        case 0: 
            month = "January"; 
            break;
        case 1: 
            month = "February"; 
            break;
        case 2: 
            month = "March"; 
            break;
        case 3: 
            month = "April"; 
            break;
        case 4: 
            month = "May"; 
            break;
        case 5: 
            month = "June"; 
            break;
        case 6: 
            month = "July"; 
            break;
        case 7: 
            month = "August"; 
            break;
        case 8: 
            month = "September"; 
            break;
        case 9: 
            month = "October"; 
            break;
        case 10: 
            month = "November"; 
            break;
        case 11: 
            month = "December"; 
            break;
        default: 
            month = "Invalid month"; 
    }
    return month;
}