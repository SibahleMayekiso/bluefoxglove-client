class PlayerProfile {
  async getPlayerProfile() {
    const response = await fetch(`http://localhost:3000/getplayerprofile`)
    const playerData = await response.json()

    const playerProfileContainer = document.getElementById(
      'playerProfileContainer'
    )
    for (const data in playerData) {
      const playerProfileTable = document.getElementById(
        'playerProfileInformation'
      )

      for (const key in playerData[data]) {
        let tableRow = document.createElement('tr')
        let keyColumn = document.createElement('td')
        let valueColumn = document.createElement('td')

        if (key == 'credentials') {
          keyColumn.textContent = `Player Name`
          valueColumn.textContent = `${playerData[data].credentials.playerName}`

          tableRow.appendChild(keyColumn)
          tableRow.appendChild(valueColumn)
          playerProfileTable.appendChild(tableRow)
          continue
        }

        if (key == 'selectedCharacter') {
          keyColumn.textContent = `Selected Character`
          valueColumn.textContent = `${playerData[data].selectedCharacter.characterName}`

          tableRow.appendChild(keyColumn)
          tableRow.appendChild(valueColumn)
          playerProfileTable.appendChild(tableRow)
          continue
        }

        keyColumn.textContent = `${key}`
        valueColumn.textContent = `${playerData[data][key]}`

        tableRow.appendChild(keyColumn)
        tableRow.appendChild(valueColumn)
        playerProfileTable.appendChild(tableRow)
      }
    }
  }
}

const playerProfile = new PlayerProfile()
playerProfile.getPlayerProfile()
