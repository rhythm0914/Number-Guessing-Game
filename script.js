// Game Variables
let randomNumber = 0;
let attempts = 0;
const maxAttempts = 10;
let score = 0;
let coins = 0;
let energy = 5;
let selectedDifficulty = 100;

// DOM Elements
const menuScreen = document.getElementById("menuScreen");
const gameScreen = document.getElementById("gameScreen");
const guessInput = document.getElementById("guess");
const attemptsDisplay = document.getElementById("attempts");
const scoreDisplay = document.getElementById("score");
const hintDisplay = document.getElementById("hint");
const motivationDisplay = document.getElementById("motivation");
const coinCountDisplay = document.getElementById("coin-count");
const energyCountDisplay = document.getElementById("energy-count");
const energyBar = document.getElementById("energy-bar");

const winModal = document.getElementById("winModal");
const loseModal = document.getElementById("loseModal");
const modalBackdrop = document.getElementById("modalBackdrop");

// Buttons
const startGameBtn = document.getElementById("startGame");
const submitGuessBtn = document.getElementById("submitGuess");
const exitGameBtn = document.getElementById("exitGame");
const tryAgainBtns = document.querySelectorAll(".tryAgain");

// 🎮 Start Game
startGameBtn.addEventListener("click", () => {
    if (energy <= 0) {
        alert("⚠️ Not enough energy! Wait for it to refill.");
        return;
    }

    energy--;
    updateEnergy();

    selectedDifficulty = parseInt(document.getElementById("difficulty").value);
    randomNumber = Math.floor(Math.random() * selectedDifficulty) + 1;

    document.getElementById("range").textContent = `1 and ${selectedDifficulty}`;
    attempts = 0;

    // Reset UI
    attemptsDisplay.textContent = attempts;
    hintDisplay.textContent = "🔍 Start guessing!";
    motivationDisplay.textContent = "";
    guessInput.value = "";
    guessInput.disabled = false;
    submitGuessBtn.disabled = false;

    // Switch Screens
    menuScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
});

// 🎯 Check Guess
submitGuessBtn.addEventListener("click", checkGuess);

function checkGuess() {
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > selectedDifficulty) {
        hintDisplay.textContent = "❌ Enter a valid number within range!";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess === randomNumber) {
        score += 10;
        coins += 5;
        updateStats();
        showWinModal();
    } else if (attempts >= maxAttempts) {
        showLoseModal(); // 🔥 Ensure lose modal appears
    } else {
        hintDisplay.textContent = guess > randomNumber ? "⬇️ Too high!" : "⬆️ Too low!";
        motivationDisplay.textContent = getMotivationalMessage();
    }
}

// 📊 Update Stats
function updateStats() {
    scoreDisplay.textContent = score;
    coinCountDisplay.textContent = coins;
}

// ⚡ Update Energy Bar
function updateEnergy() {
    energyCountDisplay.textContent = energy;
    energyBar.style.width = `${(energy / 5) * 100}%`;
}

// 🏆 Show Win Modal
function showWinModal() {
    document.getElementById("winMessage").textContent = `🎉 You guessed it in ${attempts} attempts!`;
    winModal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
    disableGameInputs();
}

function showLoseModal() {
    console.log("🔥 Showing Lose Modal"); // Debugging
    document.getElementById("loseMessage").textContent = `😞 Game Over! The correct number was ${randomNumber}.`;

    document.getElementById("loseModal").classList.remove("hidden");
    document.getElementById("modalBackdrop").classList.remove("hidden");

    disableGameInputs();
}

// 🔒 Disable Input & Button After Game Ends
function disableGameInputs() {
    guessInput.disabled = true;
    submitGuessBtn.disabled = true;
}

// 🔁 Try Again Button
tryAgainBtns.forEach(button => {
    button.addEventListener("click", () => {
        winModal.classList.add("hidden");
        loseModal.classList.add("hidden");
        modalBackdrop.classList.add("hidden");

        // Return to Menu
        menuScreen.classList.remove("hidden");
        gameScreen.classList.add("hidden");
    });
});

// 🚪 Exit Game Button
exitGameBtn.addEventListener("click", () => {
    menuScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
});

// ⏳ Auto Energy Refill Every 30 Seconds
setInterval(() => {
    if (energy < 5) {
        energy++;
        updateEnergy();
    }
}, 30000);

// 🔥 Motivational Messages
function getMotivationalMessage() {
    const messages = [
        "💪 Keep going! You got this!",
        "🔥 Don't give up! Try again!",
        "🎯 You're getting closer!",
        "🚀 Almost there! Keep trying!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}
