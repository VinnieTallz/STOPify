
import { getRouteLines } from "./api.js"

export async function generateRouteLineList(element, setSelectedRouteLineId) {
    element.replaceChildren('Loading...')

    const routeLine = await getRouteLines()

    const table = document.createElement('table')
    const tbody = document.createElement('tbody')
    table.append(tbody)
    tbody.insertAdjacentHTML("beforeend", 
        '<tr><th>Name</th><th>Location</th></tr>'
    )
    routeLine.forEach((routeLine) => {
        const row = document.createElement('tr')
        row.insertAdjacentHTML("beforeend", 
            `<td>${ routeLine.name }</td><td>${ routeLine.location.coordinates }</td>`
        )    
        row.onclick = () => setSelectedRouteLineId(routeLine._id)
        tbody.append(row)
    })
    
    const refreshButton = document.createElement('button')
    refreshButton.append('Refresh')
    refreshButton.onclick = () => generateRouteLineList(element, setSelectedRouteLineId)

    element.replaceChildren(table, refreshButton)
}
