
// button to play next hand
// document.querySelector('button').addEventListener('click', firstDeal)

function firstDeal() {
    const url = `https://deckofcardsapi.com/api/deck/new/draw/?count=26`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let deckId = data.deck_id
            let player1Main = {}
            
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}

firstDeal()
