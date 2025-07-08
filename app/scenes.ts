// Scènes du jeu
const scenes = [
  {
    id: 1,
    text: "  Le vent hurle contre les parois de la tente. Vous tenez votre carnet, où vous tracez les symboles étranges gravés sur les blocs de glace trouvés près de la crevasse ce matin. Le commanditaire, Voss, vous a promis que ces découvertes financeraient votre thèse sur les civilisations pré-mésopotamiennes. Vous ne l’aimez pas. Son sourire est trop large, ses yeux trop sombres, et cette odeur persistante de cadavre et de cannelle vous colle aux narines après chacun de ses passages. Un hurlement retentit dans le blizzard, inhumain, humide.",
    image: "/images/2.jpeg",
    choices: [
      { text: "Sortir vérifier le bruit.", next: 2, healthChange: -10 },
      { text: "Rester dans la tente, tétanisé. ", next: 3, healthChange: -10 },
      { text: "Prendre votre carnet pour noter ces sons étranges.", next: 4, healthChange: -30}
    ]
  },
  {
    id: 2,
    text: " Sous le projecteur du camp, la neige est tachée de noir et de rouge. Un hurlement se transforme en gargouillis. Vous avancez, votre souffle givre dans l’air glacé, et vous trouvez le corps d’un technicien, déchiqueté, les viscères gelées. Vous vous penchez, notant malgré vous les symboles gravés sur un os brisé. Derrière vous, le vent porte le parfum sucré de cannelle.",
    image: "/images/Antique.PNG",
    choices: [
      { text: "Suivre les traces dans la crevasse.", next: 5, healthChange: -30 },
      { text: "Retourner prévenir les autres. ", next:6, healthChange: -20}
    ]
  },
  {
    id: 3,
    text: " La tempête cogne sur la toile. Soudain, une lumière bleue filtre à travers la neige, froide, électrique. Vous entendez une voix grave, qui ne ressemble à aucune voix humaine. Elle murmure des syllabes dans une langue qui ne devrait pas exister, mais que vous comprennez presque, comme un souvenir ancien. Derrière vous, Voss se tient dans l’ombre, ses yeux brillants, l’odeur de cannelle plus forte que jamais.",
    image: "/images/Tente.PNG",
    choices: [
      { text: "Touchez la lumière.", next: 7, healthChange: -20},
      { text: "Fermez les yeux et attendre.", next:5, healthChange: -20},
      { text : "Sortir voir d'où vient la lumière.", next:5, healthChange: -10}
    ]
  },
  {
    id: 4,
    text: " Vous notez les sons, obsédé par leur structure. Un schéma se forme sur les pages gelées de votre carnet : une carte des tunnels sous la montagne que l'exploration a mise au jour. Voss entre dans la tente. Il vous regarde, un sourire de soulagement sur les lèvres, ses mains tremblantes. « Tu comprends enfin, n’est-ce pas ? » murmure-t-il, en laissant tomber un vieux talisman sur votre table.",
    image: "/images/Folie.PNG",
    choices: [
      {text: "Décidez de descendre dans les tunnels pour comprendre.", next : 5, healthChange: -20},
      {text: "Préparer votre équipement pour fuir le lendemain.", next:8}
    ]
  },
  {
    id: 5,
    text: " Un tunnel sombre, la lumière de votre lampe révéle des symboles anciens sur la glace. Vos doigts glissent sur des gravures représentant des silhouettes non humaines agenouillées devant un œil noir. Dans le silence, vous entendez un battement régulier, comme un cœur colossal prisonnier sous vos pieds.",
    image: "/images/Tunnel.jpg",
    choices: [
      {text: "Suivre le battement.", next : 9, healthChange: -40},
      {text: "Faire demi-tour.", next:6, healthChange: -20}
    ]
  },
  {
    id: 6,
    text: " Vous revenez au camp. Silence. Les tentes sont éventrées, le sang gelé scintille au clair de lune. Un carnet traîne dans la neige, ouvert sur une page couverte de symboles. Vous reconnaissez vaguement l'écriture de Voss. Vous lisez : « Sous la glace, elle attend. Libération par le sang. Par le chant. Par le sacrifice. » Voss apparaît derrière vous, ses mains couvertes de sang. « Nous sommes si proches… »",
    image: "/images/Camp.jpg",
    choices: [
      {text: "Calmer Voss. Suivre les instructions du carnet pour sauver les autres.", next : 9, healthChange: -40},
      {text: "Prendre les rations et partir seul vers l’extérieur. Vous laissez Voss. ", next:8}
    ]
  },
  {
    id: 7,
    text: " La lumière bleue envahit votre vision. Vous voyez une cité antique sous la glace, des tours noires et des statues cyclopéennes. Des créatures aux tentacules gelés rampent dans les ruines. Une voix vous murmure : « Elle n’est pas seule. Tu n’es pas seul non plus. ».",
    image: "/images/Antique.jpg",
    choices: [
      {text: "Utiliser la vision pour trouver la chambre sous la glace.", next : 9, healthChange: -40},
      {text: "Résister, se réveiller, fuir.", next:8, healthChange: -30}
    ]
  },
  {
    id: 8,
    text: " Vous marchez seul dans la tempête, la lumière d’aurore boréale dansant sur la glace. Le vent hurle, et dans ce hurlement vous entendez votre nom. Derrière vous, des pas lourds s’enfoncent dans la neige. ",
    image: "/images/MortD.PNG",
    choices: [
      {text: "Courir, fuir", next : 13},
      {text: "Se retourner pour faire face.", next:13},
      {text: "Se laisser tomber dans la neige. ", next:13}
    ]
  },
  {
    id: 9,
    text: " Vous entrez dans une salle colossale taillée dans la glace. Sous vos pieds, un œil noir s’ouvre, prisonnier dans une gangue translucide. Des cris résonnent dans les tunnels, les voix de vos compagnons perdus. Voss se tient à genoux devant la créature, levant les bras : « Elle va nous sauver. Nous délivrer de la mort ! »",
    image: "/images/Fin.jpg",
    choices: [
      {text: "Tenter le rituel pour sauver leurs âmes.", next : 10, healthChange: -20},
      {text: "Fuir en laissant tout derrière vous.", next:11, healthChange: -20},
      {text: "Parler à la créature pour comprendre. ", next:12, healthChange: -40}
    ]
  },
  {
    id: 10,
    text: " Vous tracez les symboles dans la glace, votre sang s’y mêle, le vent porte les murmures de ceux que vous avez perdus. Sous vos pieds, la glace vibre comme un tambour. L’œil noir s’ouvre, vous fixant. Vous comprennez : le rituel est un appel. Voss hurle de joie derrière vous. La glace se fissure. Un éclat de glace se sépare du toit de la grotte et emporte son rire dans la tombe.",
    image: "/images/Rituel.PNG",
    choices: [
      {text: "Se laisser avaler par l'ombre.", next : 12, healthChange: -30}
    ]
  },
  {
    id: 11,
    text: " Vous fuyez dans le tunnel, la lumière de votre lampe vacille. Des cris résonnent, puis un grondement sourd. La terre tremble, des pans de glace tombent derrière vous. Vous atteignez la surface, le vent vous gifle, et vous marchez jusqu’à ce que vos jambes cèdent. À l’horizon, une lumière perce le blizzard.",
    image: "/images/Fuite.PNG",
    choices: [
      {text: "Récupérer ses affaires et fuir", next : 8},
      {text: "Fermer les yeux. ", next : 13, healthChange: -10}
    ]
  },
  {
    id: 12,
    image: "/images/Fin.jpg",
    text: " Vous posez ta main sur la glace. L’œil noir vous fixe, et soudain vous entendez sa voix dans votre tête. Une vague de savoir interdit vous envahit. Vous voyez le monde entier, le passé, le futur, la cité sous la glace. Votre esprit se fissure. Et dans un dernier instant de lucidité, vous souriez."
  },
  {
    id: 13,
    image: "/images/MortD.PNG",
    text: " Vous vous arrêtez dans la neige, le vent hurle, le froid brûle vos poumons. Derrière vous, des pas approchent. Vous vous retournez, et à travers le blizzard, vous voyez une forme immense, blanche, plus ancienne que la montagne elle-même. Puis le vent emporte tout."
  },
  {
    id: 14,
    image: "/images/Smile.PNG",
    text: " Vous entendez le battement du cœur sous la glace, encore et encore, même quand vous vous bouchez les oreilles. Vous ne ressentez plus le froid, ni la faim. Dans l’obscurité de vos paupières fermées, un œil s’ouvre, immense, infini. Vous réalisez qu’il est le vôtre. Vous riez, seul, dans le blizzard, alors que vos pas s’arrêtent. Car maintenant, vous voyez."
  }
];

export default scenes;
