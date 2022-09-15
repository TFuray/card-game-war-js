let deckId = ''
// button to play next hand
const playCards = document.querySelector('#deal')
const startGame = document.querySelector('#start-game')

playCards.addEventListener('click', playCardPlayer)
startGame.addEventListener('click', fetchGame)

// get deck ID
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id

    })
    .catch(err => {
        console.log(`error ${err}`);
    })


function playCardPlayer() {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/player/draw/?count=1`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('#player1').src = data.cards[0].image
            playCardComp()
            // document.querySelector('#player2').src = data.cards[1].image
            // let player1Val = convertToNum(data.cards[0].value)
            // let player2Val = convertToNum(data.cards[1].value)
            // if (player1Val > player2Val) {
            //     document.querySelector('h3').innerText = 'player 1 wins'
            // } else if (player1Val < player2Val) {
            //     document.querySelector('h3').innerText = 'player 2 wins'
            // } else {
            //     document.querySelector('h3').innerText = 'Time for war'
            // }

        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

function playCardComp(){
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/comp/draw/?count=1`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('#player2').src = data.cards[0].image
            // document.querySelector('#player2').src = data.cards[1].image
            // let player1Val = convertToNum(data.cards[0].value)
            // let player2Val = convertToNum(data.cards[1].value)
            // if (player1Val > player2Val) {
            //     document.querySelector('h3').innerText = 'player 1 wins'
            // } else if (player1Val < player2Val) {
            //     document.querySelector('h3').innerText = 'player 2 wins'
            // } else {
            //     document.querySelector('h3').innerText = 'Time for war'
            // }

        })
        .catch(err => {
            console.log(`error ${err}`)
        })

}

function dealPiles(cards, pile) {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/add/?cards=${cards}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}


function fetchGame(){
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            dealGame(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
        
}

function dealGame(data){
    let playerCards = []
    let compCards = []
    
    for (let i = 0; i <= 25; i++) {
        playerCards.push(data.cards[i].code)
    }
    for (let i = 26; i <= 51; i++) {
        compCards.push(data.cards[i].code)
    }

    dealPiles(playerCards.toString(), 'player'); dealPiles(compCards.toString(), 'comp')
}


function convertToNum(val) {
    if (val === 'ACE') {
        return 14
    } else if (val === 'KING') {
        return 13
    } else if (val === 'QUEEN') {
        return 12
    } else if (val === 'JACK') {
        return 11
    } else {
        return Number(val)
    }
}
