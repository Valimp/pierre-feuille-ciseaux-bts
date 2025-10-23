const score = document.getElementById('score-actuel');
const botScore = document.getElementById('score-bot')
const resultat = document.getElementById('resultat');

const rockButton = document.getElementById('pierre');
const paperButton = document.getElementById('feuille');
const scissorsButton = document.getElementById('ciseaux');

const choixBot = document.getElementById('choix-bot');
const choixJoueur = document.getElementById('choix-joueur');
const bestScoreDisplay = document.getElementById('best-score');

let playerScore = 0;
let computerScore = 0;
let bestScore = 0;


// Function take nothing and return a random choice between 'pierre', 'feuille', 'ciseaux'
function getComputerChoice() {
    const choices = ['pierre', 'feuille', 'ciseaux'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function win border animation
function addWinBorder(button) {
    button.classList.add('win-border');
    setTimeout(() => {
        button.classList.remove('win-border');
    }, 1000);
}
function addLoseBorder(button) {
    button.classList.add('lose-border');
    setTimeout(() => {
        button.classList.remove('lose-border');
    }, 1000);
}
function addDrawBorder(button) {
    button.classList.add('draw-border');
    setTimeout(() => {
        button.classList.remove('draw-border');
    }, 1000);
}


// Function to play a round of the game taking player's choice as parameter
function playRound(playerSelection) {

    // Set computer's choice
    const computerSelection = getComputerChoice();
    // Initialize round result message
    let roundResult = '';

    choixBot.textContent = `Le bot a choisi : ${computerSelection}`;
    choixJoueur.textContent = `Vous avez choisi : ${playerSelection}`;


    // Determine the winner of the round
    if (playerSelection === computerSelection) {
        roundResult = `Égalité! Vous avez tous les deux choisi ${playerSelection}.`;
        if (playerSelection === 'pierre') {
            addDrawBorder(rockButton);
        }
        else if (playerSelection === 'feuille') {
            addDrawBorder(paperButton);
        }
        else if (playerSelection === 'ciseaux') {
            addDrawBorder(scissorsButton);
        }
    } 
    // Winning conditions for the player 
    else if (
        (playerSelection === 'pierre' && computerSelection === 'ciseaux') ||
        (playerSelection === 'feuille' && computerSelection === 'pierre') ||
        (playerSelection === 'ciseaux' && computerSelection === 'feuille')
    ) {
        if (playerSelection === 'pierre') {
            // Ajouter la classe win-border temporairement pour l'animation
            addWinBorder(rockButton);
        }
        else if (playerSelection === 'feuille') {
            addWinBorder(paperButton);
        }
        else if (playerSelection === 'ciseaux') {
            addWinBorder(scissorsButton);
        }
        playerScore++;
        roundResult = `Vous gagnez! ${playerSelection} bat ${computerSelection}.`;
    } 
    // Losing conditions for the player
    else {
        botScore.textContent += " ❌ ";
        computerScore++;
        roundResult = `Vous perdez! ${computerSelection} bat ${playerSelection}.`;
        if (playerSelection === 'pierre') {
            addLoseBorder(rockButton);
        }
        else if (playerSelection === 'feuille') {
            addLoseBorder(paperButton);
        }
        else if (playerSelection === 'ciseaux') {
            addLoseBorder(scissorsButton);
        }
        if (computerScore === 5) {
            roundResult += ' Le bot a atteint 5 points. Vous avez perdu la partie!';
            if (playerScore > bestScore) {
                bestScore = playerScore;
                // Store in the local storage
                localStorage.setItem('bestScore', bestScore);
                bestScoreDisplay.textContent = `Meilleur score : ${bestScore}`;
            }
            playerScore = 0;
            computerScore = 0;
            botScore.textContent = '';
        }
    }
    
    score.textContent = `Votre score : ${playerScore}`;
    resultat.textContent = roundResult;

}

rockButton.addEventListener('click', () => playRound('pierre'));
paperButton.addEventListener('click', () => playRound('feuille'));
scissorsButton.addEventListener('click', () => playRound('ciseaux'));

// Initial score display
score.textContent = `Votre score : ${playerScore}`;
resultat.textContent = 'Faites votre choix pour commencer le jeu!';