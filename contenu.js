/* =====================================================================
   CONTENU DU SITE NAJAFI — c'est le SEUL fichier à modifier au quotidien.

   • Ajouter une nouvelle (photo / vidéo) dans un centre :
       copiez un bloc { date: ..., titre: ..., ... } dans "actualites"
       du centre concerné. Les plus récentes s'affichent en premier.
   • Types de médias :
       { type: "photo",   src: "images/morondava/2026-10-distribution.jpg" }   ← nom du fichier tel quel, espaces et accents acceptés
     • Date : "2026-10-04" (jour précis), "2026-10" (mois) ou "2026" (année seule)
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
    { label: "Réunion", numero: "+262 692 64 84 85" },
    { label: "Madagascar", numero: "+261 321 23 80 72" },
  ],
  whatsapp: "262692648485", // numéro utilisé par le formulaire de contact (sans + ni espaces)
  email: "contact@najafi-noi.org", // adresse affichée dans « Dons & contact »
  rib: {
    titulaire: "Association Najafi Océan Indien",
    iban: "FR76 1131 5000 0108 0352 0566 949",
    bic: "CEPAFRPP131",
  },
  // Liens de don en ligne (HelloAsso, PayPal…). Laissez vide "" pour masquer.
  helloasso: "",
  paypal: "",
};

/* « Pourquoi nous agissons » : articles de presse sur la situation à Madagascar.
   Ne jamais copier le texte d'un article : un résumé de 1 ou 2 phrases avec nos mots, et le lien. */
const ARTICLES = [
  {
    titre: "Madagascar : 3,7 millions de personnes menacées par la faim",
    source: "Linfo.re",
    date: "2026-10-08",
    resume:
      "Dans le Grand Sud, la sécheresse liée à El Niño et la hausse des prix alimentaires aggravent la malnutrition, surtout chez les jeunes enfants, alors que les aides internationales manquent de financement.",
    lien: "https://www.linfo.re/ocean-indien/madagascar/madagascar-3-7-millions-de-personnes-menacees-par-la-faim",
  },
];

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
    couverture: "images/tulear/invité de la reunion, docteur hamza cardiologue, bénévole..jpeg",
    actualites: [
      {
        date: "2026", // date précise à compléter (AAAA-MM-JJ)
        titre: "Distribution avec un invité de La Réunion",
        texte: "Le docteur Hamza, cardiologue venu de La Réunion, a participé bénévolement à la distribution aux côtés de notre équipe.",
        medias: [{ type: "photo", src: "images/tulear/invité de la reunion, docteur hamza cardiologue, bénévole..jpeg" }],
      },
      {
        date: "2026", // date précise à compléter (AAAA-MM-JJ)
        titre: "L'équipe Najafi 2026",
        texte: "Les bénévoles de Tuléar qui assurent chaque semaine les distributions.",
        medias: [{ type: "photo", src: "images/tulear/equipe najafi 2026.jpeg" }],
      },
    ],
  },
];
