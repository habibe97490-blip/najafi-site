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
  youtube: "https://www.youtube.com/@NajafiOi", // chaîne « Najafi Ocean Indien »
  rib: {
    titulaire: "NAJAFI OCEAN INDIEN", // exactement comme sur le RIB de la banque
    iban: "FR76 1131 5000 0108 0352 0566 949",
    bic: "CEPAFRPP131",
  },
  // Liens de don en ligne (HelloAsso, PayPal…). Laissez vide "" pour masquer.
  helloasso: "",
  paypal: "",
};

/* Le colis solidaire, présenté sur la page d'accueil.
   Le bouton mène à HelloAsso si le lien est rempli plus haut, sinon au RIB. */
const COLIS = {
  surtitre: "Le colis solidaire Najafi",
  accroche: "Un mois de dignité, emballé avec soin.",
  description:
    "Chaque semaine, nos bénévoles remettent à près de 1 000 personnes de Tuléar, Morondava et Morombe un colis composé surtout de nourriture, complété selon les besoins par des vêtements et des aides diverses.",
  contenu: [
    { icone: "🍚", titre: "Nourriture", detail: "L'essentiel du colis, chaque semaine" },
    { icone: "👕", titre: "Vêtements", detail: "Selon les saisons et les besoins" },
    { icone: "🤝", titre: "Aides diverses", detail: "Pour les situations les plus urgentes" },
  ],
  coutMensuel: "500 €",
  coutDetail: "la cotisation du colis solidaire",
  paliers: [
    { montant: "Dès 5 €", effet: "Chaque euro compte" },
    { montant: "Dès 20 €", effet: "Reçu fiscal délivré" },
    { montant: "500 €", effet: "Environ 140 personnes aidées pendant un mois" },
    { montant: "Libre", effet: "Donnez autant que vous le souhaitez" },
  ],
  note: "Les distributions coûtent 3 500 € par mois pour près de 1 000 personnes. Vous pouvez donner à partir de 5 €, et autant que vous le souhaitez. Un reçu fiscal est délivré dès 20 € de dons sur l'année.",
  bouton: "Offrir un colis",
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
        date: "2026-10-10",
        titre: "Distribution avec le docteur Hamza",
        texte: "Le docteur Hamza, cardiologue venu de La Réunion, a participé bénévolement à la distribution et consulté gratuitement les bénéficiaires.",
        medias: [
          { type: "youtube", id: "UgbSRvo1hwQ", vertical: true },
          { type: "youtube", id: "dzpjyBBgkKg", vertical: true },
          { type: "youtube", id: "TV2PO6-J3QA", vertical: true },
          { type: "youtube", id: "Bva3krwhQ6g", vertical: true },
        ],
      },
      {
        date: "2026-10-03",
        titre: "Distribution du 3 octobre",
        texte: "Une matinée de distribution à Tuléar, en vidéo.",
        medias: [
          { type: "youtube", id: "11jlS0KixNs", vertical: true },
          { type: "youtube", id: "PityY2-ULIs", vertical: true },
          { type: "youtube", id: "Se2JUeK7M28", vertical: true },
          { type: "youtube", id: "MD1_54Grtso", vertical: true },
          { type: "youtube", id: "dz7k1m55bFU", vertical: true },
        ],
      },
      {
        date: "2026-09-05",
        titre: "Don de béquilles",
        texte: "En plus des colis alimentaires, l'association apporte des aides selon les besoins : ici, un don de béquilles.",
        medias: [{ type: "youtube", id: "4B_gS8oBOFI", vertical: true }],
      },
      {
        date: "2026", // date précise à compléter (AAAA-MM-JJ)
        titre: "Consultations médicales avec un invité de La Réunion",
        texte: "Le docteur Hamza, cardiologue venu de La Réunion, participe bénévolement aux distributions et consulte gratuitement les bénéficiaires.",
        medias: [{ type: "photo", src: "images/tulear/invité de la reunion, docteur hamza cardiologue, bénévole..jpeg" }],
      },
      {
        date: "2026-08-24",
        titre: "Une bénéficiaire du centre",
        texte: "Une bénéficiaire de Tuléar, vêtue du t-shirt de l'association.",
        medias: [{ type: "photo", src: "images/tulear/24 AOUT 2026 TULEAR.jpeg" }],
      },
      {
        date: "2026-08-08",
        titre: "Distribution de la semaine",
        texte: "Nos bénévoles remettent un colis à chaque bénéficiaire.",
        medias: [{ type: "photo", src: "images/tulear/8 aout 2026.jpeg" }],
      },
      {
        date: "2026-07-11",
        titre: "Les colis sont prêts",
        texte: "Pain, sacs de denrées et biscuits attendent d'être distribués aux bénéficiaires.",
        medias: [
          { type: "photo", src: "images/tulear/11 juillet 2026.jpeg" },
          { type: "photo", src: "images/tulear/11 juillet 2026 2.jpeg" },
        ],
      },
    ],
  },
];
