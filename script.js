const X_Class = 'x'
const CIRCLE_CLASS = 'circle'

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage') 
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let circleTurn
let drawCount = 0;
let xCount = 0;
let oCount = 0;

const audioWin = new Audio('Assets/win_sfx.mp3')
const audioDraw = new Audio('Assets/draw_sfx.mp3')
const audioBG = new Audio('BG_music.mp3')
const x_sfx = new Audio('Assets/x_sfx.mp3')
const o_sfx = new Audio('Assets/circle_sfx.mp3')


audioBG.play()  
audioBG.loop = true
startGame()


restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
cellElements.forEach(cell => {
    cell.classList.remove(X_Class)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true})
})
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
    audioBG.play()  
    audioBG.loop = true
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_Class
    //placeMark
    placeMark(cell, currentClass)
    if(circleTurn == true){
        o_sfx.play()
    }else if(circleTurn == false){
        x_sfx.play()
    }

    //Check for Win
    if(checkWin(currentClass)){
        endGame(false) 
        audioWin.play()
        audioWin.volume = 0.1

    //Check for Draw
    }else if(isDraw()){
        endGame(true)
        audioDraw.play()
        audioDraw.volume = 0.1

    //Switch Turns & Hover thingy
    }else{
        swapTurns()
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

//Hover X:O
function setBoardHoverClass(){
    board.classList.remove(X_Class)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_Class)
    }
}

function endGame(draw){
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
        drawCount+=1
        document.getElementById('drawScore').innerHTML = drawCount
    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
        if(circleTurn){
            oCount+=1
            document.getElementById('oScore').innerHTML = oCount
        }else{
            xCount+=1
            document.getElementById('xScore').innerHTML = xCount
        }
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_Class) || cell.classList.contains(CIRCLE_CLASS)
    })
  }

function checkWin(currentClass){
   return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
        return cellElements[index].classList.contains(currentClass)
    })
   })
}
