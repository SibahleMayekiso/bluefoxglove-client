class MainMenu {
  async getPlayerName() {
    try {
      const response = await fetch('http://localhost:3000/credentials')
      const playerData = await response.json()
      const playerName = playerData.playerName
      const welcomePlayerElement = document.getElementById('welcomePlayer')
      welcomePlayerElement.textContent = `WELCOME TO THE GAME, ${playerName}`
    } catch (error) {
      console.error('Error fetching player name:', error)
    }
  }
}

const mainMenu = new MainMenu()
mainMenu.getPlayerName()
