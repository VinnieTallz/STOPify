import { generateTransitRouteDetail } from "./transitRoutesDetail.js"
import { generateTransitRouteList } from "./transitRoutesList.js"
import { generateTransitStopDetail } from "./transitStopsDetail.js"
import { generateTransitStopList } from "./transitStopsList.js"
import { generateRouteLineDetail } from "./routeLinesDetail.js"
import { generateRouteLineList } from "./routeLinesList.js"
import { generateMergedRouteDetail } from "./mergedRoutesDetail.js"
import { generateMergedRouteList } from "./mergedRoutesList.js"

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

let selectedMergedRouteId = null

function setSelectedMergedRouteId(id) {
    console.log('selecting mergedRoute ', id)
    selectedMergedRouteId = id
    renderApp()
}

function renderApp() {
    if (selectedMergedRouteId === null) {
    generateMergedRouteList(appElement, setSelectedMergedRouteId)
     }
    else {
    generateMergedRouteDetail(appElement, selectedMergedRouteId, setSelectedMergedRouteId)
     }
}

renderApp()