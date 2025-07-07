"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import du composant bouton
import Image from "next/image"; // Import du composant image
import BackgroundMusic from "@/components/backgroundmusic"; // Import du composant BackgroundMusic
import scenes from 'app/scenes'; // Importer les scènes depuis scenes.ts

// --- DÉFINITION DES INTERFACES TYPESCRIPT (TRÈS IMPORTANT POUR LA SÉCURITÉ DES TYPES) ---
// Ces interfaces décrivent la structure attendue de vos objets 'Choice' et 'Scene'.
// Elles doivent correspondre à la structure de vos données dans 'app/scenes.ts'.
// J'assume ici que les IDs de scènes et les 'next' des choix sont des NOMBRES.
// Si ce sont des chaînes de caractères, changez 'number' en 'string'.
interface Choice {
  text: string;
  next: number; // L'ID de la scène suivante (assumé être un nombre)
  healthChange?: number; // Changement de santé (optionnel)
}

interface Scene {
  id: number; // L'ID unique de la scène (assumé être un nombre)
  text: string;
  image: string;
  choices?: Choice[]; // Les choix sont optionnels (pour les scènes de fin par exemple)
}
// --- FIN DES INTERFACES ---


// Toutes les fonctions que je veux voir apparaître sur mon front
export default function AdventureGame() {
  // --- MISE À JOUR DES TYPES POUR LES ÉTATS ---
  // currentScene doit être de type Scene, et non undefined. scenes[0] doit donc exister.
  const [currentScene, setCurrentScene] = useState<Scene>(scenes[0] as Scene); // Cast pour assurer le type
  const [flash, setFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const [health, setHealth] = useState(100);
  const [displayedText, setDisplayedText] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // État pour la transition visuelle

  // Machine à écrire
  useEffect(() => {
    setDisplayedText('');
    setShowChoices(false);
    setShowButtons(false);
    setImageLoaded(false); // Réinitialiser l'état de chargement de l'image
    let index = 0;
    let cancelled = false;

    const typeWriter = () => {
      if (cancelled) return;

      if (index < currentScene.text.length) {
        setDisplayedText(prev => prev + currentScene.text.charAt(index));
        index++;
        setTimeout(typeWriter, 45);
      } else {
        setShowChoices(true);
        setTimeout(() => setShowButtons(true), 100);
      }
    };

    typeWriter();

    return () => {
      cancelled = true; // Arrête la machine à écrire si le composant est démonté ou la scène change
    };
  }, [currentScene]); // Déclenche l'effet à chaque changement de scène

  // Gestion du choix avec transition immersive
  // nextId est le numéro de la scène suivante, donc son type est 'number'
  const handleChoice = (nextId: number) => {
    setIsTransitioning(true); // Active l'état de transition (pour l'opacité)

    // Trouver le choix sélectionné dans la scène ACTUELLE
    // La syntaxe 'c.next === nextId' est correcte ici, pas besoin de redéclarer le type
    const selectedChoice = currentScene.choices?.find(c => c.next === nextId);

    // Utilisation d'un setTimeout pour la durée de la transition visuelle
    setTimeout(() => {
      // --- LOGIQUE DE GESTION DE LA SANTÉ ET GAME OVER ---
      // Cette logique doit être exécutée AVANT de changer la scène,
      // car elle peut déterminer la scène finale (Game Over).

      let finalHealth = health; // Variable temporaire pour la santé après le choix
      if (selectedChoice?.healthChange !== undefined) { // Vérifier si healthChange est défini
        finalHealth = Math.max(0, Math.min(100, health + selectedChoice.healthChange));
        setHealth(finalHealth); // Mettre à jour l'état de la santé

        // Appliquer les effets visuels de santé (secousse/flash)
        if (selectedChoice.healthChange < 0) {
          setShake(true);
          setTimeout(() => setShake(false), 500);
        } else if (selectedChoice.healthChange > 0) {
          setFlash(true);
          setTimeout(() => setFlash(false), 300);
        }
      }

      // --- VÉRIFICATION DU GAME OVER APRÈS MISE À JOUR DE LA SANTÉ ---
      if (finalHealth <= 0) {
        // L'utilisateur est mort, rediriger vers la scène de Game Over (ID 14)
        const gameOverScene = scenes.find(s => s.id === 14); // Trouver l'objet scène Game Over (ID 14)

        if (gameOverScene) {
          setCurrentScene(gameOverScene); // Mettre à jour la scène vers l'objet Game Over
          setHealth(0); // S'assurer que la santé affichée est bien 0
        } else {
          console.error("Scène de Game Over (ID 14) introuvable ! Vérifiez votre fichier scenes.ts.");
          // Fallback : rester sur la scène actuelle ou rediriger vers une scène par défaut
        }

        // Réinitialiser les états de transition et d'effets visuels
        setIsTransitioning(false);
        setShake(false);
        setFlash(false);
        return; // Arrêter l'exécution de la fonction ici car le jeu est terminé
      }

      // --- LOGIQUE DE CHANGEMENT DE SCÈNE NORMALE (SI PAS GAME OVER) ---
      // Trouver la prochaine scène basée sur nextId
      const nextScene = scenes.find(s => s.id === nextId);

      if (nextScene) {
        setCurrentScene(nextScene); // Mettre à jour la scène vers l'objet trouvé
      } else {
        console.error(`Scène avec l'ID ${nextId} introuvable ! Vérifiez votre fichier scenes.ts.`);
        // Gérer le cas où la scène n'est pas trouvée (ex: rester sur la scène actuelle, afficher un message d'erreur)
      }

      setIsTransitioning(false); // Désactiver l'état de transition après le changement de scène
    }, 500); // Durée de la transition (500ms)
  };

  return (
    <div
      className={`flex flex-col items-center p-4 gap-4 max-w-md mx-auto
        ${flash ? 'bg-green-200' : ''}
        ${shake ? 'animate-shake' : ''}
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
        transition-opacity duration-500 ease-in-out
        pb-16`} // Ajout de padding-bottom pour la barre de vie
    >
      <Card>
        <Image
          src={currentScene.image}
          alt="Scene"
          width={400}
          height={250}
          unoptimized // Utiliser unoptimized si l'image est un GIF ou si Next.js a des problèmes avec l'optimisation
          onLoad={() => setImageLoaded(true)}
          className={`rounded-xl object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </Card>

      <Card>
        <CardContent>
          <p className="text-lg text-center whitespace-pre-wrap">{displayedText}</p>
        </CardContent>
      </Card>

      {showChoices && showButtons && currentScene.choices && (
        <div className="grid grid-cols-1 gap-2 w-full">
          {currentScene.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(choice.next)} // choice.next doit correspondre au type de nextId (number)
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded opacity-0 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }} // Animation de fade-in décalée
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}

      {/* Barre de vie */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-200">
        <div className="relative h-8"> {/* Conteneur pour la barre et le texte */}
          <div
            className="bg-green-500 h-full transition-all"
            style={{ width: `${health}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center text-black font-bold">
            Santé mentale : {health}%
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-shake {
          animation: shake 0.5s;
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        /* Assurez-vous que .animate-fade-in est défini quelque part dans votre CSS global ou ici */
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <BackgroundMusic /> {/* Ajout du composant BackgroundMusic */}
    </div>
  );
}
