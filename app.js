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

app.get('/getallcharacters', async (req, res) => {
    try {
        /*
         * For now a explicit array of character objects will be used for the available characters. A ticket will
         * need to be created for retrieving the available characters from the server.
         */
        const characters = [
            {
                _id: '651ece8f661aec2ba21a375d',
                characterName: 'Guppy',
                characterType: 'Soldier',
                characterMaxHealth: 100,
                characterMaxSpeed: 5.0
            },
            {
                _id: '651abf2d32724cb220ecec2d',
                characterName: 'Dexter',
                characterType: 'Soldier',
                characterMaxHealth: 100,
                characterMaxSpeed: 5.0
            },
            {
                _id: '651abf2d32724cb220ecec3d',
                characterName: 'Shelby',
                characterType: 'Soldier',
                characterMaxHealth: 100,
                characterMaxSpeed: 5.0
            }
        ]

        res.json(characters)
    } catch (error) {
        console.error('Error fetching characters:', error)
        res.status(500).json({ error: 'Failed to fetch characters' })
    }
})

app.patch('/updateselectedcharacter', async (req, res) => {
    const playerId = '651abf2d32724cb220ecec1d'
    var data = req.body

    try {
        const response = await fetch(
            `https://localhost:8080/playerprofile/${playerId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.characterId)
            }
        )
        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`)
        }
        res.json(await response.json())
    } catch (error) {
        console.error('Error updating player character', error)
        res.status(500).json({ error: 'Failed updating player character' })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
