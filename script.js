//factory function for player creation
const createPlayer = (name, marker) => {
    const printName = () => console.log('Hey! My name is', name);
    let score = 0
    return {name, marker,score,printName}
}

let player1 = createPlayer('Player1', 'X')
let player2 = createPlayer('Player2', 'O')


let Gameboard = [,,,,,,,,,]

const getTurn = () => {
    let filledValues = Gameboard.filter(x => x=='O'||x=='X').length + 1
    if(filledValues % 2 === 0){
        return player1
    }
    else {
        return player2
    }
}

const displayController = (() => {
    const cards = document.getElementsByClassName('gameCards')
    const reset = document.getElementById('reset')
    Array.from(cards).forEach((card => {  
        card.addEventListener('click',() =>{
            let markedField = card.dataset.index
            //get the player of the turn including its marker and add it to the DOM
            player = getTurn()

            //reset board if its full

            if ((Gameboard.filter(x => x=='O'||x=='X').length + 1)==9) {
                resetBoard()
            }
            //prevent filled cards from getting refilled
            if(Gameboard[markedField]==null){

                Gameboard[markedField] = player.marker
                card.innerHTML = player.marker
                if (checkForWin()) {
                    updateScore(player)
                    setTimeout(() => {
                        declareWinner(player.name)
                        resetBoard()
                    }, 100);
                    
                }
            }
        })
    }))

    reset.addEventListener('click',() => {
        resetBoard()
    })



})();


const checkForWin = () => {
if (Gameboard[0] != null &&Gameboard[0]===Gameboard[1] && Gameboard[0]===Gameboard[2]){
    return true
}
else if (Gameboard[6] != null && Gameboard[6]===Gameboard[7] && Gameboard[6]===Gameboard[8]){
    return true
}
else if (Gameboard[0] != null && Gameboard[0]===Gameboard[3] && Gameboard[0]===Gameboard[6]){
    return true
}

else if (Gameboard[1] != null && Gameboard[1]===Gameboard[4] && Gameboard[1]===Gameboard[7]){
    return true
}

else if (Gameboard[3] != null && Gameboard[3]===Gameboard[4] && Gameboard[3]===Gameboard[5]){
    return true
}

else if (Gameboard[2] != null && Gameboard[2]===Gameboard[5] && Gameboard[2]===Gameboard[8]){
    return true
}

else if (Gameboard[0] != null && Gameboard[0]===Gameboard[4] && Gameboard[0]===Gameboard[8]){
    return true
}

else if (Gameboard[2] != null && Gameboard[2]===Gameboard[4] && Gameboard[2]===Gameboard[6]){
    return true
}
}

const updateScore = (player) => {
    if (player1===player) {
    player1.score+=1
}
    else {
    player2.score+=1
    }
    document.getElementById('player1').innerHTML = player1.score
    document.getElementById('player2').innerHTML = player2.score

}

const declareWinner = (player) => {
alert(player + ' won!')
}




const resetBoard = () => {
    Gameboard = [,,,,,,,,,]
    const cards = document.getElementsByClassName('gameCards')
    Array.from(cards).forEach((card => { 
    card.innerHTML = ''
    }))
}


