class PlayerProfile {
    playerProfile

    async getPlayerProfile() {
        const response = await fetch(`http://localhost:3000/getplayerprofile`)
        const playerData = await response.json()
        this.playerProfile = playerData[0]

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
                    valueColumn.setAttribute('id', 'selectedCharacter')

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

    async getAllCharacters() {
        const response = await fetch(`http://localhost:3000/getallcharacters`)
        const playerData = await response.json()

        const characterSelector = document.getElementById('selectedCharacter')

        let characterSelectBox = document.createElement('select')
        characterSelectBox.setAttribute('id', 'characterSelectionDropDown')
        characterSelectBox.value =
            this.playerProfile.selectedCharacter.characterId
        characterSelector.appendChild(characterSelectBox)

        for (const data in playerData) {
            let characterOption = document.createElement('option')
            characterOption.value = playerData[data]._id
            characterOption.innerHTML = playerData[data].characterName
            characterSelectBox.appendChild(characterOption)
        }

        characterSelectBox.addEventListener('change', () => {
            console.log('Character Change Occured')
            this.updateSelectedCharacter()
        })
    }

    async updateSelectedCharacter() {
        const characterSelector = document.getElementById(
            'characterSelectionDropDown'
        )

        let currentSelectedCharacter = characterSelector.value

        let isCharacterChanged = false
        if (
            currentSelectedCharacter !=
            this.playerProfile.selectedCharacter.characterId
        ) {
            isCharacterChanged = confirm('Are you sure of your selection?')
            if (isCharacterChanged) {
                var data = { characterId: characterSelector.value }
                fetch(`http://localhost:3000/updateselectedcharacter`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .catch((error) => console.error(error))
            }
        }
    }

    async createPlayerProfile() {
        await fetch(`http://localhost:3000/createplayerprofile`)
        console.log('Player Profile Created')
    }
}

const playerProfile = new PlayerProfile()
playerProfile
    .createPlayerProfile()
    .then((resolve) => playerProfile.getPlayerProfile())
    .then((resolve) => playerProfile.getAllCharcaters())
