const textContainer = document.querySelector(".textContainer");
const correctWord = document.querySelector(".correctWord");
const time = document.querySelector(".time");
const startButton = document.querySelector(".startButton");
const displayMessage = document.querySelector(".displayMessage");
const restartBtn = document.querySelector(".restartBtn").setAttribute("hidden", "true");
let text = "Once upon a time, in a small town, there was a boy named Andrei who had a passion for technology but no knowledge of coding. Determined to learn, he embarked on a journey into the world of programming without any prior experience. Struggling at first, he stumbled upon online resources and forums but found solace in the guidance of mentors who generously shared their expertise. With their patient guidance, Andrei began unraveling the mysteries of code, starting from scratch. Through countless late nights and persistent effort, he gradually grasped the fundamentals. His mentors, inspiring figures in his life, offered wisdom, encouragement, and valuable insights. As time passed, Andrei transformed from a novice to a confident coder, crafting his own projects and embracing the creative power of programming. With gratitude to his mentors, he became a mentor himself, guiding others on their coding journeys, sharing knowledge, and paying forward the invaluable gift of mentorship he had received.";
let words = [];
let updateTime;
let keyPressedCorrect = 0;
let currentCharacterIndex = 0;
let currentWordIndex = 0;
let fullWord = 0;
let haveWord = false;
let gameStarted = false;
let seconds = 60;

function startGame() {
    startButton.setAttribute("hidden", "true");
    decreaseTime();
    updateTime = setInterval(decreaseTime, 1000);
    displayText();
    window.addEventListener("keypress", assignColor);
}

function decreaseTime() {
    --seconds;
    time.innerHTML = `Time: ${seconds}:00 seconds`;
    if (seconds < 10) {
        time.innerHTML = `Time: 0${seconds}:00`;
    }
    if (seconds === 0) {
        setTimeOver();
    }
}

function displayText() {
    const story = document.createElement("p");
    story.classList.add("story");
    textContainer.appendChild(story);
    for (let i = 0; i < text.length; ++i) {
        const spanLetter = document.createElement("span");
        spanLetter.textContent = text[i];
        story.appendChild(spanLetter);
    }
    splitTextInWords();
}

function splitTextInWords() {
    words = text.split(" ");
    for (let i = 0; i < words.length; ++i) {
        words[i] = words[i].replace(/[,.]/g,"");
    }
}

function isLetter(character) {
    if ((character >= "a" && character <= "z") || (character >= "A" && character <= "Z")) {
        return character;
    }
}

function isSymbol(symbol) {
    if (symbol === "," || symbol === ".") {
        return symbol;
    }
}

function isSpace(space) {
    if (space === " ") {
        return space
    }
}

function assignColor(event) {
    if (currentCharacterIndex < text.length) {
        if ((isLetter(event.key) && isLetter(text[currentCharacterIndex])) || isSymbol(event.key)) {
            const setColorOnLetter = document.querySelectorAll(".story span");
            if (isLetter(event.key) === text[currentCharacterIndex]) {
                setColorOnLetter[currentCharacterIndex].style.color = "green";
                ++keyPressedCorrect;
            } else if (isSymbol(event.key) === text[currentCharacterIndex]) {
                setColorOnLetter[currentCharacterIndex].style.color = "green"; 
            } else {
                setColorOnLetter[currentCharacterIndex].style.color = "red";
                keyPressedCorrect = 0;
                haveWord = false;
            }
            displayCorrectWords();
            ++currentCharacterIndex;
        } else {
            if (isSpace(event.key) && isSpace(text[currentCharacterIndex])) {
                if (haveWord === true) {
                    keyPressedCorrect = 0;
                    ++currentCharacterIndex;
                } else {
                    keyPressedCorrect = 0;
                    ++currentWordIndex;
                    ++currentCharacterIndex;
                }
            }
        }
        if (currentCharacterIndex === text.length) {
            removeEventListener("keypress", assignColor);
            return;
        }
    }
}

function displayCorrectWords() {
    if (keyPressedCorrect === words[currentWordIndex].length) {
        ++currentWordIndex;
        ++fullWord;
        correctWord.innerHTML = `Correct words: ${fullWord}`;
        haveWord = true;
    }
}

function setTimeOver() {
    clearInterval(updateTime);
    displayMessage.innerHTML = "TIME OVER !!!";
    removeEventListener("keypress", assignColor);
    document.querySelector(".restartBtn").removeAttribute("hidden", "true");
    return;
}

function restartGame() {
    location.reload();
}

