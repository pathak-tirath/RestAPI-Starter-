const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


const getSubscribers = async (req, res, next) => {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Subscriber is not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.subscriber = subscriber
    next()
}

// Getting all routes
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.status(200).json(subscribers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Getting single route
router.get('/:id', getSubscribers, (req, res) => {
    res.json(res.subscriber)
})

// Creating a route
router.post('/', async (req, res) => {
    const postSubscribers = await Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,

    })
    try {
        const newSubscriber = await postSubscribers.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Updaing a route
router.patch('/:id',getSubscribers, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Deleting a route
router.delete('/:id', getSubscribers, async (req, res) => {
    try {
        await res.subscriber.deleteOne()
        res.json({ message: "Subscriber deleted successful" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})



module.exports = router