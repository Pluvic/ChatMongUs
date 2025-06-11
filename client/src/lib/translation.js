import { deadPlayers } from "../stores/game";

// translations.js
export const translations = {
    en: {
        currentTheme: "Current theme is",
        turn: name => `It's ${name}'s turn`,
        secondsLeft: seconds => `(${seconds}s left)`,
        vote: "Time to vote!",
        results: "Results",
        end: "Game Over",
        winner: name => `The winner is: ${name}`,
        deadPlayers: "Dead players :",
        noDeadPlayers: "No dead players",
    },
    fr: {
        currentTheme: "Le thème actuel est",
        turn: name => `C'est le tour de ${name}`,
        secondsLeft: seconds => `(${seconds}s restantes)`,
        vote: "Il est temps de voter !",
        results: "Résultats",
        end: "Fin du jeu",
        winner: name => `Le gagnant est : ${name}`,
        deadPlayers: "Joueurs morts :",
        noDeadPlayers: "Aucun joueur mort",
    }
};
