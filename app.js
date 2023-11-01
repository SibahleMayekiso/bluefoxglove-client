const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
})
app.get('/credentials', async (req, res) => {
    const playerId = '651abf2d32724cb220ecec1d'
    try {
        const response = await fetch(
            `https://localhost:8080/credentials/${playerId}`
        )
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`)
        }
        const playerData = await response.json()
        res.json(playerData)
    } catch (error) {
        console.error('Error fetching player data:', error)
        res.status(500).json({ error: 'Failed to fetch player data' })
    }
})
app.post('/process_post', async function (req, res) {
    try {
        const playerData = {
            playerId: req.body.playerId,
            playerName: req.body.playerName
        }
        const response = await fetch('https://localhost:8080/credentials', {
            method: 'POST',
            body: JSON.stringify(playerData),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) {
            res.status(response.status).json({
                error: 'Request failed with status ' + response.status
            })
            return
        }

        const responseData = await response.json()

        console.log(responseData)
    } catch (error) {
        console.error(error)
        res.status(500).send('Error')
    }
})

app.get('/getplayerprofile', async (req, res) => {
    const playerId = '651abf2d32724cb220ecec1d'
    try {
        const response = await fetch(
            `https://localhost:8080/playerprofile/${playerId}`
        )
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`)
        }
        const playerData = await response.json()
        res.json(playerData)
    } catch (error) {
        console.error('Error fetching player data:', error)
        res.status(500).json({ error: 'Failed to fetch player data' })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
