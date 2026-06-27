let userScore = 0;
let botScore = 0;
let isPlaying = false;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const botScorePara = document.querySelector("#bot-score");

const userDisplay = document.querySelector("#user-choice-display");
const botDisplay = document.querySelector("#bot-choice-display");

const clickSound = new Audio("./sounds/click.mp3");
const winSound = new Audio("./sounds/win.mp3");
const loseSound = new Audio("./sounds/lose.mp3");
const drawSound = new Audio("./sounds/draw.mp3");

const emoji = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};

const playSound = (sound) => {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
};

const genComputerChoice = () => {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * options.length)];
};

const drawGame = () => {
    playSound(drawSound);

     setTimeout(() => {
        drawSound.pause();
        drawSound.currentTime = 0;
    }, 700);
    
    msg.innerText = "🤝 It's a Draw!";
    msg.style.background = "#475569";
};

const animateScore = (element) => {
    element.classList.add("score-update");

    setTimeout(() => {
        element.classList.remove("score-update");
    }, 400);
};

const animateChoice = () => {
    userDisplay.classList.add("pop");
    botDisplay.classList.add("pop");

    setTimeout(() => {
        userDisplay.classList.remove("pop");
        botDisplay.classList.remove("pop");
    }, 500);
};

const showWinner = (userWin, userChoice, compChoice) => {

    animateChoice();

    if (userWin) {

        playSound(winSound);

        userScore++;
        userScorePara.innerText = userScore;

        animateScore(userScorePara);

        msg.innerText = `🎉 ${userChoice.toUpperCase()} beats ${compChoice.toUpperCase()}!`;
        msg.style.background = "#16a34a";

    } else {

        playSound(loseSound);

        botScore++;
        botScorePara.innerText = botScore;

        animateScore(botScorePara);

        msg.innerText = `💀 ${compChoice.toUpperCase()} beats ${userChoice.toUpperCase()}!`;
        msg.style.background = "#dc2626";
    }

};

const battleAnimation = (userChoice, compChoice) => {

    userDisplay.innerText = emoji[userChoice];

    const loading = ["🪨", "📄", "✂️"];

    let index = 0;

    botDisplay.classList.add("shake");

    msg.innerText = "🤖 Bot is thinking...";
    msg.style.background = "#2563eb";

    const spin = setInterval(() => {

        botDisplay.innerText = loading[index];

        index++;

        if (index >= loading.length) {
            index = 0;
        }

    }, 120);

    setTimeout(() => {

        clearInterval(spin);

        botDisplay.classList.remove("shake");

        botDisplay.innerText = emoji[compChoice];

        if (userChoice === compChoice) {

            drawGame();
            isPlaying = false;
            return;
        }

        let userWin;

        switch (userChoice) {

            case "rock":
                userWin = compChoice === "scissors";
                break;

            case "paper":
                userWin = compChoice === "rock";
                break;

            case "scissors":
                userWin = compChoice === "paper";
                break;
        }

        showWinner(userWin, userChoice, compChoice);

        isPlaying = false;

    }, 1200);

};

const playGame = (userChoice) => {

    if (isPlaying) return;

    isPlaying = true;

    playSound(clickSound);

    const compChoice = genComputerChoice();

    battleAnimation(userChoice, compChoice);

};

choices.forEach(choice => {

    choice.addEventListener("click", () => {

        if (isPlaying) return;

        choices.forEach(c => c.classList.remove("active"));

        choice.classList.add("active");

        playGame(choice.id);

    });

});