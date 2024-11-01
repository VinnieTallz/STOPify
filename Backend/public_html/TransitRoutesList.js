import { getTransitRoutes } from "./api.js"

export async function generateTransitRouteList(element, setSelectedTransitRouteId) {
    element.replaceChildren('Loading...')

    const transitRoute = await getTransitRoutes()

    const table = document.createElement('table')
    const tbody = document.createElement('tbody')
    table.append(tbody)
    tbody.insertAdjacentHTML("beforeend", 
        '<tr><th>Name</th><th>Location</th></tr>'
    )
    transitRoute.forEach((transitroute) => {
        const row = document.createElement('tr')
        row.insertAdjacentHTML("beforeend", 
            `<td>${ transitroute.name }</td><td>${ transitroute.location.coordinates }</td>`
        )    
        row.onclick = () => setSelectedTransitRouteId(transitRoute._id)
        tbody.append(row)
    })
    
    const refreshButton = document.createElement('button')
    refreshButton.append('Refresh')
    refreshButton.onclick = () => generateTransitRouteList(element, setSelectedTransitRouteId)

    element.replaceChildren(table, refreshButton)
}
