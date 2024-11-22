export interface PieChartData {
    labels: string[],
    datasets: { label: string, data: number[] }[]
}