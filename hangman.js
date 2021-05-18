const Hangman = function (word, attemptsLeft) {
  this.word = word.split('');
  this.attemptsLeft = attemptsLeft;
  this.guessedLetters = [];
  this.allLetters = [];
  this.status = 'playing';
}

Hangman.prototype.getPattern = function(){
  result = '';
  this.word.forEach((letter) => {
    if(this.guessedLetters.map((a) => { return a.toLowerCase() }).includes(letter.toLowerCase())){
      result += letter;
    } else if (letter === ' ') {
      result += letter;
    } else {
      result += '*';
    }
  });
  return result;
}

Hangman.prototype.makeGuess = function(letter){
  if(!this.allLetters.includes(letter) && letter.length == 1){
    this.allLetters.push(letter);
    if(this.word.map((a) => { return a.toLowerCase() }).includes(letter)){
      this.guessedLetters.push(letter);
    } else {
      this.attemptsLeft --;
    }
  }
}


Hangman.prototype.updateStatus = function(){
  const won = this.word.every(letter => {
    if(letter===' '){
      return true;
    } else {
      return this.guessedLetters.indexOf(letter.toLowerCase()) > -1;
    }
  });


  if(won){
    console.log('game is won!');
    this.status = 'finished';
    console.log('Status is ' + this.status);
    return;
  }

  if(this.attemptsLeft<=0){
    this.status = 'failed';
    console.log('Status is ' + this.status);
  }


}
