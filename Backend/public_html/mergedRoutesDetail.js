
import { getMergedRoutes } from "./api.js"

export async function generateMergedRoutesDetail(element, mergedRouteId, setSelectedMergedRouteId) {
    element.replaceChildren('Loading...')

    const mergedRoute = await getMergedRoutes(mergedRouteId)
 
    const nameHeader = document.createElement('h2')
    nameHeader.append(mergedRoute.name)

    const locationText = document.createElement('p')
    locationText.append('Location: ',mergedRoute.location.coordinates.join(','))

    const backButton = document.createElement('button')
    backButton.append('Dismiss')
    backButton.onclick = () => setSelectedMergedRouteId(null)

    element.replaceChildren(nameHeader, locationText, backButton)
}