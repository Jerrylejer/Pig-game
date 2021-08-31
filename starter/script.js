'use strict';

// CONSEILS DE REVISION

// revoir les utilisations du currentScore et du tableau pour la répartition des scores

// revoir comment fonctionne la variable playing qui active le jeu lorsque true est constaté et bloque le jeu
// lorsque false lorsque le jeu est gagné par un des joueurs (btns inactivables car jeu dépendant du if(playing))

// revoir la mise en fonction des phases de jeu répétitives : switchPlayer et init

// Séléction des éléments
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Mise en place des variables utiles hors des fonctions
let scores, currentScore, activePlayer, playing;

// FONCTION CHANGEMENT DE L'ACTIVEPLAYER
const switchPlayer = function () {
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Switch css activePlayer
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// FONCTION D'INITIALISATION DU JEU (UTILISATION AVEC LE BTN NEW GAME)
const init = function () {
  // Mise à 0 des scores et currentScores
  scores = [0, 0];
  //Maintien du currentScore
  currentScore = 0;
  // Détermination de l'activePlayer
  activePlayer = 0;
  // JEU ACTIF OU INACTIF - création d'une variable de type booléan: TRUE = jeu possible; FALSE = jeu bloqué
  playing = true;
  // Mise à 0 de l'affichage scores et currentScores
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  // Réactivation du dé
  diceEl.classList.remove('hidden');
  // Class player--winner et active player (joueur 1) à enlever
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  // Remise en route de l'activePlayer joueur 0
  player0El.classList.add('player--active');
};

// INITIALISATION DU JEU LORS DU LANCEMENT DU JEU - (PREMIERE PARTIE SANS LE BTN NEW GAME)
init();

//Disparition du dé par l'activation d'une class css hidden à l'aide de js
diceEl.classList.add('hidden');

// BOUTON DE LANCEMENT DU DE
//Faire apparaitre le dé au click roll-btn et Math.Random entre 1 et 6
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Détermination du lancé
    const dice = Math.trunc(Math.random() * 6) + 1;
    // Faire apparaitre le dé
    diceEl.classList.remove('hidden');
    // Faire apparaitre la face du dé correspondant au lancé avec l'élément src et la constante dice qui numérise le chiffre.png de la face du dé correspondant
    diceEl.src = `dice-${dice}.png`;
    // Vérification si 1 ou pas
    if (dice !== 1) {
      // Implémenter le currentScore tant que coup de dé !== 1
      currentScore += dice;
      // Activation du currentScore
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Remise à 0 joueur actuel
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      // changement de l'activeplayer et mise à 0 de son score
      switchPlayer();
    }
  }
});

// BOUTON HOLD POUR GARDER LE SCORE
btnHold.addEventListener('click', function () {
  if (playing) {
    // Envoi currentScore joueur dans array score index[0] ou index[1]
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Vérification si score est >= 50
    if (scores[activePlayer] >= 50) {
      // Induit le contraire de TRUE avec lancement dé, ... et donc bloque le jeu !
      playing = false;
      // Disparition du dé
      diceEl.classList.add('hidden');
      // Apparition du CSS background noir du joueur gagnant
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // Disparition du CSS dddde l'activePlayer (remplacé par CSS player--active)
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Changement du joueur
      switchPlayer();
    }
    // fin du jeu
  }
});

// BOUTON DE LANCEMENT D'UNE NOUVELLE PARTIE
btnNew.addEventListener('click', init);
// Ici notre fonction init est utilisé comme une simple variable pour déclencher son action avec le btn
// First Class Function ! c'est une des caractéristique du Javascript
