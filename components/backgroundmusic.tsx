"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.8 ; // volume ajustable
      audioRef.current.loop = true;
      audioRef.current.play().catch((err) => {
        console.log("Auto-play blocked, user interaction needed.", err);
      });
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/ambiance.mp3" />
      <button
        onClick={toggleMusic}
        className="fixed bottom-10 right-10 bg-green-500 text-white p-2 rounded hover:bg-red-500"   // Dans Tailwind CSS, les classes de couleur suivent généralement le format bg-{color}-{shade} --> bg-red-600
      >
        {isPlaying ? "Mettre en pause la musique" : "Jouer la musique"}
      </button>
    </>
  );
}

// Pour le on-hover, hover:bg-red-500  --> fixed bottom-10 right-10 bg-green-500 text-white p-2 rounded hover:bg-red-500