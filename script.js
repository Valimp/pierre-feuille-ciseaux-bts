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


// Fonction qui ne prend aucun paramètre et retourne le choix aléatoire de l'ordinateur
function getComputerChoice() {
    const choices = ['pierre', 'feuille', 'ciseaux'];
    // Utilise Math.random pour sélectionner un choix aléatoire
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Fonction pour l'animation de la bordure de victoire
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


// Fonction principale pour jouer un tour
// Prend le choix du joueur en paramètre, détermine le gagnant, puis met à jour les scores et l'affichage
function playRound(playerSelection) {

    // 1. Obtenir le choix de l'ordinateur
    const computerSelection = getComputerChoice();
    // 2. Initialiser une variable pour stocker le résultat du tour
    let roundResult = '';

    // Afficher les choix des deux joueurs
    choixBot.textContent = `Le bot a choisi : ${computerSelection}`;
    choixJoueur.textContent = `Vous avez choisi : ${playerSelection}`;

    // 3. On détermine qui est le gagnant
    // a. Condition d'égalité
    if (playerSelection === computerSelection) {
        // Mettre à jour le résultat du tour
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
    // b. Conditions de victoire pour le joueur
    else if (
        (playerSelection === 'pierre' && computerSelection === 'ciseaux') ||
        (playerSelection === 'feuille' && computerSelection === 'pierre') ||
        (playerSelection === 'ciseaux' && computerSelection === 'feuille')
    ) {
        // Ajouter 1 au score du joueur
        playerScore++;
        // Mettre à jour le résultat du tour
        roundResult = `Vous gagnez! ${playerSelection} bat ${computerSelection}.`;


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
    } 
    // c. Conditions de victoire pour l'ordinateur
    else {
        // Ajouter 1 au score de l'ordinateur
        computerScore++;
        botScore.textContent += " ❌ ";
        // Mettre à jour le résultat du tour
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

        // Après avoir perdu une manche, on vérifie si l'ordinateur a atteint 5 points
        if (computerScore === 5) {

            // Si c'est le cas, on affiche un message de fin de partie et on réinitialise les scores
            roundResult += ' Le bot a atteint 5 points. Vous avez perdu la partie!';


            // Si le meilleur score est battu, on le met à jour
            if (playerScore > bestScore) {
                bestScore = playerScore;
                // Store in the local storage
                localStorage.setItem('bestScore', bestScore);
                bestScoreDisplay.textContent = `Meilleur score : ${bestScore}`;
            }

            // Réinitialiser les scores
            playerScore = 0;
            computerScore = 0;
            botScore.textContent = '';
        }
    }
    
    // 4. Mettre à jour l'affichage des scores et du résultat
    score.textContent = `Votre score : ${playerScore}`;
    resultat.textContent = roundResult;

}

// Charger le meilleur score depuis le local storage au chargement de la page
const storedBestScore = localStorage.getItem('bestScore');
// Si un meilleur score est trouvé, on le convertit en entier et on met à jour l'affichage
if (storedBestScore) {
    bestScore = parseInt(storedBestScore);
    bestScoreDisplay.textContent = `Meilleur score : ${bestScore}`;
}

// On ajoute les écouteurs d'événements aux boutons
rockButton.addEventListener('click', () => playRound('pierre'));
paperButton.addEventListener('click', () => playRound('feuille'));
scissorsButton.addEventListener('click', () => playRound('ciseaux'));

// Initialisation de l'affichage au chargement de la page
score.textContent = `Votre score : ${playerScore}`;
resultat.textContent = 'Faites votre choix pour commencer le jeu!';