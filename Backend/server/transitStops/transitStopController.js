import { Router } from "express";
import { createTransitStop, findAllTransitStopCoordinates, findAllTransitStops } from "./transitStopData.js";

const router = Router()

// get a particular transitStop
router.get('/:transitStopId', async function (req, res) {
    const id = req.params.transitStopId
    console.log(req.params)
    try {
        const transitStop = await findTransitStopById(id)
        if (transitStop === null) {
            res.sendStatus(404)
        }
        else {
            res.send(transitStop)
        }
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// list all transitStops
router.get('/', async function (req, res) {
    try {
        const transitStops = await findAllTransitStops()
        res.send(transitStops)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post('/', async (req, res) => {
    console.log('Incoming POST on /api/transitStops with data')
    console.log(req.body)

    if (req.body.name && req.body.location) {       
        const newTransitStop = await createTransitStop(req.body)
        return res.send(newTransitStop)
    }
    else {
        return res.sendStatus(400)
    }
})

export default router