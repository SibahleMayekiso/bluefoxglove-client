const express = require('express')
const fetch = require('node-fetch')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html')
})
app.get('/credentials', async (req, res) => {
    const playerId = req.cookies.playerId
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

        res.cookie('playerId', responseData.playerId, {
            maxAge: 900000,
            httpOnly: true
        })
        res.cookie('playerName', responseData.playerName, {
            maxAge: 900000,
            httpOnly: true
        })
        console.log(responseData)

        res.status(200).json(responseData) //Response must be sent to client so that cookies can be set in the client's browser
    } catch (error) {
        console.error(error)
        res.status(500).send('Error')
    }
})

app.get('/getplayerprofile', async (req, res) => {
    const playerId = req.cookies.playerId
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
    const playerId = req.cookies.playerId
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

app.get('/createplayerprofile', async (req, res) => {
    const playerId = req.cookies.playerId
    const playerName = req.cookies.playerName

    console.log(`Here's a cookie 🍪: ${playerName}`)

    const data = {
        id: '',
        credentials: {
            playerId: playerId,
            playerName: playerName
        },
        selectedCharacter: {
            characterId: '651ece8f661aec2ba21a375d',
            characterName: 'Guppy',
            characterType: 'Soldier',
            characterMaxHealth: 100,
            characterMaxSpeed: 5.0
        },
        longestSurvivalTime: 0,
        totalPlayTime: 0,
        numberOfGamesPlayed: 0,
        killCount: 0
    }

    try {
        const response = await fetch(`https://localhost:8080/playerprofile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
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
