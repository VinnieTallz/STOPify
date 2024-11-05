// import { generateTransitRouteDetail } from "./transitRoutesDetail.js"
// import { generateTransitRouteList } from "./transitRoutesList.js"
import { generateTransitStopDetail } from "./transitStopsDetail.js"
import { generateTransitStopList } from "./transitStopsList.js"

const appElement = document.getElementById('app')

// let selectedTransitRouteId = null

// function setSelectedTransitRouteId(id) {
//     console.log('selecting transitRoute ', id)
//     selectedTransitRouteId = id
//     renderApp()
// }

// function renderApp() {
//     if (selectedTransitRouteId === null) {
//         generateTransitRouteList(appElement, setSelectedTransitRouteId)
//     }
//     else {
//         generateTransitRouteDetail(appElement, selectedTransitRouteId, setSelectedTransitRouteId)
//     }
// }

// renderApp()


let selectedTransitStopId = null

function setSelectedTransitStopId(id) {
    console.log('selecting transitStop ', id)
    selectedTransitStopId = id
    renderApp()
}

function renderApp() {
    if (selectedTransitStopId === null) {
        generateTransitStopList(appElement, setSelectedTransitStopId)
    }
    else {
        generateTransitStopDetail(appElement, selectedTransitStopId, setSelectedTransitStopId)
    }
}

renderApp()