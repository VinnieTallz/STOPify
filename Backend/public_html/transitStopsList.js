
import { getTransitStops } from "./api.js"

export async function generateTransitStopList(element, setSelectedTransitStopId) {
    element.replaceChildren('Loading...')

    const transitStop = await getTransitStops()

    const table = document.createElement('table')
    const tbody = document.createElement('tbody')
    table.append(tbody)
    tbody.insertAdjacentHTML("beforeend", 
        '<tr><th>Name</th><th>Location</th></tr>'
    )
    transitStop.forEach((transitStop) => {
        const row = document.createElement('tr')
        row.insertAdjacentHTML("beforeend", 
            `<td>${ transitStop.name }</td><td>${ transitStop.location.coordinates }</td>`
        )    
        row.onclick = () => setSelectedTransitStopId(transitStop._id)
        tbody.append(row)
    })
    
    const refreshButton = document.createElement('button')
    refreshButton.append('Refresh')
    refreshButton.onclick = () => generateTransitStopList(element, setSelectedTransitStopId)

    element.replaceChildren(table, refreshButton)
}
