

// ==============
// Constants
// ==============
const overlay = document.querySelector ('#overlay');
const title = document.querySelector('.title');
const startButton = document.querySelector('.btn__reset');
const phraseDiv = document.querySelector('#phrase');
const phraseUl = phraseDiv.querySelector ('ul');
const letter = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const qwertyDiv = document.querySelector('#qwerty');
const letterButtons = qwertyDiv.querySelectorAll('button');
const scoreboard = document.querySelector ('#scoreboard');
const scoreboardLi = document.querySelectorAll ('.tries');

const phrases = [
  'Warsaw is the capital of Poland',
  'I love Javascript';
  'Moscow is the capital of Russia',
  'I love you'
  
];



// ==============
// Variables
// ==============
// Number of missed guesses
let missed = 0;


// ==============
// Functions
// ==============

// Function to get a random phrase and split characters

function getRandomPhraseAsArray(array) {

const randomPhrase = array[Math.floor(Math.random() * array.length)];
return randomPhrase.toUpperCase().split('');

}



// Function that loops through an array of characters

function addPhraseToDisplay (array) {

  for (let i=0; i< array.length; i++) {

    const listItem = document.createElement('li');
    phraseUl.appendChild(listItem);
    listItem.textContent = array[i];

    if (array[i] !== ' ') {
      listItem.className = 'letter';

    } else {
      listItem.className = 'space';
    }
  }
}




// Function  to show the letter if there is a match

function checkLetter(buttonClicked) {

  const  letterClicked = buttonClicked.textContent.toUpperCase();
  let letterFound = false;

  for (let i=0; i < letter.length; i ++) {

    if (letterClicked === letter[i].textContent) {

      letter[i].classList.add('show');
      letterFound = true;

    }
  }

    return letterFound ? letterClicked : null;
  } ;


// Function to check wether the game has been won or lost

function checkWin() {

if (letter.length === show.length) {

  overlay.classList.add('win');
  overlay.style.display ='';
  title.textContent = 'Congratulation, you win!';
  startButton.textContent = "Play Again";
  phrase.style.display='none'


}



if (missed >= 5) {
  overlay.classList.add('lose');
  overlay.style.display ='';
  title.textContent = "Sorry, you lose!";
  startButton.textContent = "Play Again";
  phrase.style.display='none'


  }
}







// ==============
// Event handlers
// ==============

// Listener for when start button is clicked
startButton.addEventListener('click', () => {
  overlay.style.display = 'none';

});



// Listener to the Keyboard

window.addEventListener('click', (e) => {

  if (e.target.tagName === 'BUTTON') {
    e.target.className = 'chosen';
    e.target.disabled = true;

    const letterFound = checkLetter(e.target);

    if (letterFound === null) {
      missed += 1;
    }


    if (missed >= 1 && missed <=5) {

      const heart = scoreboardLi[scoreboardLi.length-missed];
      heart.getElementsByTagName('img')[0].src = 'images/lostHeart.png'
  }
}
  checkWin();
});





// Other Events Listeners

startButton.addEventListener('click', (e) => {


  if (e.target.textContent === 'Play Again') {
    missed = 0;
    phrase.style.display='';



  for (let i =0; i< scoreboardLi.length; i++) {
    const img = scoreboardLi[i].getElementsByTagName('img')[0];
    img.src ='images/liveHeart.png';
  }

while (phraseUl.children.length > 0) {

  phraseUl.removeChild(phraseUl.children[0]);
}

for (let i =0; i < letterButtons.length; i++) {

  letterButtons[i].classList.remove('chosen');
  letterButtons[i].disabled = false;
}

overlay.classList.remove ('win', 'lose');



const newPhrase = getRandomPhraseAsArray(phrases);

addPhraseToDisplay(newPhrase);


}

});






// Execution

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
