async function getOrDie(url) {
    const response = await fetch(url)
    if (response.status !== 200) {
        throw new Error('')
    }
    return response.json()
}

export async function getTransitRoutes() {
   return getOrDie('/api/transitRoutes')
  }

export async function getTransitRoutes(id) {
   return getOrDie('/api/transitRoutes/'+id)
  }

export async function getTransitStops() {
    return getOrDie('/api/transitStops')
}

export async function getTransitStops(id) {
    return getOrDie('/api/transitStops/'+id)
}
export async function getRouteLines() {
    return getOrDie('/api/routeLines')
}

export async function getRouteLines(id) {
    return getOrDie('/api/routeLines/'+id)
}