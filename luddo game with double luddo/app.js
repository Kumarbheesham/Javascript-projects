/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying, previousScore, winningScores;


init();

var dicebtn = document.querySelector('.btn-roll');

dicebtn.addEventListener('click', function(){
   if(gamePlaying){
      dice = Math.floor(Math.random()*6)+1;
      diceTwo = Math.floor(Math.random()*6)+1;

      console.log(dice, diceTwo);



      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      var diceTwoDOM = document.querySelector('.dice-2');
      diceTwoDOM.style.display = 'block';

      diceDOM.src = 'dice-' + dice + '.png';
      diceTwoDOM.src = 'dice-'+ diceTwo + '.png';

      if (dice == 1 || diceTwo == 1){

                  nextPlayer();
         // if (dice !== 6){
         //    roundScores += dice;
         //    document.getElementById('current-' + activePlayer).textContent = roundScores;
         //    previousScore = dice;
         //
         // } else {
         //    if (previousScore !== 6) {
         //       roundScores += dice;
         //       document.getElementById('current-' + activePlayer).textContent = roundScores;
         //       previousScore = dice;
         //
         //    } else {
         //       document.querySelector('#score-' + activePlayer ).textContent = 0;
         //       scores[activePlayer] = 0;
         //       nextPlayer();
         //    }



      }else{
         roundScores += (dice+diceTwo);
         document.getElementById('current-' + activePlayer).textContent = roundScores;
      }

   }
});

document.querySelector('.btn-hold').addEventListener('click',function() {
      // Add scores
      if(gamePlaying){
         scores[activePlayer] += roundScores;

         //display the scores
         document.querySelector('#score-' + activePlayer ).textContent = scores[activePlayer];

         //inputScore from user
         var gameScore  =  document.querySelector('.final-score').value;
         var winningS;

         if(gameScore){
            winningS = gameScore;
         }else{
            winningS = 100;
         }


         //check the winner

         if (scores[activePlayer] >= winningS ){
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;

         }else{
            //nextPlayer
            nextPlayer();
         }
      }

});

function nextPlayer(){

   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScores = 0;
   //previousScore = 0;
   document.getElementById('current-0').textContent = 0;
   document.getElementById('current-1').textContent = 0;

   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');

   //document.querySelector('.player-' + activePlayer +'-panel').classList.remove('active');
   //document.querySelector('.player-'+ activePlayer +'-panel').classList.add('active');
   document.querySelector('.dice').style.display = 'none';
   document.querySelector('.dice-2').style.display = 'none';
};


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
   scores = [0,0];
   roundScores = 0;
   activePlayer = 0;
   //previousScore = 0;
   gamePlaying = true;

   //winningScores = parseInt(prompt('please insert the winning score'));
   document.querySelector('.dice').style.display = 'none';
   document.querySelector('.dice-2').style.display = 'none';
   document.getElementById('score-0').textContent = 0;
   document.getElementById('current-0').textContent=0;
   document.getElementById('score-1').textContent=0;
   document.getElementById('current-1').textContent = 0;
   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');
};
