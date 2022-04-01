const selectionBtn = document.querySelectorAll('.selection-btn')
const square = document.querySelectorAll('.box')

const box0 = document.getElementById('box0')
const box1 = document.getElementById('box1')
const box2 = document.getElementById('box2')
const box3 = document.getElementById('box3')
const box4 = document.getElementById('box4')
const box5 = document.getElementById('box5')
const box6 = document.getElementById('box6')
const box7 = document.getElementById('box7')
const box8 = document.getElementById('box8')

const modal = document.getElementById('modal')
const closeBtn = document.getElementById('close')
const overlay = document.getElementById('overlay')
const modalText = document.getElementById('modal-text')

let player1
let player2

const Gameboard = (() => {

    let playerChoicesArr = []

    const restart = document.getElementById('restart');
    restart.addEventListener('click', resetGame)

    function resetGame() {
        square.forEach(function(elem){
            elem.innerHTML = '';
            elem.classList.remove('used')
            playerChoicesArr.length = 0
        })
        selectionBtn.forEach(function(btn){
            btn.classList.remove('clicked')
        })
        player1 = undefined;
        square.forEach(function(elem){
            elem.classList.remove('ready')
        })
    }

    closeBtn.addEventListener('click', () =>{
        modal.classList.toggle('active')
        overlay.classList.toggle('active')
        Gameboard.resetGame();
        console.log('clicky')
    })

    return {
        playerChoicesArr, resetGame
    }
})();


const PlayerMaker = (letterSelection) => {
    return {letterSelection}
}


const Game = (() => {
    let currentPlayer = '';

    selectionBtn.forEach(function(btn){
        btn.addEventListener('click', function(){
            if(player1 == undefined){
                player1 = PlayerMaker(btn.innerHTML)
                btn.classList.add('clicked')
                square.forEach(function(elem){
                    elem.classList.add('ready')
                })
                if(player1.letterSelection == 'X'){
                    player2 = PlayerMaker('O')
                } else {
                    player2 = PlayerMaker('X')
                }
            }
        })
    })

    square.forEach(function(elem){
        elem.addEventListener('click', function(){

            if(player1 == undefined){
                alert('Please select your weapon before playing')
                return
            }

            if(Gameboard.playerChoicesArr[Gameboard.playerChoicesArr.length - 1] == player1.letterSelection || Gameboard.playerChoicesArr[Gameboard.playerChoicesArr.length] == 0){
                currentPlayer = player2
            } else {
                currentPlayer = player1
            }

            if(elem.classList.contains('used')){
                return
            } else {
                Gameboard.playerChoicesArr.push(currentPlayer.letterSelection)
                elem.innerHTML = `${currentPlayer.letterSelection}`
                elem.classList.add('used');
                checkWin()
            }
        })
    })

    function checkWin(){
        
        let winner = ''

        if(box0.innerHTML == box3.innerHTML && box0.innerHTML == box6.innerHTML && box0.innerHTML != ''){
            winner = `${box0.innerHTML}`
        }
        if(box0.innerHTML == box1.innerHTML && box0.innerHTML == box2.innerHTML && box0.innerHTML != ''){
            winner = `${box0.innerHTML}`
        }
        if(box0.innerHTML == box4.innerHTML && box0.innerHTML == box8.innerHTML && box0.innerHTML != ''){
            winner = `${box0.innerHTML}`
        }
        if(box1.innerHTML == box4.innerHTML && box1.innerHTML == box7.innerHTML && box1.innerHTML != ''){
            winner = `${box1.innerHTML}`
        }
        if(box2.innerHTML == box5.innerHTML && box2.innerHTML == box8.innerHTML && box2.innerHTML != ''){
            winner = `${box2.innerHTML}`
        }
        if(box2.innerHTML == box4.innerHTML && box2.innerHTML == box6.innerHTML && box2.innerHTML != ''){
            winner = `${box2.innerHTML}`
        }
        if(box3.innerHTML == box4.innerHTML && box3.innerHTML == box5.innerHTML && box3.innerHTML != ''){
            winner = `${box3.innerHTML}`
        }
        if(box6.innerHTML == box7.innerHTML && box6.innerHTML == box8.innerHTML && box6.innerHTML != ''){
            winner = `${box6.innerHTML}`
        }

        if (Gameboard.playerChoicesArr.length == 9 && winner == ''){
            modal.classList.toggle('active')
            overlay.classList.toggle('active')
            modalText.innerHTML = 'Tie Game!'
        } else if (winner !== ''){
           setTimeout(announceWinner,250)
        }

        function announceWinner(){
            modal.classList.toggle('active')
            overlay.classList.toggle('active')
            if(winner == player1.letterSelection){
                modalText.innerHTML = 'Player 1 wins!'
            } else {
                modalText.innerHTML = 'Player 2 wins!'
            }
        }
    }
})()


// Winning Combos 

// 0,3,6
// 0,1,2
// 0,4,8

// 1,4,7

// 2,5,8
// 2,4,6

// 3,4,5
// 6,7,8