import { generateTransitRouteDetail } from "./transitRoutesDetail.js"
import { generateTransitRouteList } from "./transitRoutesList.js"
import { generateTransitStopDetail } from "./transitStopsDetail.js"
import { generateTransitStopList } from "./transitStopsList.js"
import { generateRouteLineDetail } from "./routeLinesDetail.js"
import { generateRouteLineList } from "./routeLinesList.js"

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

let selectedRouteLineId = null

function setSelectedRouteLineId(id) {
    console.log('selecting routeLine ', id)
    selectedRouteLineId = id
    renderApp()
}

function renderApp() {
    if (selectedRouteLineId === null) {
    generateRouteLineList(appElement, setSelectedRouteLineId)
     }
    else {
    generateRouteLineDetail(appElement, selectedRouteLineId, setSelectedRouteLineId)
     }
}

renderApp()
