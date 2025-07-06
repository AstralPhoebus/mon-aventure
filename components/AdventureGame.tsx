"use client";
import React, { useState, useEffect } from "react"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Import du composant bouton
import Image from "next/image"; // Import du composant image
import BackgroundMusic from "@/components/backgroundmusic"; // Import du composant BackgroundMusic
import scenes from 'app/scenes'; // Importer les scènes depuis scenes.ts  --> à la fin du ts : "export default scenes" 
// pour être sûr que les scènes s'exportent


// Toutes les fonctions que je veux voir apparaître sur mon front
export default function AdventureGame() {
  const [currentScene, setCurrentScene] = useState(scenes[0]);
  const [flash, setFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const [health, setHealth] = useState(100);
  const [displayedText, setDisplayedText] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Machine à écrire
  useEffect(() => {
    setDisplayedText('');
    setShowChoices(false);
    setShowButtons(false);
    setImageLoaded(false);
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
      setTimeout(() => setShowButtons(true), 1000);
    }
  };

  typeWriter();

  return () => {
    cancelled = true; // stop on unmount or scene change
  };
}, [currentScene]);

  // Gestion du choix avec transition immersive
  const handleChoice = (nextId) => {
    setIsTransitioning(true);
    const selectedChoice = currentScene.choices?.find(c=> c.next === nextId);
    setTimeout(() => {
      const nextScene = scenes.find(s => s.id === nextId);
      setCurrentScene(nextScene);
      setIsTransitioning(false);

      // Gestion santé
      const selectedChoice = currentScene.choices?.find(c => c.next === nextId);
      if (selectedChoice?.healthChange) {
        const newHealth = Math.max(0, Math.min(100, health + selectedChoice.healthChange));
        setHealth(newHealth);
        
        if (newHealth <= 0) {
    // Redirige l'utilisateur vers la scène de "mort" ou "game over"
        setTimeout(() => {
        setCurrentSceneId('14'); // <--- Scène Game Over (plongée dans la folie)
        setTransitioning(false); // S'assurer que l'état de transition est désactivé
        setShake(false); // Réinitialiser l'effet de tremblement
        setFlash(false); // Réinitialiser l'effet de flash
        }, 500); // Vous pouvez ajuster ce délai si nécessaire
        return; // Arrête l'exécution du reste de la fonction car la scène a changé
      }

        if (selectedChoice.healthChange < 0) {
          setShake(true);
          setTimeout(() => setShake(false), 500);
        } else if (selectedChoice.healthChange > 0) {
          setFlash(true);
          setTimeout(() => setFlash(false), 300);
        }
      }
    }, 500); // Durée de la transition (500ms)
  };

  return (
    <div
      className={`flex flex-col items-center p-4 gap-4 max-w-md mx-auto
        ${flash ? 'bg-green-200' : ''}
        ${shake ? 'animate-shake' : ''}
        ${isTransitioning ? 'opacity-0' : 'opacity-100'}
        transition-opacity duration-500 ease-in-out
        pb-16`}
    >
      <Card>
        <Image
          src={currentScene.image}
          alt="Scene"
          width={400}
          height={250}
          unoptimized
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
              onClick={() => handleChoice(choice.next)}
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded opacity-0 animate-fade-in"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-gray-200">
        <div
          className="relative h-8"
          ><div
      className="bg-green-500 h-full transition-all" // h-full assure qu'il prend toute la hauteur du parent
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
      `}</style>
      <BackgroundMusic /> {/* Ajout du composant BackgroundMusic */}
    </div>
  );
}
