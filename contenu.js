/* =====================================================================
   CONTENU DU SITE NAJAFI — c'est le SEUL fichier à modifier au quotidien.

   • Ajouter une nouvelle (photo / vidéo) dans un centre :
       copiez un bloc { date: ..., titre: ..., ... } dans "actualites"
       du centre concerné. Les plus récentes s'affichent en premier.
   • Types de médias :
       { type: "photo",   src: "images/morondava/2026-10-distribution.jpg" }
       { type: "video",   src: "videos/morondava/distribution.mp4" }
       { type: "youtube", id: "dQw4w9WgXcQ" }   ← l'identifiant après "v=" dans le lien YouTube
   • Ajouter un nouveau centre : copiez un bloc complet de "centres".
     Un nouvel onglet apparaîtra automatiquement.
   ===================================================================== */

const ASSOCIATION = {
  nom: "Najafi Océan Indien",
  slogan: "Ensemble, offrons un avenir",
  siege: "La Réunion",
  terrain: "Madagascar",
  telephones: [
    { label: "Réunion", numero: "+262 692 67 69 94" },
    { label: "Madagascar", numero: "+261 321 23 80 72" },
  ],
  whatsapp: "262692676994", // numéro utilisé par le formulaire de contact (sans + ni espaces)
  email: "",                // à compléter si l'association a une adresse e-mail
  rib: {
    titulaire: "Association Najafi Océan Indien",
    iban: "FR76 1131 5000 0108 0352 0566 949",
    bic: "CEPAFRPP131",
  },
  // Liens de don en ligne (HelloAsso, PayPal…). Laissez vide "" pour masquer.
  helloasso: "",
  paypal: "",
};

const CENTRES = [
  {
    id: "morondava",
    nom: "Morondava",
    icone: "⛵",
    depuis: 2015,
    beneficiaires: 400,
    resume:
      "Notre deuxième centre, sur la côte ouest. Chaque semaine, des colis alimentaires sont distribués aux familles les plus démunies.",
    couverture: "images/distribution.jpg",
    actualites: [
      {
        date: "2026-10-01",
        titre: "Distribution hebdomadaire",
        texte: "Riz et denrées de base distribués par nos bénévoles à plus de 400 bénéficiaires.",
        medias: [{ type: "photo", src: "images/distribution.jpg" }],
      },
    ],
  },
  {
    id: "morombe",
    nom: "Morombe",
    icone: "🌴",
    depuis: 2026,
    beneficiaires: 150,
    resume:
      "Notre centre le plus récent, ouvert en 2026. 150 personnes y reçoivent déjà une aide alimentaire chaque semaine.",
    couverture: "images/rassemblement.jpg",
    actualites: [
      {
        date: "2026-01-15",
        titre: "Ouverture du centre",
        texte: "Lancement des premières distributions à Morombe.",
        medias: [{ type: "photo", src: "images/rassemblement.jpg" }],
      },
    ],
  },
  {
    id: "tulear",
    nom: "Tuléar",
    icone: "🏫",
    depuis: 2014,
    beneficiaires: 400,
    resume:
      "Le premier centre de l'association, à Toliara, dans le sud-ouest de l'île. Plus de dix ans d'aide alimentaire chaque semaine.",
    couverture: "images/rassemblement.jpg",
    actualites: [
      {
        date: "2026-09-20",
        titre: "Rassemblement des bénéficiaires",
        texte: "Les familles se réunissent avant la distribution de la semaine.",
        medias: [{ type: "photo", src: "images/rassemblement.jpg" }],
      },
    ],
  },
];
