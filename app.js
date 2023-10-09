const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/menu.html')
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
