import { generateTransitRouteDetail } from "./TransitRoutesDetail.js"
import { generateTransitRouteList } from "./TransitRoutesList.js"

const appElement = document.getElementById('app')

let selectedTransitRouteId = null

function setSelectedTransitRouteId(id) {
    console.log('selecting transitRoute ', id)
    selectedTransitRouteId = id
    renderApp()
}

function renderApp() {
    if (selectedTransitRouteId === null) {
        generateTransitRouteList(appElement, setSelectedTransitRouteId)
    }
    else {
        generateTransitRouteDetail(appElement, selectedTransitRouteId, setSelectedTransitRouteId)
    }
}

renderApp()