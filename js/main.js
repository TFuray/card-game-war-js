
let deckId = ``
let player1Main = []
let player2Main = []
document.querySelector('#start-game').addEventListener('click',firstDealPlayer1)
document.querySelector('#start-game').addEventListener('click', firstDealPlayer2)

fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id
    }) 
    .catch(err => {
        console.log(`error ${err}`)
    })

function firstDealPlayer1() {
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.cards.forEach(element => {
                player1Main.push(element.code)
            })
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
    return player1Main
}


function firstDealPlayer2(){
    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.cards.forEach(element => {
                player2Main.push(element.code)
            })
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
    return player2Main
}


console.log(player1Main);
console.log(player2Main);
