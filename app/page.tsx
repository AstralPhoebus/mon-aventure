<!-- Hotjar Tracking Code for Site 6456699 (nom manquant) -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:6456699,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>


"use client";
import React, { useState } from 'react';
import AdventureGame from '@/components/AdventureGame'; // Adjust import path

const HomePage: React.FC = () => {
  const [startAdventure, setStartAdventure] = useState(false);

  const handleStartAdventure = () => {
    setStartAdventure(true);
  };


// New handler functions for the additional buttons
 const handleOptionTwo = () => {
    console.log("Option Deux sélectionnée !")
    setStartAdventure(true);
    };

  const handleOptionThree = () => {
    console.log("Option Trois sélectionnée !");
    setStartAdventure(true);
  };

  const handleOptionFour = () => {
    console.log("Option Quatre sélectionnée !");
    setStartAdventure(true);
  };



  if (startAdventure) {
    return <AdventureGame />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-500 to-black-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Osez être le héros de votre propre histoire.</h1>
    <div className="flex flex-col space-y-4">
      <button
        onClick={handleStartAdventure}
        className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
      >
        Explorer les Montagnes Hallucinées
      </button>

        {/* --- New Buttons Start Here --- */}
        <button
          onClick={handleOptionTwo}
          className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
        >
          Découvrir les Abysses du Temps
        </button>

        <button
          onClick={handleOptionThree}
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
        >
          Capturer le chat maléfique
        </button>

        <button
          onClick={handleOptionFour}
          className="bg-yellow-600 hover:bg-yellow-800 text-black font-bold py-2 px-4 rounded"
        >
          Rencontrer les dieux des profondeurs
        </button>
        {/* --- New Buttons End Here --- */}
    </div>
    </div>
  );
};

export default HomePage;



// < div appelle à un autre </div> à la fin -> div = division (logical division or section of web page)
// div signale juste en HTML qu'il y a un composant (autre que quelque chose de formellement identifiée comme le <p>)
