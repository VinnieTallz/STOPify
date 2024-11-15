
import { getMergedRoutes } from "./api.js"

export async function generateMergedRouteList(element, setSelectedMergedRouteId) {
    element.replaceChildren('Loading...')

    const mergedRoute = await getMergedRoutes()

    const table = document.createElement('table')
    const tbody = document.createElement('tbody')
    table.append(tbody)
    tbody.insertAdjacentHTML("beforeend", 
        '<tr><th>Name</th><th>Location</th></tr>'
    )
    mergedRoute.forEach((mergedRoute) => {
        const row = document.createElement('tr')
        row.insertAdjacentHTML("beforeend", 
            `<td>${ mergedRoute.name }</td><td>${ mergedRoute.location.coordinates }</td>`
        )    
        row.onclick = () => setSelectedMergedRouteId(mergedRoute._id)
        tbody.append(row)
    })
    
    const refreshButton = document.createElement('button')
    refreshButton.append('Refresh')
    refreshButton.onclick = () => generateMergedRouteList(element, setSelectedMergedRouteId)

    element.replaceChildren(table, refreshButton)
}
