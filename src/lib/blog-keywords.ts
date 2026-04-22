// SEO keyword clusters for daily blog autopilot
// Each cluster has a pillar topic + long-tail variations
// The cron job picks the next unused topic and generates an article

export interface KeywordCluster {
  slug: string;
  pillar: string;
  keywords: string[];
  category: "savoir-faire" | "art-de-vivre" | "accords" | "recettes" | "paris";
  used?: boolean;
}

export const KEYWORD_CLUSTERS: KeywordCluster[] = [
  // Cluster 1: Savoir-Faire & Levain (Authority)
  {
    slug: "fermentation-longue-pain-artisanal",
    pillar: "La fermentation longue : pourquoi 72h changent tout",
    keywords: ["fermentation longue pain", "levain naturel boulangerie", "pain artisanal fermentation", "bienfaits fermentation pain"],
    category: "savoir-faire",
  },
  {
    slug: "farines-anciennes-ble-heritage",
    pillar: "Farines anciennes et blés héritage : le retour au vrai goût",
    keywords: ["farines anciennes boulangerie", "blé héritage pain", "farine meule de pierre", "pain tradition française"],
    category: "savoir-faire",
  },
  {
    slug: "secret-croissant-parfait-feuilletage",
    pillar: "Le secret d'un croissant parfait : l'art du feuilletage",
    keywords: ["croissant artisanal Paris", "feuilletage beurre AOP", "viennoiserie fait maison", "meilleur croissant Paris"],
    category: "savoir-faire",
  },
  {
    slug: "pain-au-levain-digestion-sante",
    pillar: "Pain au levain et digestion : ce que dit la science en 2026",
    keywords: ["pain levain digestion", "bienfaits levain naturel", "pain artisanal santé", "levain probiotiques"],
    category: "savoir-faire",
  },
  // Cluster 2: Art de Vivre Louvre-Rivoli (Local SEO)
  {
    slug: "pique-nique-palais-royal-paris",
    pillar: "Le pique-nique parfait au Palais-Royal : que mettre dans son panier ?",
    keywords: ["pique-nique Palais-Royal", "déjeuner Louvre Rivoli", "panier gourmet Paris 1er", "manger près du Louvre"],
    category: "paris",
  },
  {
    slug: "meilleurs-artisans-premier-arrondissement",
    pillar: "Guide des meilleurs artisans du 1er arrondissement de Paris",
    keywords: ["artisans Paris 1er", "boulangerie Louvre", "commerces Rue de Rivoli", "artisanat Paris centre"],
    category: "paris",
  },
  {
    slug: "brunch-parisien-weekend-louvre",
    pillar: "Brunch parisien : nos idées pour un dimanche au Louvre",
    keywords: ["brunch Paris Louvre", "petit-déjeuner parisien", "brunch weekend Paris 1er", "viennoiseries brunch"],
    category: "art-de-vivre",
  },
  {
    slug: "petit-dejeuner-francais-tradition",
    pillar: "Le petit-déjeuner français : une tradition qui se réinvente",
    keywords: ["petit-déjeuner français", "tradition baguette matin", "tartine confiture beurre", "breakfast Paris"],
    category: "art-de-vivre",
  },
  // Cluster 3: Accords Gastronomiques (Upsell/Inspiration)
  {
    slug: "quel-pain-plateau-fromages",
    pillar: "Quel pain choisir pour un plateau de fromages affinés ?",
    keywords: ["pain fromage accord", "plateau fromage boulangerie", "pain noix fromage", "accords pain fromage"],
    category: "accords",
  },
  {
    slug: "meilleures-confitures-brioche-artisanale",
    pillar: "Les meilleures confitures pour sublimer une brioche artisanale",
    keywords: ["confiture brioche", "confiture artisanale Paris", "petit-déjeuner brioche", "meilleure confiture pain"],
    category: "accords",
  },
  {
    slug: "pain-vin-accords-naturels",
    pillar: "Pain et vin : les accords naturels que vous ne soupçonnez pas",
    keywords: ["accord pain vin", "dégustation pain vin", "vin naturel boulangerie", "pain sourdough vin bio"],
    category: "accords",
  },
  // Cluster 4: Recettes & Astuces
  {
    slug: "conserver-pain-frais-astuces",
    pillar: "Comment conserver son pain frais : 5 astuces de boulanger",
    keywords: ["conserver pain frais", "pain rassis que faire", "astuce pain boulanger", "congeler pain artisanal"],
    category: "recettes",
  },
  {
    slug: "recette-pain-perdu-brioche",
    pillar: "Pain perdu à la brioche : la recette signature de notre chef",
    keywords: ["recette pain perdu", "pain perdu brioche", "recette boulangerie maison", "dessert pain artisanal"],
    category: "recettes",
  },
  {
    slug: "tartines-gourmandes-idees-rapides",
    pillar: "10 tartines gourmandes pour un déjeuner en 5 minutes",
    keywords: ["tartine gourmet recette", "idée tartine rapide", "pain garni déjeuner", "lunch rapide pain artisanal"],
    category: "recettes",
  },
  // Cluster 5: More Local SEO
  {
    slug: "livraison-pain-paris-centre",
    pillar: "Livraison de pain artisanal dans Paris centre : le guide complet",
    keywords: ["livraison pain Paris", "click collect boulangerie", "commander pain en ligne Paris", "boulangerie livraison 75001"],
    category: "paris",
  },
  {
    slug: "baguette-tradition-label-rouge",
    pillar: "La baguette de tradition : comprendre le label et la qualité",
    keywords: ["baguette tradition label", "baguette artisanale vs industrielle", "meilleure baguette Paris", "pain tradition française"],
    category: "savoir-faire",
  },
  {
    slug: "abonnement-pain-hebdomadaire",
    pillar: "L'abonnement pain hebdomadaire : du pain frais sans y penser",
    keywords: ["abonnement pain Paris", "pain hebdomadaire livraison", "box pain artisanal", "abonnement boulangerie"],
    category: "art-de-vivre",
  },
  {
    slug: "coffret-cadeau-gourmand-paris",
    pillar: "Coffret cadeau gourmand : offrir le meilleur de la boulangerie parisienne",
    keywords: ["coffret cadeau boulangerie", "cadeau gourmand Paris", "box viennoiseries cadeau", "idée cadeau artisanal"],
    category: "art-de-vivre",
  },
];
