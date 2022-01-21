let player = {
    name: "Player",
    chips: 1000
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("bank-el")
let currentBet = 0
let betEl = document.getElementById('bet-el');
let playerRPS_El = document.getElementById('player-el')
let houseEl = document.getElementById('house-el');
let playerRPS = 0;
let houseRPS = 0;
let gameStatus = 0;
// rock = 1
// paper = 2
// scissors = 3

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startBlackjack() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

function increaseBet() {
    currentBet += 100;
    betEl.textContent = 'You bet $' + currentBet
}

function decreaseBet() {
    currentBet -= 100;
    if (currentBet < 0) {
        currentBet = 0;
    }
    betEl.textContent = 'You bet $' + currentBet
}

function playRock() {
    playerRPS = 1;
    renderRPS();
}

function playScissors() {
    playerRPS = 2;
    renderRPS();
}

function playPaper() {
    playerRPS = 3;
    renderRPS();
}

function renderRPS() {
    if (playerRPS === 1) {
        playerRPS_El.textContent = 'You play ROCK'
    }
    else if (playerRPS === 2) {
        playerRPS_El.textContent = 'You play PAPER'
    }
    else if (playerRPS === 3) {
        playerRPS_El.textContent = 'You play SCISSORS'
    }
    getHouseRPS();
    getGameStatus();
    playerEl.textContent = player.name + ": $" + player.chips
    
}

function getHouseRPS() {
    houseRPS = Math.floor(Math.random() * (4 - 0) + 0);

    if (houseRPS === 1) {
        houseEl.textContent = 'I play ROCK';
        if (playerRPS === 2) {
            gameStatus = 1;
        }
        else if (playerRPS === 3) {
            gameStatus = -1;
        }
        else{
            gameStatus = 0;
        }
    }
    else if (houseRPS === 2) {
        houseEl.textContent = 'I play PAPER';
        if (playerRPS === 1) {
            gameStatus = -1;
        }
        else if (playerRPS === 3) {
            gameStatus = 1;
        }
        else{
            gameStatus = 0;
        }
    }
    else if (houseRPS === 3) {
        houseEl.textContent = 'I play SCISSORS';
        if (playerRPS === 1) {
            gameStatus = 1;
        }
        else if (playerRPS === 2) {
            gameStatus = -1;
        }
        else{
            gameStatus = 0;
        }
    }
}

function getGameStatus() {
    if (gameStatus === 1) {
        player.chips += currentBet
        betEl.textContent = 'You win $' + currentBet
    }
    else if (gameStatus === -1) {
        player.chips -= currentBet
        betEl.textContent = 'You lose $' + currentBet
    }
    else{
        betEl.textContent = 'Game drew and refunded $' + currentBet
    }
}