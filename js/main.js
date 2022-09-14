// The Game of War -- @TFuray

//set variable for deck id
let deckId = ''
// add event listener to play button
document.querySelector('button').addEventListener('click', dealNext)

// initial assemble of pre shuffled deck
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id   
    })
    .catch(err =>{
        console.log(`error ${err}`);
    })


// dealing cards for each player
fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=26/pile/player1Main/add`)




function dealNext(){
    return 1
}