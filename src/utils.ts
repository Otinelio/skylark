// -------------------------------------------------------------
// RESTAURANT DATABASE UTILITIES & MOCK DATA
// Skylark · Dining Above Ordinary · Lomé, Togo
// -------------------------------------------------------------

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  badge?: string;
  available: boolean;
  image: string;
}

export interface RestaurantSettings {
  name: string;
  tagline: string;
  whatsapp: string;
  address: string;
  hours: string;
  instagram: string;
  facebook: string;
}

export interface RestaurantData {
  settings: RestaurantSettings;
  categories: string[];
  items: MenuItem[];
}

export interface OrderItem {
  name: string;
  qty: number;
  unitPrice: number;
  price: number;
}

export interface Order {
  id: string;
  tableNumber: string;
  items: OrderItem[];
  note: string;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  timestamp: number;
  statusUpdatedAt: number;
}

// 1. Initial Default Data
export const DEFAULT_DATA: RestaurantData = {
  settings: {
    name: "Skylark",
    tagline: "Dining Above Ordinary",
    whatsapp: "+22890000000", // Placed +228 code
    address: "Avenue de l'Océan, Rooftop Horizon, Lomé, Togo",
    hours: "Lundi - Dimanche : 12h00 - 23h30\nHappy Hour : Vendredi - Samedi : 17h00 - 19h00",
    instagram: "https://instagram.com/skylark_lome",
    facebook: "https://facebook.com/skylarklome"
  },
  categories: [
    "Plats Signature",
    "Grillades",
    "Spécialités",
    "Cocktails",
    "Boissons",
    "Desserts"
  ],
  items: [
    {
      id: "item_1",
      name: "Homard Grillé Skylark",
      description: "Homard entier au beurre citronné et herbes fraîches du marché, servi avec ses légumes rôtis.",
      price: 28000,
      category: "Plats Signature",
      badge: "Signature du Chef",
      available: true,
      image: "https://images.unsplash.com/photo-1553618551-fba689030290?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_1_buf",
      name: "Filet de Bœuf au Foie Gras & Truffe",
      description: "Filet de bœuf tendre, escalope de foie gras poêlée, sauce demi-glace truffée, mousseline de céleri-rave.",
      price: 24500,
      category: "Plats Signature",
      badge: "Prestige",
      available: true,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_1_saumon",
      name: "Pavé de Saumon Sauvage en Croûte d'Herbes",
      description: "Saumon sauvage cuit unilatéral, croûte d'aneth et parmesan, émulsion de yuzu sauvage, asperges grillées.",
      price: 19500,
      category: "Plats Signature",
      badge: "Coup de Cœur",
      available: true,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_1_risotto",
      name: "Risotto Crémeux de la Baie aux Gambas",
      description: "Risotto au safran, gambas royales saisies, copeaux de truffe noire fraîche et Parmigiano Reggiano 24 mois.",
      price: 18500,
      category: "Plats Signature",
      badge: "Chef d'œuvre",
      available: true,
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_2",
      name: "Côtes d'Agneau Marinées",
      description: "Marinade 24h aux épices douces, cuisson parfaite au charbon de bois, servies avec écrasé de patates douces.",
      price: 22000,
      category: "Grillades",
      available: true,
      image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_2_mignon",
      name: "Brochettes de Filet Mignon de Porc",
      description: "Brochettes marinées aux herbes de Provence, poivrons colorés, cuites au charbon de bois, frites maison.",
      price: 13000,
      category: "Grillades",
      available: true,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_2_angus",
      name: "Entrecôte de Bœuf Angus (350g)",
      description: "Viande maturée grillée à la fleur de sel de Noirmoutier, sauce béarnaise maison, pommes grenailles sautées.",
      price: 21500,
      category: "Grillades",
      badge: "Maturée 30j",
      available: true,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_3",
      name: "Poulet Braisé Maison",
      description: "Recette secrète de la maison, cuisson lente au feu de bois, accompagnée de son riz épicé et sauce pimentée.",
      price: 14000,
      category: "Grillades",
      badge: "Chef recommande",
      available: true,
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_4",
      name: "Tilapia à la Nage",
      description: "Filet de tilapia frais du jour poché dans son court-bouillon parfumé à la citronnelle et légumes de saison.",
      price: 12000,
      category: "Spécialités",
      available: true,
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_4_pasta",
      name: "Tagliatelles au Homard et Safran",
      description: "Pâtes fraîches maison, médaillon de homard, bisque crémeuse safranée et zestes d'orange.",
      price: 18000,
      category: "Spécialités",
      available: true,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_4_sole",
      name: "Sole Meunière Façon Skylark",
      description: "Sole fraîche entière dorée au beurre noisette, jus de citron pressé et persil plat frisé, pommes vapeur.",
      price: 16500,
      category: "Spécialités",
      available: true,
      image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_5",
      name: "Skylark Sunset",
      description: "Création exclusive — jus de gingembre frais, rhum ambré, sirop de passion et citron vert sur glace pilée.",
      price: 4500,
      category: "Cocktails",
      badge: "Signature",
      available: true,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_5_spritz",
      name: "Royal Horizon Spritz",
      description: "Prosecco supérieur, liqueur de sureau sauvage, nectar de poire, eau gazeuse et framboises fraîches.",
      price: 5500,
      category: "Cocktails",
      available: true,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_6",
      name: "Mojito Tropical",
      description: "Rhum blanc agricole, feuilles de menthe fraîche, ananas frais pressé, citron vert, soda pétillant.",
      price: 3800,
      category: "Cocktails",
      available: true,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_7",
      name: "Jus de Bissap Maison",
      description: "Hibiscus frais infusé aux feuilles de menthe et parfum de vanille naturelle des plateaux, servi très frais.",
      price: 1500,
      category: "Boissons",
      available: true,
      image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_7_cocktail",
      name: "Cocktail de Fruits du Jardin",
      description: "Mélange pressé minute de mangue mûre, ananas pain de sucre et passion au gingembre doux.",
      price: 2500,
      category: "Boissons",
      available: true,
      image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_8",
      name: "Moelleux au Chocolat",
      description: "Cœur coulant intense de chocolat noir équatorial, accompagné d'une quenelle de glace à la vanille de Madagascar.",
      price: 5000,
      category: "Desserts",
      available: true,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_8_dome",
      name: "Dôme de Mangue Caramelisée & Passion",
      description: "Mousse de mangue aérienne, cœur coulant passion, biscuit croustillant à la noix de coco rôtie.",
      price: 4800,
      category: "Desserts",
      available: true,
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "item_8_mille",
      name: "Mille-Feuille à la Vanille Bleue",
      description: "Pâte feuilletée croustillante caramélisée, crème diplomate parfumée à la vanille bleue rare de la Réunion.",
      price: 5200,
      category: "Desserts",
      available: true,
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

// 2. Data Retrieval Functions
export function getRestaurantData(): RestaurantData {
  try {
    const raw = localStorage.getItem("restaurantData");
    if (!raw) {
      localStorage.setItem("restaurantData", JSON.stringify(DEFAULT_DATA));
      return DEFAULT_DATA;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.items || parsed.items.length < DEFAULT_DATA.items.length) {
      // Auto-update to pull new signature dishes & menu options
      localStorage.setItem("restaurantData", JSON.stringify(DEFAULT_DATA));
      return DEFAULT_DATA;
    }
    return parsed;
  } catch (error) {
    console.error("Failed to parse restaurantData from localStorage", error);
    return DEFAULT_DATA;
  }
}

export function saveRestaurantData(data: RestaurantData): void {
  try {
    localStorage.setItem("restaurantData", JSON.stringify(data));
    // Trigger custom event to notify other tabs/components
    window.dispatchEvent(new Event("restaurantDataChanged"));
  } catch (error) {
    console.error("Failed to save restaurantData to localStorage", error);
  }
}

export function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem("legrm_orders") || "[]");
  } catch (e) {
    return [];
  }
}

export function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem("legrm_orders", JSON.stringify(orders));
    window.dispatchEvent(new Event("storage")); // Notify other tabs/listeners
  } catch (e) {
    console.error("Failed to save orders", e);
  }
}

export function updateOrderStatus(orderId: string, newStatus: Order['status']): void {
  const orders = getOrders();
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = newStatus;
    orders[idx].statusUpdatedAt = Date.now();
    saveOrders(orders);
  }
}

// 3. Audio Notification System
export function playOrderBeep(): void {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    console.error("Web Audio playback failed", e);
  }
}

export function playDoubleBeep(): void {
  playOrderBeep();
  setTimeout(playOrderBeep, 250);
}
