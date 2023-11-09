class SignUp {
    constructor() {
        const form = document.getElementById('signInForm')
        form.addEventListener('submit', this.handleSubmit.bind(this))
    }

    async handleSubmit(event) {
        event.preventDefault()

        const playerName = document.getElementById('playerName').value
        const playerId = document.getElementById('playerId').value
        const playerData = {
            playerId,
            playerName
        }

        try {
            const response = await fetch('/process_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playerData),
                credentials: 'include' //This tells the browser to include cookies in the request
            })

            if (response.ok) {
                const result = await response.json()

                this.handleSignupButtonClick()
            }
        } catch (error) {
            console.error(error)
        }
    }

    handleSignupButtonClick() {
        window.location.href = 'menu.html'
    }
}

const formHandler = new SignUp()
