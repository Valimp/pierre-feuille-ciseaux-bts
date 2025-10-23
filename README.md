# 🧩 Structure du projet

```
/projet-pfc
│
├── index.html # Structure de la page et éléments du jeu
├── styles.css # Mise en forme visuelle et animations
├── script.js # Logique du jeu et interactions
└── /images
├── bg-game.jpg # Image de fond principale
└── bg.jpg # Image de fond pour les boutons
```

# 🧱 1. Le fichier HTML (index.html)

Le HTML contient la structure de base du jeu :

- Un header avec le titre du jeu

- L’affichage du meilleur score

- Une zone de jeu avec le score actuel, les boutons et les résultats

- Trois boutons correspondant aux choix du joueur : 🗿 (pierre), 🍃 (feuille), ✂️ (ciseaux)

Exemple :

`<button class="button" id="pierre"><span>🗿</span></button>`

💡 Chaque bouton appelle une fonction JavaScript lorsqu’il est cliqué.

# 🎨 2. Le fichier CSS (styles.css)

## Le CSS gère la mise en page, le style graphique, et les animations :

### Styles généraux :

- Utilisation de la police Barriecito via Google Fonts

- Image de fond sur toute la page (background-image)

- Conteneurs flexibles avec display: flex pour centrer les éléments

### Boutons :

Chaque bouton a un fond flouté (filter: blur(8px)) appliqué uniquement sur l’image, pas sur le texte

Effet de zoom au survol (transform: scale(1.05))

Bords arrondis (border-radius: 25px)

### Feedback visuel :

Lorsqu’un bouton est sélectionné :

🟩 Gagné → bordure verte (.win-border)

🟥 Perdu → bordure rouge (.lose-border)

🟨 Égalité → bordure jaune (.draw-border)

💡 Ces effets sont ajoutés et supprimés temporairement depuis le JavaScript avec setTimeout().

# ⚙️ 3. Le fichier JavaScript (script.js)

Le cœur du jeu se trouve ici.
Le script gère :

- Les choix du joueur et du bot

- Le score

- L’affichage des résultats

- Le stockage du meilleur score

## 🔹 Principales variables :

```
let playerScore = 0;
let computerScore = 0;
let bestScore = 0;
```

Elles stockent les scores du joueur, du bot et le meilleur score sauvegardé.

## 🔹 Fonction getComputerChoice()

Renvoie un choix aléatoire entre 'pierre', 'feuille', 'ciseaux' :

```
function getComputerChoice() {
const choices = ['pierre', 'feuille', 'ciseaux'];
const randomIndex = Math.floor(Math.random() \* choices.length);
return choices[randomIndex];
}
```

💡 Utilise Math.random() pour générer un indice aléatoire.

## 🔹 Fonctions d’animation

Exemples :

```
function addWinBorder(button) {
button.classList.add('win-border');
setTimeout(() => button.classList.remove('win-border'), 1000);
}
```

💡 Ajoute temporairement une classe CSS pour l’effet visuel.

## 🔹 Fonction principale : playRound(playerSelection)

C’est la fonction appelée à chaque clic sur un bouton.
Elle :

- Génère le choix du bot

- Compare les choix

- Met à jour les scores et les messages

- Applique les animations visuelles

- Met à jour le meilleur score si nécessaire

## 🔹 Gestion du meilleur score

```
if (playerScore > bestScore) {
bestScore = playerScore;
localStorage.setItem('bestScore', bestScore);
}
```

💾 Le meilleur score reste enregistré même après fermeture du navigateur.

## 🔹 Gestion des événements (clics)

```
rockButton.addEventListener('click', () => playRound('pierre'));
paperButton.addEventListener('click', () => playRound('feuille'));
scissorsButton.addEventListener('click', () => playRound('ciseaux'));
```

💡 Permet de relier les actions utilisateur à la logique du jeu.
