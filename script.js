//Initial References
const letterContainer = document.getElementById("letter-container");
const hintContainer = document.getElementById("hint-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const winContainer = document.getElementById("win-container");
const loseContainer = document.getElementById("lose-container");
const winButton = document.getElementById("win-button");
const loseButton = document.getElementById("lose-button");
const chosenWordContainer_1 = document.getElementById("chosenWord_1");
const chosenWordContainer_2 = document.getElementById("chosenWord_2");
const nextGameContainer = document.getElementById("next_game");
const heartContainer = document.getElementById("heart-container");
let wordsCount = 0;

//Options values for buttons
let options = {
  words: [
    {
      word: "Amortization",
      hint: "Process of gradual debt repayment, interest then principal",
    },
    {
      word: "Equity",
      hint: "The difference between your home's value and mortgage debt",
    },
    {
      word: "Contingency",
      hint: "Condition in a sales contract that must be fulfilled first",
    },
    { word: "Delinquency", hint: "Failure to make payments on time" },
    { word: "Liabilities", hint: "A person's debts or financial obligations" },
    {
      word: "Prepayment",
      hint: "An amount paid to reduce the principal balance of a loan before the principal is due",
    },
    {
      word: "Forbearance",
      hint: "Temporary suspension of loan payments due to financial hardship",
    },
    {
      word: "FICO",
      hint: "A corporation that calculates credit scores assessing credit risk.",
    },
    { word: "Collateral", hint: "Assets pledged as security for a loan" },
    {
      word: "Escrow",
      hint: "Funds held by a third party until conditions are met",
    },
  ],
};

//count
let winCount = 0;
let loseCount = 0;
updateHearts();
let count = 0;

let chosenWord = "";
let chosenHint = "";

//Display option buttons
const displayOptions = () => {
  let buttonCon = document.createElement("div");
  for (let value in options) {
    generateWord(`${value}`);
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const youWin = () => {
  playSound("gameWinSound");
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  chosenWordContainer_1.innerHTML = chosenWord;
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  winContainer.classList.remove("hide");
  if (wordsCount > 8) {
    winButton.classList.add("hide");
    nextGameContainer.classList.remove("hide");
  }
};

//Block all the Buttons
const youLost = () => {
  playSound("loseSound");
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  chosenWordContainer_2.innerHTML = chosenWord;
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  loseContainer.classList.remove("hide");
  if (wordsCount > 8) {
    loseButton.classList.add("hide");
    nextGameContainer.classList.remove("hide");
  }
};

//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word

  chosenWord = optionArray[wordsCount].word;
  hintContainer.innerHTML = `<p><b>Hint:</b> ${optionArray[wordsCount].hint}</p>`;
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

function updateHearts() {
  heartContainer.innerHTML =
    new Array(loseCount).fill("🤍").join("") +
    new Array(5 - loseCount).fill("❤️").join("");
}

//Initial Function (Called when page loads/user presses new game)
const initializer = (type) => {
  if (type === "new") wordsCount = 0;
  else wordsCount += 1;

  winCount = 0;
  count = 0;
  loseCount = 0;
  updateHearts();

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  winContainer.classList.add("hide");
  loseContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    button.setAttribute("id", "letter_" + String.fromCharCode(i));
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () =>
      chooseLetter(chosenWord, button.innerText)
    );
    document.addEventListener("keypress", (e) =>
      chooseLetter(chosenWord, e.key)
    );
    letterContainer.append(button);
  }

  displayOptions();
};

//New Game
winButton.addEventListener("click", () => initializer("continue"));
loseButton.addEventListener("click", () => initializer("continue"));
window.onload = initializer("new");

function chooseLetter(chosenWord1, letterText) {
  let charArray = chosenWord1.split("");
  //if array contains clciked value replace the matched dash with letter else dram on canvas
  if (
    charArray.includes(letterText.toUpperCase()) &&
    !document.getElementById("letter_" + letterText.toUpperCase()).disabled
  ) {
    let dashes = document.getElementsByClassName("dashes");
    charArray.forEach((char, index) => {
      //if character in array is same as clicked button1
      if (char === letterText.toUpperCase()) {
        //replace dash with letter
        dashes[index].innerText = char;
        //increment counter
        winCount += 1;
        //if winCount equals word lenfth
        if (winCount == charArray.length) {
          //block all button1s
          youWin();
        }
      }
    });
  } else if (
    !document.getElementById("letter_" + letterText.toUpperCase()).disabled
  ) {
    loseCount++;
    if (loseCount <= 4) playSound("heartPopSound");
    updateHearts();
    if (loseCount > 4) {
      youLost();
      loseCount = 0;
      updateHearts();
    }
  }
  //disable clicked button1
  document.getElementById("letter_" + letterText.toUpperCase()).disabled = true;
}

function playSound(soundName) {
  document.getElementById(soundName).currentTime = 0;
  document.getElementById(soundName).play();
}
