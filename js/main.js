
// let deckId = ``
// let player1Main = []
// let player2Main = []
// document.querySelector('#start-game').addEventListener('click',firstDealPlayer1)
// document.querySelector('#start-game').addEventListener('click', player1Pile)
// document.querySelector('#start-game').addEventListener('click', firstDealPlayer2)
// document.querySelector('#start-game').addEventListener('click', player2Pile)

// fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         deckId = data.deck_id
//     }) 
//     .catch(err => {
//         console.log(`error ${err}`)
//     })


// function firstDealPlayer1() {
//     const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             data.cards.forEach(element => {
//                 player1Main.push(element.code)
//             })
//         })
//         .catch(err => {
//             console.log(`error ${err}`)
//         })
//     return player1Main.toString()
// }


// function firstDealPlayer2(){
//     const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             data.cards.forEach(element => {
//                 player2Main.push(element.code)
//             })
//         })
//         .catch(err => {
//             console.log(`error ${err}`)
//         })
//     return player2Main
// }
// function player1Pile(){
//     const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/player1pile/add/?cards=${player1Main.toString()}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//         })
//         .catch (err => {
//             console.log(`error ${err}`)
//         })
// }

// function player2Pile() {
//     const url = `https://deckofcardsapi.com/api/deck/${deckId}/pile/player1pile/add/?cards=${player2Main.toString()}`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//         })
//         .catch(err => {
//             console.log(`error ${err}`)
//         })
// }




/* --------------------------------------------------

different approach 

-----------------------------------------------------*/

//players hands and discards
// let player1hand = []
// let player1discard = []
// let player2hand = []
// let player2discard = []

// // defining base url and key for fetch requests
// const baseURL = 'https://deckofcardsapi.com/api/deck/'
// let deck = '9z38e0ox0ekz'
// const fetchFirstDraw = fetch(`${baseURL}${deck}/draw/?count=26`)
// const fetchAddPile1 = fetch(`${baseURL}${deck}/pile/player1/add/?cards=${player1hand}`)

// // grab refereces
// const player1Card = document.querySelector('#player1')
// const player2Card = document.querySelector('#player2')
// const startButton = document.querySelector('#start-game')
// const nextCard = document.querySelector('#deal')


