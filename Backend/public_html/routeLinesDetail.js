
import { getRouteLines } from "./api.js"

export async function generateRouteLineDetail(element, routeLineId, setSelectedRouteLineId) {
    element.replaceChildren('Loading...')

    const routeLine = await getRouteLines(routeLineId)
 
    const nameHeader = document.createElement('h2')
    nameHeader.append(routeLine.name)

    const locationText = document.createElement('p')
    locationText.append('Location: ',routeLine.location.coordinates.join(','))

    const backButton = document.createElement('button')
    backButton.append('Dismiss')
    backButton.onclick = () => setSelectedRouteLineId(null)

    element.replaceChildren(nameHeader, locationText, backButton)
}