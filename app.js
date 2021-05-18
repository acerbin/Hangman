
const wordSpot = document.querySelector('#word');
const guessesLeft = document.querySelector('#guessesLeft');
const welcome = document.querySelector('#welcome');
const instruction = document.querySelector('#instruction');
const guessesLeftH1 = document.querySelector('#guessesLeftH1');
const wordSpotH1 = document.querySelector('#wordSpotH1');
const refreshButton = document.querySelector('#newGame');
//const meadTest = document.querySelector('#meadTest');

//    <h2 id="meadTest">Mead test?</h2>


// const words = [
// 'what', 'which', 'dolphin', 'photo', 'blew', 'new', 'said', 'so', 'dominoes', 'goes', 'Autumn', 'launch', 'donkey', 'money', 'have', 'like', 'shape', 'gene',
// 'evening', 'spice', 'shine','some','come', 'phone', 'alone', 'cope', 'flute', 'tube', 'attitude', 'were', 'there'
// ]

const words = [
  "the", "saw", "was", "he", "she", "his", "her", "went", "have", "they",
  "shape", "ashamed", "flame","spade","whale", "glare", "water", "parents"
  ,"were", "where", "there","here","eye","theme","concrete","delete"
  ,"prize", "prime","spine","mice","time","pipe","smile","slide"
  ,"love","move","prove","improve","whole","stone","throne","alone"
  ,"tune","huge","rule", "June","include","cute","use","rude"
]
pos = Math.floor((Math.random()* words.length));
word = words[pos];
let game = JSON.parse(localStorage.getItem('game'));
if( game !== null){
  console.log(game.word.join(""))
  hangman1 = new Hangman(game.word.join(""), game.attemptsLeft);
  hangman1.guessedLetters = game.guessedLetters;
  hangman1.allLetters = game.allLetters;
  hangman1.status = game.status;
} else {
  hangman1 = new Hangman(word, word.length + 1);
  hangman1.guessedLetters.push(word[0]);
  localStorage.setItem("game", JSON.stringify(hangman1));
}


// getPuzzleWithAsync().then((puzzle) => {
//   meadTest.textContent = puzzle;
// }).catch((err) => {
//   console.log("Error is " + err);
// });

//



function updateUI() {
  if(hangman1.status==='playing'){
    console.log('and pattern is ' + hangman1.getPattern());
    //$(wordSpot).trigger("focus");
    wordSpot.value = hangman1.getPattern();
    guessesLeft.textContent = hangman1.attemptsLeft;
    refreshButton.style.display  = "none";
  } else if (hangman1.status === 'failed') {
    wordSpot.style.display = 'none';
    guessesLeft.style.display = 'none';
    instruction.style.display = 'none';
    wordSpotH1.style.display = 'none';
    guessesLeftH1.style.display  = "none";
    welcome.textContent = "Nice try! The word was " + hangman1.word.join('');
    refreshButton.style.display  = "block";
  } else {
    console.log('the winning bit');
    wordSpot.value = hangman1.getPattern();
    guessesLeft.style.display = 'none';
    instruction.style.display = 'none';
    guessesLeftH1.style.display  = "none";
    welcome.textContent = "Great work! You guessed the word.";
    localStorage.removeItem("game");
    refreshButton.style.display  = "block";
  }

}


window.addEventListener('DOMContentLoaded', updateUI);

window.addEventListener('keypress', function(e){
  console.log(e);

  const guess = String.fromCharCode(e.charCode);
  console.log(guess);
  if(hangman1.status === 'playing'){
    hangman1.makeGuess(guess);
    hangman1.updateStatus();
    localStorage.setItem("game", JSON.stringify(hangman1));
    updateUI();
  } else {
    if(e.code === "Enter"){
      window.location.reload();
    }
  }

});

refreshButton.addEventListener('click', function(e){
  window.location.reload();
});

$("#word").click(function() {
  //console.log("pop")
  $("#word").trigger("focus");

  $(this).focus();
});
