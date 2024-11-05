
import { getTransitStops } from "./api.js"

export async function generateTransitStopDetail(element, transitStopId, setSelectedTransitStopId) {
    element.replaceChildren('Loading...')

    const transitStop = await getTransitStops(transitStopId)
 
    const nameHeader = document.createElement('h2')
    nameHeader.append(transitStop.name)

    const locationText = document.createElement('p')
    locationText.append('Location: ',transitStop.location.coordinates.join(','))

    const backButton = document.createElement('button')
    backButton.append('Dismiss')
    backButton.onclick = () => setSelectedTransitStopId(null)

    element.replaceChildren(nameHeader, locationText, backButton)
}