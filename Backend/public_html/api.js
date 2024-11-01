async function getOrDie(url) {
    const response = await fetch(url)
    if (response.status !== 200) {
        throw new Error('')
    }
    return response.json()
}

export async function getTransitRoutes() {
    return getOrDie('/api/TransitRoutes')
}

export async function getTransitRoutes(id) {
    return getOrDie('/api/TransitRoutes/'+id)
}