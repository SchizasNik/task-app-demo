import { Task } from "types";

type DateSumup = {
    date: string,
    total: number,
    notes: string[]
}

const dateSumup = (date: string): DateSumup => {
    return {
        date,
        total: 0,
        notes: []
    }
}

const renderSumup = (sumup: DateSumup) => {
    return `
        <hr/>
        <p>Date: ${sumup.date}</p>
        <p>Total time: ${sumup.total}h</p>
        <p>
            notes:
            <ul>
                ${sumup.notes.map(n => `
                    <li>${n}</li>
                `).join('')}
            </ul>
        </p>
    `
}

export const tasksToHTML = (tasks: Task[]) => {
    const map: { [date: string]: DateSumup } = {}
    tasks.forEach(t => {
        const { date } = t
        map[date] = map[date] || dateSumup(date)
        map[date].total += t.duration
        map[date].notes.push(t.note)
    })
    const sumups = Object.values(map)
    return `
        <html>
            <body>
            ${sumups.map(renderSumup).join('')}
            </body>
        </html>
    `
}