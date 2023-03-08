const letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = letters.split("");

let lettersContainer = document.querySelector('.letters');

lettersArray.forEach(letter => {
    let span = document.createElement('span');
    let spanText = document.createTextNode(letter);
    span.appendChild(spanText);
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
});

const words = {
    strikers: ["Benzema", "Lewandowski", "Mbappe", "Haaland", "Ronaldo"],
    midfielder: ["Messi", "Saka", "De Bruyne", "Modric", "Pedri"],
    defenders: ["van Dijk", "Ramos", "Rudiger", "Dias", "Araujo"],
    goalkeepers: ["Neuer", "Alisson", "Mendy", "Courtois", "de Gea"]
}

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);

let randomPropName = allKeys[randomPropNumber];

let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

let randomValueValue = randomPropValue[randomValueNumber];

document.querySelector('.game-info .category span').innerHTML = randomPropName;

let lettersGuessContainer = document.querySelector('.letters-guess');

let lettersAndSpaces = randomValueValue.split("");

let rightChoose = 0;

lettersAndSpaces.forEach(letter => {
    let span = document.createElement('span');
    if(letter === ' '){
        span.className = "has-space";
        rightChoose++;
    }
    lettersGuessContainer.appendChild(span);
});

let guessSpans = document.querySelectorAll('.letters-guess span');

let wrongAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");

document.addEventListener('click', (e)=>{
    let theStatus = false;
    if(e.target.className === 'letter-box'){
        e.target.classList.add("clicked");
        let theClickedLetter = e.target.innerHTML.toLowerCase();
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        theChosenWord.forEach((wordLetter, wordIndex) => {
            if(wordLetter == theClickedLetter){
                theStatus = true;
                rightChoose++;
                if(rightChoose === theChosenWord.length){
                    won();
                    lettersContainer.classList.add("finished");
                }
                guessSpans.forEach((span, spanIndex) => {
                    if(spanIndex === wordIndex){
                        span.innerHTML = wordLetter;
                    }
                });
            }
        });
        if(theStatus !== true){
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            document.getElementById("fail").play();
            if(wrongAttempts === 8){
                endGame();
                lettersContainer.classList.add("finished");
            }
        }else{
            document.getElementById("success").play();
        }
    }
});

function endGame(){
    let div = document.createElement('div');
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
    div.appendChild(divText);
    let button = document.createElement('button');
    button.innerHTML = 'Play Again';
    button.className = 'play-again';
    div.appendChild(button);
    div.className = 'popup';
    document.body.appendChild(div);
    document.getElementById('gameover').play();
    button.addEventListener('click', (e) => {
        location.reload();
    });
}

function won(){
    let div = document.createElement('div');
    let divText = document.createTextNode(`Congratulations You Won!!!`);
    div.appendChild(divText);
    let button = document.createElement('button');
    button.innerHTML = 'Play Again';
    button.className = 'play-again';
    div.appendChild(button);
    div.className = 'popup';
    document.body.appendChild(div);
    document.getElementById('win').play();
    button.addEventListener('click', (e) => {
        location.reload();
    });
}
