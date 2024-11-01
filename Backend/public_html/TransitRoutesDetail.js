import { getTransitRoutes } from "./api.js"

export async function generateTransitRouteDetail(element, transitRouteId, setSelectedTransitRouteId) {
    element.replaceChildren('Loading...')

    const transitRoute = await getTransitRoutes(transitRouteId)
 
    const nameHeader = document.createElement('h2')
    nameHeader.append(transitRoute.name)

    const locationText = document.createElement('p')
    locationText.append('Location: ',transitRoute.location.coordinates.join(','))

    const backButton = document.createElement('button')
    backButton.append('Dismiss')
    backButton.onclick = () => setSelectedTransitRouteId(null)

    element.replaceChildren(nameHeader, locationText, backButton)
}