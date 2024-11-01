import { collection, disconnectDb } from '../db.js'

// split a line of text on commas, taking into account double quotes protect
// text fields that may contain commas
function splitCsvLine(line) {
    const cells = []
    let cellValue = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
        const char = line.charAt(i)
        if (char === '"') {
            inQuotes = !inQuotes
        }
        else if ((char === ',') && !inQuotes){
            cells.push(cellValue)
            cellValue = ''
        }
        else {
            cellValue += char
        }
    }
    cells.push(cellValue)
    return cells
}

// fetch the csv
const response = await fetch('https://data.calgary.ca/api/views/7pez-dhxh/rows.csv?query=select%20*%20where%20(upper(%60structure_type%60)%20LIKE%20%27%25WASHROOM%25%27)&read_from_nbe=true&version=2.1&date=20241028&accessType=DOWNLOAD')
if (response.status!==200) {
    throw new Error('Request to data.calgary.ca failed')
}

// split into lines on carriage return
const text = await response.text()
const lines = text.split('\n')

// figure out the headers
const headerLine = lines.shift()
const headers = splitCsvLine(headerLine)

// create data objects using the row values and the headers 
// as the names of the object fields
let cityData = lines.map((line) => {
    const cells = splitCsvLine(line)
    const rowData = {}
    headers.forEach((header, i) =>{
        rowData[header] = cells[i]
    })
    return rowData
})

// filter out empty rows 
cityData = cityData.filter((rowData) => rowData.GLOBALID)

// convert into our transitRoute schema
const transitRoutes = cityData.map((rowData) => {
    const coordinatesText = rowData.MULTIPOLYGON.substring(
        'MULTIPOLYGON ((('.length,
        rowData.MULTIPOLYGON.length - 3 // ')))'
    )
    const allCoordinates = coordinatesText.split(', ')
    const [lonText, latText] = allCoordinates[0].split(' ')
    const lon = Number.parseFloat(lonText)
    const lat = Number.parseFloat(latText)

    const transitRoute = {}
    transitRoute.name = rowData.COMMON_NAME
    transitRoute.address = rowData.BLD_ADDRESS
    transitRoute.city_globalid = rowData.GLOBALID
    transitRoute.location = {
        type: "Point",
        coordinates: [ lon, lat ]
    }
    return transitRoute
})

// write to mongo
const transitRoutesCollection = await collection('transitRoutes')
for (let i=0; i < transitroutes.length; i++) {
    let citytransitRoutes = transitRoutes[i]
    const existingTransitRoute = await transitRoutesCollection.findOne({ 
        city_globalid: citytransitRoutes.city_globalid
    })
    if (!existingTransitRoutes) {
        console.log('Creating transitRoute', citytransitRoute)
        await transitRoutesCollection.insertOne(transitRoute)
    }
    else {
        console.log('City transitRoute', citytransitRoute.city_globalid, 'already exists')
    }
}
await disconnectDb()