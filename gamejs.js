"use strict";
const sim1 = "X";
const sim2 = "O";
let table = document.querySelector(".table");
const gridItems = document.querySelectorAll(".grid-item");
const start = document.querySelector('.start');
let round = document.querySelector("#round");
let roundBig = document.querySelector(".round");
let player1Score = document.querySelector("#score1");
let player2Score = document.querySelector("#score2");
let player1Simbol = document.querySelector("#simb1");
let player2Simbol = document.querySelector("#simb2");
let turnPlayer= document.querySelector(".turn");
let roundWin = document.querySelector(".roundWin");
let winRound = document.querySelector(".winRound");
let winerRound = document.querySelector(".winnerRound");
let nextRound = document.querySelector(".nextRound");
let roundOver = document.querySelector(".roundOver");
let gameWiner = document.querySelector(".gameWin");
let activePlayer;
let st = 0;
const activeSimbol=(player)=>{
  if(player=="player1"){
    return player1Simbol.textContent;
  }else{
    return player2Simbol.textContent;
  }
};

function turnSimbol() {
   let turnedSimbol = player1Simbol.textContent;
   player1Simbol.textContent = player2Simbol.textContent;
   player2Simbol.textContent = turnedSimbol;
}

function turnActivePlayer() {
  if (activePlayer == "player1") {
     activePlayer = "player2";
  } else {
    activePlayer = "player1";
  }
}


function gameOver() {
  let fill = 0;
  for (const gridItem of gridItems) {
    if (gridItem.textContent !== " ") {
      fill++;
    }
  }
  console.log(fill);
  if(fill == 6){
    if(st == 0){
      if(round.textContent < 5){
       turnPlayer.classList.add('hidden');
       roundOver.classList.remove('hidden');
       round.textContent ++;
      }else{
        round.textContent ++;
      }
    }
  }
}

  

function gameWin(){
  if(round.textContent == 6){
    table.classList.add('hidden');
    turnPlayer.classList.add('hidden');
    roundWin.classList.add('hidden');
    roundBig.classList.add('hidden');
    roundOver.classList.add('hidden');
    nextRound.classList.add('hidden');
    gameWiner.classList.remove('hidden');
    if(player1Score.textContent > player2Score.textContent){
        gameWiner.textContent =  " Player1 wins the game !!!";
    }
    else if( player2Score.textContent > player1Score.textContent){
      gameWiner.textContent =  " Player2 wins the game !!!";
    }else if(player1Score.textContent==player2Score.textContent !==0){
      gameWiner.textContent=" GAME IS DRAW";
    }
  }
}


function checkWin(player){
  const wins =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6],]
  wins.forEach(e=>{
    if((gridItems[e[0]].textContent==gridItems[e[1]].textContent) && (gridItems[e[1]].textContent==gridItems[e[2]].textContent)&& (gridItems[e[0]].textContent !=" ")){
      if(player=="player1"){
        player1Score.textContent ++;
      }else if(player=="player2"){
        player2Score.textContent ++;
      }turnPlayer.classList.add('hidden')
      roundWin.classList.remove('hidden');
      round.textContent ++;
      st = 1;
    }
  })
  gameOver();
  console.log(round.textContent);
  gameWin();
}

start.addEventListener('click', function() {
  console.log("Hello world");
  round.textContent = 1;
  player1Score.textContent = player2Score.textContent = 0;
  player1Simbol.textContent = sim1;
  player2Simbol.textContent = sim2;
  activePlayer = "player1";
  turnPlayer.textContent = 'Turn for '+activePlayer;
  winerRound.textContent = activePlayer;
});


for (const gridItem of gridItems) {
  gridItem.addEventListener("click", function() {
    if (gridItem.textContent === ' ') {
      gridItem.textContent = activeSimbol(activePlayer);
      winerRound.textContent = activePlayer;
      checkWin(activePlayer);
      console.log(st);
      st = 0;
      turnActivePlayer();
      turnPlayer.textContent = 'Turn for ' + activePlayer;
    }
  });
}
 

nextRound.addEventListener('click',function(){
  if(round.textContent <=5){
    for(let i =0;i< gridItems.length;i++){
      gridItems[i].textContent=' '
    };
    roundWin.classList.add('hidden');
    roundOver.classList.add('hidden');
    turnPlayer.classList.remove('hidden');
    turnSimbol();
  }
});

