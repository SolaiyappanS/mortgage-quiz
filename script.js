//Initial References
const letterContainer = document.getElementById("letter-container");
const hintContainer = document.getElementById("hint-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");
let wordCount = 0;

//Options values for buttons
let options = {
  words: [
    { word: "Mortgage", hint: "A loan secured by real estate" },
    {
      word: "Loan",
      hint: "A sum of money lent, typically at interest, with the expectation of repayment",
    },
    { word: "Finance", hint: "The management of money" },
    { word: "Savings", hint: "Money set aside for future use" },
    { word: "Interest", hint: "A charge for the use of money" },
    { word: "Repayment", hint: "The act of paying back a debt" },
    { word: "Debt", hint: "A liability to pay or do something" },
    {
      word: "Credit",
      hint: "The ability to obtain goods or services before payment",
    },
    { word: "Collateral", hint: "Assets pledged as security for a loan" },
    {
      word: "EMI",
      hint: "A fixed monthly payment for a loan",
    },
  ],
};

//count
let winCount = 0;
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
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
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

  chosenWord = optionArray[wordCount].word;
  hintContainer.innerHTML = `<p><b>Hint:</b> ${optionArray[wordCount].hint}</p>`;
  chosenWord = chosenWord.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = (type) => {
  if (type === "new") wordCount = 0;
  else wordCount += 1;

  winCount = 0;
  count = 0;

  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
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
newGameButton.addEventListener("click", () => initializer("continue"));
window.onload = initializer("new");

function chooseLetter(chosenWord1, letterText) {
  let charArray = chosenWord1.split("");
  //if array contains clciked value replace the matched dash with letter else dram on canvas
  if (
    charArray.includes(letterText.toUpperCase()) &&
    !document.getElementById("letter_" + letterText.toUpperCase()).disabled
  ) {
    console.log(letterText);

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
          blocker();
        }
      }
    });
  }
  //disable clicked button1
  document.getElementById("letter_" + letterText.toUpperCase()).disabled = true;
}
