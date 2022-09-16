/*
War the Card Game -- TFuray  
*/

let deckId = ''
let player1Val
let compVal
// button to play next hand
const playCards = document.querySelector('#deal')
const startGame = document.querySelector('#start-game')
const results = document.querySelector('h3')

playCards.addEventListener('click', playCardPlayer)
startGame.addEventListener('click', fetchGame)

// get deck ID and shuffle
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        deckId = data.deck_id // set deckId global variable
    })
    .catch(err => {
        console.log(`error ${err}`);
    })


function playCardPlayer() {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/player/draw/?count=1`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let remaining = Number(data.piles.player.remaining)
            if(remaining < 1){
                returnDiscardPlayer()
            }else{
                document.querySelector('#player1').src = data.cards[0].image
                player1Val = convertToNum(data.cards[0].value)
                let cardPlayed = data.cards[0].code.toString()
                playCardComp(player1Val, cardPlayed)
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}


function returnDiscardPlayer(){
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/playerDiscard/list/`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.piles.playerDiscard.cards)
            let cards = []
            let playerPile = data.piles.playerDiscard.cards
            for(let i=0;i<playerPile.length;i++){
                cards.push(playerPile[i].code)
            }
            dealPiles(cards.toString(), 'player')
            playCardPlayer()
            
        })
        .catch(err=> {
            console.log(`error ${err}`)
        })
}


function playCardComp(player1, player1Card) {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/comp/draw/?count=1`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let remaining = Number(data.piles.comp.remaining)
            if (remaining < 1) {
                returnDiscardComp()
            }else{
                document.querySelector('#player2').src = data.cards[0].image
                compVal = convertToNum(data.cards[0].value)
                let cardPlayed = data.cards[0].code.toString()
                checkWinninghand(player1, compVal, player1Card, cardPlayed)
            }
           
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

}


function returnDiscardComp() {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/compDiscard/list/`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.piles.compDiscard.cards)
            let cards = []
            let compPile = data.piles.compDiscard.cards
            for (let i = 0; i < compPile.length; i++) {
                cards.push(compPile[i].code)
            }
            dealPiles(cards.toString(), 'comp')
            playCardComp()
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


function fetchGame() {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            dealGame(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })

}


function dealGame(data) {
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


function checkWinninghand(player, comp, playerCard, compCard) {
    if (player > comp) {
        results.innerText = 'Player 1 wins'
        addDiscardPile('playerDiscard', playerCard, compCard)
    } else if (player < comp) {
        results.innerText = 'Computer wins'
        addDiscardPile('compDiscard', playerCard, compCard)
    } else {
        results.innerText = 'Time for war'
        war()
    }

}


function checkWinninghandWar(player, comp, allCards) {
    allCards = allCards.toString()
    if (player > comp) {
        results.innerText = 'Player 1 wins'
        addDiscardPileWar('playerDiscard', allCards)
    } else if (player < comp) {
        results.innerText = 'Computer wins'
        addDiscardPileWar('compDiscard', allCards)
    } else {
        results.innerText = 'Time for war'
        return('thats a bug ifits war again ')
    }

}


function addDiscardPileWar(pile, allCards) {

    const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/add/?cards=${allCards}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(`error ${err}`);
        })
}


function addDiscardPile(pile, card1, card2) {

    const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/${pile}/add/?cards=${card1},${card2}`
    fetch(url)
        .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        // })
        .catch(err => {
            console.log(`error ${err}`);
        })
}


function war() {
    let allCards = []
    let playerVal 
    let comVal
    const url1 = `https://deckofcardsapi.com/api/deck/${deckId}/pile/player/draw/?count=4`
    const url2 = `https://deckofcardsapi.com/api/deck/${deckId}/pile/comp/draw/?count=4`
    fetch(url1)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for(let i=0; i<4; i++){
                allCards.push(data.cards[i].code)
            }
            playerVal = data.cards[3].value
        })
        .catch(err => {
            console.log(`error ${err}`);
        })
    fetch(url2)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for (let i = 0; i < 4; i++) {
                allCards.push(data.cards[i].code)
            }
            comVal = data.cards[3].value
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
    checkWinninghandWar(playerVal, comVal, allCards)
    
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
