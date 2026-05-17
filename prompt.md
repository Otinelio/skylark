━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROMPT LOVABLE — SKYLARK
Dining Above Ordinary · Lomé, Togo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


— VISION GLOBALE —

Le visiteur arrive sur le site de Skylark et ressent immédiatement que ce lieu est différent. La chaleur dorée de la page l'enveloppe comme la lumière de fin d'après-midi sur la terrasse du restaurant. Ce n'est pas un site de commande en ligne. C'est une invitation. Le nom Skylark évoque l'oiseau libre, le ciel ouvert, la légèreté d'un bon moment partagé entre gens qui s'apprécient. Le design traduit cela fidèlement : des tons crème champagne qui respirent, une typographie élégante qui parle à voix posée, des photographies au grain chaud qui racontent des instants heureux plutôt que des assiettes vides. Le visiteur ne voit pas un restaurant. Il voit l'endroit où il veut aller ce soir. Le site de Skylark doit ressembler à un éditorial de magazine lifestyle haut de gamme — précis, lumineux, désirable — ancré dans l'énergie de Lomé mais projetant une ambiance qui transcende la ville. Chaque section est une scène. Chaque scroll est une invitation à rester.


— ARCHITECTURE GLOBALE — MEME PROJET REACT, MEME CODEBASE —

PAGES DE L'APPLICATION

━ PUBLIC (navigation principale) ━
  /             → Home           : hero immersive, univers Skylark, plats signature, happy moments, galerie, réservation rapide, témoignages, footer
  /experience   → The Skylark Experience : philosophie, hospitalité, identité du lieu — pas un "À propos" standard
  /menu         → Menu digital   : catalogue interactif, panier WhatsApp, commande sans numéro de table
  /galerie      → Galerie lifestyle : storytelling visuel, moments, ambiance, cocktails
  /reservation  → Réservation    : formulaire premium date/heure/occasion
  /contact      → Contact        : adresse, horaires, WhatsApp, réseaux sociaux, carte

━ ACCES RESTREINT (aucun lien dans la navigation) ━
  /admin        → Dashboard admin     : protégé par mot de passe hardcodé
  /menu/scan    → Menu sur place      : identique à /menu + modal numéro de table bloquant + suivi commande
  /cuisine      → Interface brigade   : Kanban commandes, protégé par mot de passe, notification sonore

NAVIGATION PUBLIQUE :
  Mobile  : bottom navigation bar fixe (Home | Menu | Expérience | Contact)
  Desktop : top navbar horizontale avec logo Skylark centré, liens à gauche et à droite
  → NE PAS créer de lien vers /admin, /menu/scan ou /cuisine dans la navigation
  → Ces trois pages sont accessibles uniquement en tapant l'URL directement dans le navigateur
  → La navbar desktop devient transparente sur le hero et prend un fond champagne cream (#F3EBDD) au scroll
  → Sur mobile, la bottom nav a un fond champagne cream avec une fine bordure warm sand (#D7C3A5) en haut


— DONNÉES RESTAURANT —

Nom                : Skylark
Ville              : Lomé, Togo
Devise             : FCFA
WhatsApp           : [À CONFIRMER — placer +228XXXXXXXX]
Adresse            : [À CONFIRMER]
Horaires           : [À CONFIRMER]
Instagram          : [À CONFIRMER]
Facebook           : [À CONFIRMER]
ADMIN_PASSWORD     : "skylark2025"  — IMPORTANT : à changer avant tout déploiement public
CUISINE_PASSWORD   : "cuisine2025"  — IMPORTANT : à changer avant tout déploiement public


— DIRECTION ESTHÉTIQUE —

Nom de la direction : Sky Luxury Dining — Éditorial lifestyle premium golden hour

Ce que le site N'EST PAS :
- Un site de restaurant africain générique avec fond sombre, texte doré brillant et photos de foule
- Un site fast-food propre et fonctionnel sans âme
- Un site nightclub avec ambiance artificielle bleutée ou violette

Ce que le site EST :
- Un magazine de lifestyle culinaire photographié à l'heure dorée
- Un hôtel boutique qui a ouvert sa table au public
- Un rooftop lounge avec l'élégance d'un restaurant gastronomique moderne

Comportement de la grille :
- Éditorial et modulaire — certaines sections s'étendent en pleine largeur, d'autres respirent en colonnes larges
- Les marges intérieures sont généreuses, jamais étouffées
- Asymétrie maîtrisée sur les sections lifestyle (texte à gauche, image prenant les deux tiers droits)
- Les cards de plats sont symétriques, propres, avec une hiérarchie lisible immédiatement

Caractère général :
- Fond majoritairement clair (champagne cream #F3EBDD)
- Sections profondes en dark olive smoke (#384038) pour créer le rythme visuel
- Lumière naturelle, chaude, jamais artificielle


— PALETTE OFFICIELLE —

Fond principal    | Champagne Cream  | #F3EBDD | Fond de toutes les pages publiques, respirations visuelles entre sections — ne jamais superposer deux sections champagne sans une section sable ou profonde entre elles
Fond secondaire   | Warm Sand        | #D7C3A5 | Cards de plats, fonds de sections intermédiaires, textures légères, séparateurs visuels
Accent signature  | Skylark Gold     | #C89B3C | Uniquement sur : boutons CTA, prix des plats, badges "Signature du chef", lignes de séparation premium, hover des liens — jamais en aplat large, toujours discret et mat
Profondeur        | Dark Olive Smoke | #384038 | Footer, overlays sur les photos hero, sections menu profondes, fond du dashboard /cuisine
Emotion           | Sunset Amber     | #D58C3B | Glow léger sous les CTA, dégradés de transition entre sections, accent sur les citations en italique
Texte premium     | Deep Cocoa       | #49372B | Corps de texte principal, noms de plats, titres secondaires — jamais noir pur

Répartition : 50% champagne cream, 20% warm sand, 15% skylark gold, 10% dark olive smoke, 5% sunset amber


— TYPOGRAPHIE —

TITRES — Cormorant Garamond (Google Fonts)
Justification : typographie sérif classique aux proportions élancées — elle impose une présence éditoriale sans effort. Parfaite pour un restaurant qui se veut raffiné sans être intimidant.
  Hero titre         : 72px desktop / 44px mobile, weight 300 (Light), tracking -0.02em, casse normale
  Titres de section  : 48px desktop / 32px mobile, weight 400, tracking -0.01em
  Noms des plats     : 20px, weight 500, tracking 0
  Citations          : 28px italic, weight 300, tracking 0.01em, couleur deep cocoa (#49372B)

TEXTE PRINCIPAL — Manrope (Google Fonts)
Justification : sans-serif géométrique moderne avec une personnalité distincte — il apporte lisibilité et modernité sans jamais concurrencer Cormorant Garamond.
  Corps de texte     : 16px, weight 400, line-height 1.75, letter-spacing 0
  Descriptions plats : 14px, weight 400, line-height 1.6, color deep cocoa à 70% d'opacité
  Prix               : 18px, weight 700, color skylark gold (#C89B3C)
  Labels catégorie   : 11px, weight 600, letter-spacing 0.12em, casse majuscule
  Boutons            : 13px, weight 600, letter-spacing 0.08em, casse majuscule
  Topbar navbar      : 13px, weight 500, letter-spacing 0.06em

CITATIONS / ACCROCHES — Playfair Display Italic (Google Fonts)
Uniquement pour les phrases d'ambiance et les slogans intercalés dans les sections lifestyle.
Exemple : "Happiness is best served around a table."


— ICONES —

Règle absolue : zéro emoji dans toute l'interface. Partout. Jamais. Aucun.
Toute représentation visuelle passe par des icônes vectorielles lucide-react.
Stroke width global : 1.5 (élégant, cohérent avec la direction premium)

Mapping :
  Nav Home         : Home
  Nav Menu         : UtensilsCrossed
  Nav Experience   : Sparkles
  Nav Contact      : MapPin
  CartFab          : ShoppingCart
  Ajouter panier   : Plus
  Enlever panier   : Minus
  Supprimer        : Trash2
  WhatsApp CTA     : MessageCircle (couleur #25D366)
  Table (modal)    : Hash
  Adresse          : MapPin
  Horaires         : Clock
  Téléphone        : Phone
  Instagram        : Instagram
  Facebook         : Facebook
  Admin logout     : LogOut
  Admin save       : Save
  Admin edit       : Pencil
  Admin delete     : Trash2
  Admin export     : Download
  Réservation      : CalendarDays
  Personnes        : Users
  Occasion         : Sparkles
  Cuisine pending  : Clock
  Cuisine preparing: Flame
  Cuisine ready    : BellRing
  Cuisine served   : CheckCircle
  Cuisine logout   : LogOut
  Cuisine archive  : Archive
  Statut commande  : ChefHat


— ECRAN DE CHARGEMENT —

Fond : champagne cream (#F3EBDD)
Centre : le mot "SKYLARK" en Cormorant Garamond 32px, weight 300, couleur dark olive smoke (#384038)
Sous le nom : une fine ligne horizontale skylark gold (#C89B3C) qui s'étend de gauche à droite en 800ms — animation width de 0 à 120px, easing ease-out
Disparition : fondu global opacity 1 vers 0 en 400ms, easing ease-in-out, après 1000ms minimum
Aucun spinner. Aucune animation rotative. Aucun logo image requis — uniquement typographie et ligne dorée.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VOLET 1 — SITE VITRINE PUBLIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

— PAGE / — HOME —

SECTION 1 — HERO IMMERSIVE (100vh)

Background : vidéo cinématique en boucle silencieuse (fallback : grande photo Unsplash "rooftop restaurant golden hour sunset warm light"). La vidéo ou l'image couvre tout l'écran en object-fit cover.
Overlay : dégradé vertical en deux couches — d'abord un léger dégradé sunset amber (#D58C3B) à 10% d'opacité sur toute la surface, puis un dégradé dark olive smoke (#384038) à 60% d'opacité qui monte du bas jusqu'au tiers central.
Contenu centré verticalement, légèrement décalé vers le haut (translateY -5%) :
  - Surtitre : "LOMÉ, TOGO" en Manrope 11px, weight 600, letter-spacing 0.2em, couleur champagne cream (#F3EBDD) à 70% d'opacité — reveal opacity 0 vers 1 en 600ms, delay 200ms
  - Titre principal : "We Serve Happiness" en Cormorant Garamond 80px desktop / 52px mobile, weight 300, couleur champagne cream (#F3EBDD), text-shadow 0 2px 40px rgba(0,0,0,0.3) — reveal translateY 20px vers 0 + opacity 0 vers 1 en 800ms, delay 400ms, easing cubic-bezier(0.25, 0.46, 0.45, 0.94)
  - Citation : "Dining Above Ordinary" en Playfair Display Italic 22px, couleur warm sand (#D7C3A5) — reveal en 600ms, delay 800ms
  - Groupe CTA : deux boutons en ligne avec gap 16px — reveal en 500ms, delay 1100ms
    - Bouton primaire "Réserver une table" : fond skylark gold (#C89B3C), texte dark olive smoke (#384038), padding 16px 32px, border-radius 2px (presque carré, premium), Manrope 13px weight 600 letter-spacing 0.08em — hover : brightness 1.1, transition 250ms ease
    - Bouton secondaire "Découvrir le menu" : fond transparent, bordure 1px champagne cream (#F3EBDD), texte champagne cream (#F3EBDD), même dimensions — hover : fond champagne cream à 10%
  - En bas du hero : icône ChevronDown (lucide-react, 24px, champagne cream 50%) animé en floating Y -6px à 6px, cycle 2s ease-in-out infini

Élément signature de la page : la fine ligne skylark gold (#C89B3C) de 1px de hauteur et 60px de largeur positionnée entre le surtitre et le titre — elle apparaît en width 0 vers 60px en 400ms, delay 300ms.

SECTION 2 — NOTRE UNIVERS

Fond : champagne cream (#F3EBDD)
Disposition desktop : deux colonnes égales, gap 80px, padding vertical 120px
  Colonne gauche : texte
    - Label : "L'ESPRIT DU LIEU" en Manrope 11px weight 600 letter-spacing 0.15em, couleur skylark gold (#C89B3C)
    - Titre : "Un endroit où les bons moments deviennent des souvenirs." en Cormorant Garamond 44px weight 400
    - Paragraphe : "Skylark n'est pas un restaurant ordinaire. C'est une parenthèse lumineuse au coeur de Lomé — un espace pensé pour que chaque repas soit une expérience, chaque tablée soit un souvenir, chaque instant soit vécu pleinement. La cuisine est généreuse, le service est attentif, l'ambiance est celle d'un soir parfait." en Manrope 16px weight 400 line-height 1.75
    - Trois métriques en ligne, séparées par une fine ligne verticale warm sand (#D7C3A5) :
      "Tables" | "Chaque soir" | "Since [À CONFIRMER]"
      Valeur en Cormorant Garamond 36px skylark gold, label en Manrope 11px weight 600 letter-spacing 0.12em dark olive smoke
  Colonne droite : image Unsplash "elegant restaurant interior warm light lomé" — ratio 4:5, border-radius 4px, légère ombre box-shadow 0 20px 60px rgba(56,64,56,0.15)

Reveal : les deux colonnes entrent en translateY 30px vers 0 + opacity 0 vers 1 en 700ms stagger 200ms, déclenchées quand la section entre dans le viewport (IntersectionObserver threshold 0.2)

SECTION 3 — SIGNATURE DISHES

Fond : warm sand (#D7C3A5) — transition naturelle depuis champagne cream
Titre centré : "Nos Plats Signature" en Cormorant Garamond 52px
Sous-titre centré : citation Playfair Display Italic "Taste Elevated." en sunset amber (#D58C3B)

Grille 3 cards desktop / 1 card mobile (scroll horizontal sur mobile avec snap) — gap 24px, padding vertical 80px

Chaque card plat signature :
  - Image : ratio 4:3, border-radius 8px, zoom discret au hover (scale 1 vers 1.03, transition 400ms ease) — queries Unsplash spécifiques : "grilled fish premium plating warm light", "african spiced chicken golden plated editorial", "cocktail tropical golden hour close shot"
  - Badge "Chef recommande" : fond skylark gold (#C89B3C), texte dark olive smoke (#384038), Manrope 10px weight 700 letter-spacing 0.1em, positionnement absolu haut-gauche de l'image, border-radius 2px, padding 4px 10px
  - Nom du plat : Cormorant Garamond 22px weight 500, deep cocoa (#49372B)
  - Description : Manrope 14px weight 400 line-height 1.6, deep cocoa à 70%
  - Prix : Manrope 18px weight 700, skylark gold (#C89B3C)
  - Bouton "Voir le menu" lien vers /menu : Manrope 12px weight 600 letter-spacing 0.08em, couleur skylark gold, underline animé au hover (width 0 vers 100% en 250ms)

Données initiales en DEFAULT_DATA :
  { name: "Homard Grillé Skylark", description: "Homard entier au beurre citronné, herbes fraîches du marché, servi avec ses légumes rôtis.", price: 28000, category: "Signature", badge: "Chef recommande", available: true }
  { name: "Poulet Braisé Maison", description: "Marinade secrète 24h, cuisson lente au charbon de bois, accompagné de son riz épicé et de la sauce pimentée maison.", price: 14000, category: "Signature", badge: "Chef recommande", available: true }
  { name: "Cocktail Skylark Sunset", description: "Création exclusive — jus de gingembre frais, rhum ambré, sirop de passion et citron vert sur glace pilée.", price: 4500, category: "Cocktails", badge: "Boisson signature", available: true }

SECTION 4 — HAPPY MOMENTS

Fond : dark olive smoke (#384038) — contraste profond pour cette section émotionnelle
Padding vertical : 120px
Titre centré : "Happy Moments" en Cormorant Garamond 56px, couleur champagne cream (#F3EBDD)
Citation centré sous le titre : Playfair Display Italic 22px sunset amber (#D58C3B) — "More Than Food, A Feeling."

Mosaïque asymétrique 3 colonnes desktop — colonne centrale légèrement plus haute :
  Image 1 (grande, colonne gauche) : "friends laughing restaurant table warm light" — ratio 3:4
  Image 2 (petite, colonne centrale haute) : "couple dining elegant restaurant golden hour" — ratio 1:1
  Image 3 (grande, colonne centrale basse) : "hands clinking wine glasses warm restaurant" — ratio 16:9
  Image 4 (grande, colonne droite) : "group celebration birthday restaurant laughter" — ratio 3:4

Traitement CSS global des images de cette section : filter saturate(1.1) contrast(1.05)
Overlay léger au hover : dark olive smoke à 20%, transition opacity 300ms ease

Élément signature de la section : un trait horizontal skylark gold (#C89B3C) de 1px qui traverse 40% de la largeur de l'écran, centré, au-dessus du titre — appear en 600ms quand la section entre dans le viewport

SECTION 5 — GALERIE LIFESTYLE (aperçu)

Fond : champagne cream (#F3EBDD)
Scroll horizontal de 6 images en pleine hauteur (400px) avec gap 16px, padding horizontal 40px desktop / 20px mobile
Chaque image : border-radius 4px, zoom scale 1 vers 1.04 au hover en 500ms ease
Queries Unsplash pour les 6 images : "restaurant ambiance warm evening light", "cocktail bar golden hour bokeh", "food plating close up editorial", "people dining outdoors evening", "waiter elegant service restaurant", "restaurant table setting candles warm"

CTA centré sous la galerie :
  Bouton "Voir toute la galerie" lien vers /galerie : fond transparent, bordure 1px dark olive smoke (#384038), texte dark olive smoke (#384038), hover : fond dark olive smoke, texte champagne cream — transition 300ms ease

SECTION 6 — RESERVATION RAPIDE

Fond : dégradé subtle warm sand (#D7C3A5) vers champagne cream (#F3EBDD)
Disposition desktop : texte à gauche (40%) / formulaire à droite (60%)
Titre gauche : Cormorant Garamond 48px "Réserver votre table"
Sous-titre : Manrope 16px deep cocoa "Une soirée parfaite commence par une réservation."
Formulaire droit (style premium — fond blanc à 70%, border-radius 12px, ombre douce box-shadow 0 8px 40px rgba(56,64,56,0.10), padding 40px) :
  - Input Date : CalendarDays (lucide-react 16px skylark gold) + label "Date"
  - Input Heure : Clock (lucide-react 16px) + label "Heure" — options 12h00, 13h00, 19h00, 20h00, 21h00, 22h00
  - Input Personnes : Users (lucide-react 16px) + label "Nombre de personnes" — select 1 à 15
  - Input Occasion : Sparkles (lucide-react 16px) + label "Occasion" — select : Dîner classique, Dîner romantique, Anniversaire, Business dinner, Repas en famille, Entre amis
  - Input Nom + Input Téléphone sur la même ligne
  - Bouton "Confirmer la réservation" : fond skylark gold (#C89B3C), texte dark olive smoke (#384038), pleine largeur, height 52px, Manrope 13px weight 600 letter-spacing 0.08em — clic ouvre WhatsApp avec le message pré-formaté : "Bonjour Skylark, je souhaite réserver une table pour [N personnes] le [date] à [heure] — Occasion : [occasion]. Nom : [nom]. Tel : [tel]."
  Champs : border 1px warm sand (#D7C3A5), border-radius 6px, fond champagne cream (#F3EBDD), focus border-color skylark gold (#C89B3C), transition border-color 200ms ease

SECTION 7 — TEMOIGNAGES

Fond : champagne cream (#F3EBDD)
Titre centré : Cormorant Garamond 48px "Ce qu'ils disent de nous"
Carrousel horizontal automatique (autoplay 5s, pause au hover) de 4 témoignages — navigation par dots skylark gold
Chaque témoignage (card) :
  - Fond : warm sand (#D7C3A5) à 40%, border-radius 8px, padding 32px
  - Texte citation : Playfair Display Italic 20px deep cocoa (#49372B), line-height 1.7
  - Nom : Manrope 14px weight 600 dark olive smoke (#384038) — lettre majuscule prénom uniquement
  - Occasion : Manrope 12px skylark gold (#C89B3C)
Données initiales :
  "Une expérience inoubliable. Le service est impeccable, les plats sont raffinés et l'ambiance est exactement ce qu'on cherche quand on veut une belle soirée à Lomé." — Kofi A. — Dîner romantique
  "Skylark m'a réconcilié avec l'idée de sortir en famille. Tout le monde y trouve son bonheur, et la qualité est constante." — Ama D. — Repas en famille
  "Le meilleur cocktail de Lomé, sans discussion. Et le service sourit vraiment." — Jean-Paul K. — Entre amis
  "Business dinner parfait. Cadre premium, discrétion du staff, cuisine mémorable. Je recommande à tous mes partenaires." — Ibrahim S. — Business dinner

SECTION 8 — FOOTER PREMIUM

Fond : dark olive smoke (#384038)
Disposition desktop : 4 colonnes avec gap 60px, padding vertical 80px, padding horizontal 80px

  Colonne 1 — Identité :
    Logo texte "SKYLARK" en Cormorant Garamond 32px weight 300 champagne cream (#F3EBDD)
    Tagline "We Serve Happiness." en Playfair Display Italic 14px sunset amber (#D58C3B)
    Trait séparateur 40px skylark gold (#C89B3C) 1px margin top 20px

  Colonne 2 — Navigation :
    Label "LIENS" Manrope 11px weight 600 letter-spacing 0.15em warm sand (#D7C3A5)
    Liens : Home, The Skylark Experience, Menu, Galerie, Réservation, Contact
    Chaque lien : Manrope 14px champagne cream (#F3EBDD) à 70%, hover couleur champagne cream 100%, transition 200ms ease

  Colonne 3 — Contact :
    Label "NOUS TROUVER" même style
    MapPin (lucide-react 16px skylark gold) + adresse [À CONFIRMER]
    Clock (lucide-react 16px skylark gold) + horaires [À CONFIRMER]
    Phone (lucide-react 16px skylark gold) + numéro [À CONFIRMER]

  Colonne 4 — Réseaux sociaux :
    Label "SUIVEZ-NOUS" même style
    Icônes Instagram + Facebook (lucide-react 20px, champagne cream (#F3EBDD) à 60%, hover skylark gold (#C89B3C), transition 250ms ease)
    Bouton WhatsApp pleine largeur : fond skylark gold (#C89B3C), texte dark olive smoke (#384038), MessageCircle 16px, "Écrire sur WhatsApp", border-radius 4px, height 44px

Ligne légale : fond dark olive smoke légèrement plus sombre (via opacity 0.4 overlay), texte Manrope 12px champagne cream 40%, centré : "Skylark Restaurant · Lomé, Togo · [À CONFIRMER]"


— PAGE /experience — THE SKYLARK EXPERIENCE —

Cette page ne s'appelle pas "À propos". Elle s'appelle "The Skylark Experience" et doit vendre une émotion.

HERO DE PAGE :
  Background image Unsplash "restaurant interior design warm golden light evening" — pleine largeur, hauteur 70vh
  Overlay dark olive smoke (#384038) 55%
  Titre centré : "The Skylark Experience" en Cormorant Garamond 72px desktop / 48px mobile, champagne cream (#F3EBDD)
  Sous-titre : Playfair Display Italic 24px sunset amber (#D58C3B) "Where Good Moments Meet."

SECTION PHILOSOPHIE :
  Fond : champagne cream (#F3EBDD), padding 120px
  Disposition : texte centré, largeur max 680px, margin auto
  Label "NOTRE PHILOSOPHIE" Manrope 11px weight 600 letter-spacing 0.15em skylark gold (#C89B3C)
  Titre Cormorant Garamond 48px "Nous ne servons pas simplement à manger."
  Corps Manrope 18px weight 400 line-height 1.8 deep cocoa (#49372B) : "Skylark est né d'une conviction simple : un bon repas peut transformer une soirée ordinaire en souvenir de toute une vie. Notre cuisine est généreuse, notre service est sincère, et notre maison est conçue pour que vous vous y sentiez bien. Chaque plat sort d'une cuisine portée par la passion, chaque table est dressée avec le soin qu'un hôte apporte à ses invités les plus précieux."

SECTION TROIS VALEURS (piliers) :
  Fond : warm sand (#D7C3A5)
  Grille 3 colonnes — chaque colonne : icône lucide-react (28px skylark gold) + titre Cormorant Garamond 28px + description Manrope 15px
  Valeur 1 : Sparkles + "L'Excellence Discrète" + "Ici, la qualité ne se vante pas. Elle se ressent à la première bouchée, au premier sourire de notre équipe."
  Valeur 2 : Heart + "L'Hospitalité Sincère" + "Chaque client qui franchit notre porte est un invité. Notre service est attentif parce qu'il est humain."
  Valeur 3 : Sun + "L'Expérience Avant Tout" + "Nous pensons chaque détail — la lumière, la musique, la carte — pour que vous repartiez avec l'envie de revenir."

SECTION EQUIPE / VISAGE DU LIEU :
  Fond : champagne cream (#F3EBDD)
  Disposition : image gauche (Unsplash "chef professional kitchen warm light") + texte droit
  Titre Cormorant Garamond 40px "La cuisine, au coeur de tout."
  Corps Manrope 16px sur la philosophie culinaire du chef et l'ancrage local de la cuisine

SECTION AMBIANCE (galerie intime) :
  Fond : dark olive smoke (#384038)
  4 images côte à côte (desktop) en pleine hauteur 350px, sans gap, légère ombre intérieure
  Queries : "restaurant table candles intimate", "cocktail close golden light", "chef plating food editorial", "restaurant exterior lomé warm"


— PAGE /menu — MENU DIGITAL —

Lire les données depuis getRestaurantData().items et getRestaurantData().categories avec fallback sur DEFAULT_DATA. Afficher uniquement les plats avec available: true.

HEADER DE PAGE :
  Fond : champagne cream (#F3EBDD), hauteur 200px
  Titre centré : "Notre Menu" Cormorant Garamond 56px
  Sous-titre : Playfair Display Italic "Taste Elevated." 20px sunset amber (#D58C3B)

CATEGORY NAV (sticky, top 0 ou top [hauteur navbar]) :
  Fond : champagne cream (#F3EBDD) avec ombre bas box-shadow 0 2px 20px rgba(56,64,56,0.08)
  Scroll horizontal, pills avec gap 8px, padding horizontal 20px, padding vertical 12px
  Pill active : fond skylark gold (#C89B3C), texte dark olive smoke (#384038), border-radius 20px
  Pill inactive : fond warm sand (#D7C3A5), texte deep cocoa (#49372B)
  Clic sur une pill → scroll fluide vers la section correspondante
  Manrope 11px weight 600 letter-spacing 0.1em casse majuscule

SECTIONS DU MENU (une par catégorie) :
  Fond alterné : champagne cream (#F3EBDD) / warm sand (#D7C3A5) selon les catégories
  Titre de section : Cormorant Garamond 40px deep cocoa (#49372B), ligne skylark gold 1px 40px en dessous
  Grille : 2 colonnes desktop / 1 colonne mobile, gap 24px

MENUITEMCARD :
  Fond : blanc pur (#FFFFFF), border-radius 12px, ombre box-shadow 0 4px 20px rgba(73,55,43,0.08)
  Image : ratio 4:3, border-radius 8px 8px 0 0, object-fit cover, zoom scale 1 vers 1.04 au hover en 400ms ease
  Corps : padding 16px
  Badge "Signature du Chef" si disponible : fond skylark gold (#C89B3C), texte dark olive smoke (#384038), Manrope 10px weight 700 letter-spacing 0.1em, positionnement absolu haut-droit, border-radius 0 8px 0 8px
  Nom : Cormorant Garamond 20px weight 500 deep cocoa (#49372B)
  Description : Manrope 13px weight 400 line-height 1.6 deep cocoa à 65%, max 2 lignes avec ellipsis
  Prix : Manrope 18px weight 700 skylark gold (#C89B3C)
  Bouton Plus (+) : cercle 36px fond skylark gold (#C89B3C), icône Plus (lucide-react 18px dark olive smoke), animation scale 1 vers 1.25 vers 1 en 300ms spring, positionné bottom-right de la card
  Si article dans le panier : ligne [Minus | count | Plus] — count Cormorant Garamond 18px skylark gold

DEFAULT_DATA — catégories et plats de démonstration :
  Catégories : ["Plats Signature", "Grillades", "Spécialités", "Cocktails", "Boissons", "Desserts"]
  Plats :
    { name: "Homard Grillé Skylark", description: "Homard entier au beurre citronné et herbes fraîches.", price: 28000, category: "Plats Signature", badge: "Signature du Chef", available: true }
    { name: "Côtes d'Agneau Marinées", description: "Marinade 24h, cuisson au charbon, servi avec légumes rôtis.", price: 22000, category: "Grillades", available: true }
    { name: "Poulet Braisé Maison", description: "Recette maison, cuisson lente, sauce pimentée.", price: 14000, category: "Grillades", badge: "Signature du Chef", available: true }
    { name: "Tilapia à la Nage", description: "Filet de tilapia du jour, bouillon léger, légumes du marché.", price: 12000, category: "Spécialités", available: true }
    { name: "Skylark Sunset", description: "Rhum ambré, passion, gingembre, citron vert.", price: 4500, category: "Cocktails", badge: "Signature du Chef", available: true }
    { name: "Mojito Tropical", description: "Rhum blanc, menthe fraîche, ananas, citron vert, soda.", price: 3800, category: "Cocktails", available: true }
    { name: "Jus de Bissap Maison", description: "Hibiscus frais, gingembre, sucre naturel, servi glacé.", price: 1500, category: "Boissons", available: true }
    { name: "Moelleux au Chocolat", description: "Coeur fondant, glace vanille, coulis de caramel beurre salé.", price: 5000, category: "Desserts", available: true }

CARTFAB (panier flottant) :
  Fixe bottom-right : bottom 80px mobile (au-dessus de la bottom nav + 16px) / bottom 32px desktop
  Cercle 56px, fond skylark gold (#C89B3C), ShoppingCart 24px (lucide-react, dark olive smoke)
  Badge count : cercle 20px fond dark olive smoke (#384038), texte Manrope 11px weight 700 champagne cream, positionnement top-right, animation scale spring 0.5 vers 1.2 vers 1 en 400ms au changement de valeur
  Visible uniquement si panier non vide
  Clic → ouvre CartDrawer

CARTDRAWER :
  Mobile : bottom sheet, translateY 100% vers 0, 380ms cubic-bezier(0.32, 0.72, 0, 1), overlay dark olive smoke (#384038) à 50%
  Desktop : drawer droit, largeur 400px, même animation
  Fond : champagne cream (#F3EBDD)
  Header : "Votre commande" Cormorant Garamond 28px + CloseX lucide-react 20px
  Liste articles : nom Manrope 15px weight 500, prix Manrope 14px skylark gold, controls [Minus | count | Plus], Trash2 pour supprimer
  Ligne séparatrice warm sand (#D7C3A5) 1px entre chaque article
  Sous-total : Manrope 16px weight 700 dark olive smoke (#384038) — "Total : [X] FCFA"
  Textarea note optionnelle : "Ajouter une note pour la cuisine..." — fond blanc, border warm sand
  Bouton CTA WhatsApp pleine largeur : fond #25D366, texte blanc, MessageCircle (lucide-react 18px), Manrope 13px weight 600 "Commander via WhatsApp" — height 52px, border-radius 6px
  État vide : ShoppingCart 48px dark olive smoke à 20% centré + "Votre panier est vide" Manrope 15px dark olive smoke à 40%
  Panier persisté en localStorage["cart"]

Message WhatsApp menu classique :
  "Bonjour Skylark ! Je souhaite commander :\n[liste des articles avec quantités et prix]\n\nTotal : [X] FCFA\n\nNote : [note ou rien]"


— PAGE /galerie — GALERIE LIFESTYLE —

Hero réduit (50vh) : image Unsplash "restaurant ambiance elegant golden light group table" + overlay dark olive smoke 45%
Titre centré : "Moments at Skylark" Cormorant Garamond 60px champagne cream (#F3EBDD)

Filtre catégories (pills) : Tout | Ambiance | Plats | Cocktails | Moments
Même style que CategoryNav du menu

Mosaïque responsive (masonry ou grille variée) — 3 colonnes desktop / 2 colonnes mobile
Minimum 12 images réparties : 7 ambiance/moments, 3 plats, 2 cocktails
Au clic sur une image : lightbox simple — fond dark olive smoke (#384038) 95%, navigation prev/next avec ChevronLeft ChevronRight (lucide-react 32px champagne cream), fermeture avec X (lucide-react 24px)
Hover sur chaque image : overlay dark olive smoke 20% + légère bordure skylark gold 2px — transition 250ms ease

Traitement CSS global : filter saturate(1.08) contrast(1.03)


— PAGE /reservation — RESERVATION —

Hero réduit (50vh) : image "restaurant table setting elegant candles warm light" + overlay 50%
Titre centré : "Réserver une table" Cormorant Garamond 60px champagne cream

FORMULAIRE COMPLET (centré, max-width 640px, fond blanc à 80%, border-radius 16px, ombre box-shadow 0 16px 60px rgba(56,64,56,0.12), padding 48px) :
  - Date et heure sur la même ligne
  - Nombre de personnes : select 1 à 15+ (avec icône Users lucide-react)
  - Occasion : Dîner classique / Dîner romantique / Anniversaire / Business dinner / Repas en famille / Entre amis
  - Prénom + Nom sur la même ligne
  - Téléphone
  - Message optionnel : "Précisions, allergies, demandes spéciales..."
  - Bouton "Réserver ma table" : fond skylark gold (#C89B3C), texte dark olive smoke (#384038), pleine largeur, height 56px, Manrope 13px weight 600 letter-spacing 0.08em — clic → WhatsApp
  Tous les inputs : border 1px warm sand (#D7C3A5), border-radius 6px, focus border skylark gold (#C89B3C), fond champagne cream (#F3EBDD), Manrope 14px, padding 14px 16px

Note sous le formulaire : Manrope 13px deep cocoa à 60% "Votre réservation sera confirmée par WhatsApp dans les meilleurs délais."


— PAGE /contact —

Hero réduit (40vh) : image "restaurant exterior warm evening glow" + overlay 45%
Titre centré : "Nous trouver" Cormorant Garamond 56px champagne cream

SECTION INFO + CARTE (desktop deux colonnes) :
  Colonne gauche : fond champagne cream (#F3EBDD), padding 60px
    - Bloc adresse : MapPin skylark gold + adresse [À CONFIRMER]
    - Bloc horaires : Clock skylark gold + [À CONFIRMER]
    - Bloc téléphone : Phone skylark gold + [À CONFIRMER]
    - Bouton WhatsApp : fond #25D366, MessageCircle, "Écrire sur WhatsApp"
    - Réseaux sociaux : Instagram + Facebook (icônes 24px, fond warm sand (#D7C3A5), circle, hover skylark gold)
  Colonne droite : iframe Google Maps [À CONFIRMER] ou image placeholder "map lomé togo" — hauteur 400px, border-radius 8px


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VOLET 2 — DASHBOARD ADMIN (/admin)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ADMIN_PASSWORD = "skylark2025"  — constante hardcodée. IMPORTANT : changer avant tout déploiement public.

ECRAN DE LOGIN /admin :
  Fond : #F8F9FA (neutre, distinct du site public)
  Carte centrale : fond blanc, border-radius 12px, ombre légère, padding 40px, max-width 380px
  Titre : "Accès Administrateur" Manrope 18px weight 600 dark olive smoke (#384038)
  Sous-titre : "Skylark — Dashboard" Manrope 13px deep cocoa (#49372B) à 60%
  Input mot de passe : type password, border 1px #E0E0E0, focus border skylark gold (#C89B3C), border-radius 6px, padding 12px 16px, Manrope 14px, icône Eye/EyeOff pour afficher/masquer
  Bouton "Se connecter" : fond dark olive smoke (#384038), texte blanc, Manrope 13px weight 600, pleine largeur, height 48px — hover brightness 1.1
  Erreur : texte rouge Manrope 13px sous l'input

DASHBOARD (si authentifié) :
  Design sobre et professionnel — fond général #F8F9FA, accents dark olive smoke (#384038), aucun style "restaurant"
  Mobile-first : le restaurateur gère depuis son téléphone

  Topbar :
    Fond blanc, ombre bas légère
    Gauche : "SKYLARK — Admin" Manrope 14px weight 600 dark olive smoke
    Droite : bouton "Déconnexion" LogOut (lucide-react 16px) + texte Manrope 13px — clic efface l'auth et redirige vers /admin

  4 onglets de navigation (tabs ou sidebar desktop) :

  ONGLET 1 — MENU (onglet par défaut) :
    Liste de tous les plats groupés par catégorie
    Header de groupe : nom de catégorie Manrope 12px weight 700 letter-spacing 0.12em + badge nombre de plats
    Chaque plat : ligne avec nom | prix | toggle disponible/indisponible | boutons Modifier (Pencil) et Supprimer (Trash2)
    Toggle : état activé fond skylark gold (#C89B3C), état désactivé fond #CCC — labels "Disponible" / "Indisponible"
    Bouton "Ajouter un plat" : fond dark olive smoke (#384038), texte blanc, Plus (lucide-react 16px), en haut de chaque groupe ou en global
    Formulaire d'ajout/modification (drawer ou modal) :
      Champs : Nom, Description (textarea), Prix (number, FCFA), Catégorie (select), URL Image, Badge (optionnel), Disponible (toggle)
      Boutons : Sauvegarder (Save lucide-react, fond skylark gold) + Annuler

  ONGLET 2 — CATEGORIES :
    Liste des catégories avec nombre de plats associés
    Boutons : Ajouter (Plus), Renommer (Pencil), Supprimer (Trash2, avec confirmation modale)
    Réordonner avec boutons flèche haut/bas (ChevronUp/ChevronDown lucide-react)

  ONGLET 3 — PARAMETRES DU RESTAURANT :
    Champs : Nom du restaurant, Tagline, Numéro WhatsApp, Adresse, Horaires (textarea), Instagram URL, Facebook URL
    Bouton "Sauvegarder" : Save (lucide-react 16px), fond dark olive smoke (#384038), texte blanc, pleine largeur, height 48px

  ONGLET 4 — EXPORT / CONFIG :
    Bouton "Copier la configuration JSON" : Copy (lucide-react 16px), fond dark olive smoke (#384038), texte blanc
    Instruction : "Partagez ce JSON avec votre développeur pour mettre à jour les données par défaut du site. Les modifications admin ne sont visibles que sur cet appareil."
    Bouton "Réinitialiser aux données par défaut" : Manrope 13px rouge, avec confirmation modale avant exécution

IMPORTANT — getRestaurantData() :
  Fonction partagée par toutes les pages publiques ET le dashboard admin
  Logique : lire localStorage["restaurantData"] en premier — si absent, retourner DEFAULT_DATA
  Toute modification admin écrit dans localStorage["restaurantData"]


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VOLET 3 — MENU SUR PLACE (/menu/scan)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPOSANT PARTAGE :
  MenuPage(scanMode: boolean)
  /menu       : <MenuPage scanMode={false} />
  /menu/scan  : <MenuPage scanMode={true}  />

COMPORTEMENT /menu/scan :
  1. Au chargement : lire localStorage["tableNumber"]
  2. Si vide → afficher TableModal bloquant — aucune interaction avec le menu avant validation
  3. Le client saisit son numéro de table → confirme → stocker dans localStorage["tableNumber"]
  4. Déverrouiller le menu

TABLEMODAL — REGLES STRICTES :
  Non-dismissable : pas de croix, overlay non-cliquable, pas d'Escape
  Saisie TOUJOURS manuelle — NE PAS lire de paramètre dans l'URL (?table= ignoré)
  Fond : champagne cream (#F3EBDD), border-radius 16px, ombre box-shadow 0 20px 60px rgba(56,64,56,0.2), padding 48px, max-width 360px, centré
  Icône Hash (lucide-react 40px skylark gold (#C89B3C))
  Titre : "Votre numéro de table ?" Cormorant Garamond 32px dark olive smoke (#384038)
  Sous-titre : "Entrez le numéro inscrit sur votre table" Manrope 14px deep cocoa à 60%
  Input : height 56px, border 2px warm sand (#D7C3A5), focus border skylark gold (#C89B3C), text-align center, Cormorant Garamond 28px, placeholder "ex : 7"
  Bouton "Confirmer" : fond skylark gold (#C89B3C), texte dark olive smoke (#384038), pleine largeur, height 52px, Manrope 13px weight 600 letter-spacing 0.08em
  Animation d'entrée : scale 0.9 vers 1 + opacity 0 vers 1, 300ms ease-out

ENREGISTREMENT DE LA COMMANDE (en mode scan) :
Au clic du bouton WhatsApp dans CartDrawer (scanMode=true), conserver l'envoi WhatsApp ET enregistrer la commande :

function handleScanOrder(cartItems, note, tableNumber) {
  const order = {
    id: "order_" + Date.now(),
    tableNumber: localStorage.getItem("tableNumber") || "?",
    items: cartItems.map(i => ({ name: i.name, qty: i.qty, unitPrice: i.price, price: i.price * i.qty })),
    note: note || "",
    total: cartItems.reduce((s, i) => s + i.price * i.qty, 0),
    status: "pending",
    timestamp: Date.now(),
    statusUpdatedAt: Date.now()
  }
  const orders = getOrders()
  orders.push(order)
  saveOrders(orders)
  localStorage.setItem("legrm_last_order_id", order.id)
}

Message WhatsApp mode scan :
"Commande — Table [N] :\n[articles et quantités]\n\nTotal : [X] FCFA\n\nNote : [note]"

BLOC SUIVI COMMANDE (affiché sous la CategoryNav en mode scan) :
Visible uniquement si localStorage["legrm_last_order_id"] existe
Polling toutes les 3000ms + listener window storage event

Rendu selon le statut :
  pending    : fond champagne cream (#F3EBDD), Clock (lucide-react 20px dark olive smoke), "En attente de la cuisine" Manrope 14px
  preparing  : fond skylark gold (#C89B3C) à 15%, Flame (lucide-react 20px skylark gold (#C89B3C)), "En préparation..." Manrope 14px weight 600
  ready      : fond #25D366 à 15%, BellRing (lucide-react 20px #25D366), "Votre commande est prête !" Manrope 14px weight 700, box-shadow 0 0 0 8px #25D36630 animé pulse 1.5s infini
  served     : fond warm sand (#D7C3A5), CheckCircle (lucide-react 20px #25D366), "Commande servie. Bon appétit !" Manrope 14px + bouton "Nouvelle commande" qui efface localStorage["legrm_last_order_id"]


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VOLET 4 — INTERFACE BRIGADE (/cuisine)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUISINE_PASSWORD = "cuisine2025"  — constante hardcodée. IMPORTANT : changer avant tout déploiement.
Guard au chargement : si localStorage["cuisineAuth"] !== "true" → écran login
Login réussi : localStorage.setItem("cuisineAuth", "true")
Aucun lien vers /cuisine dans la navigation publique ni dans /admin.

ECRAN LOGIN CUISINE :
  Fond : dark olive smoke (#384038)
  Carte centrale : fond #1A2518, border-radius 12px, padding 40px, max-width 360px
  Titre : "Accès Cuisine" Manrope 16px weight 600 champagne cream (#F3EBDD)
  Input mot de passe : fond #0D1A0B, bordure dark olive smoke (#384038), texte champagne cream
  Bouton : fond skylark gold (#C89B3C), texte dark olive smoke (#384038), "Accéder à la cuisine"

TOPBAR CUISINE (fixe, hauteur 56px) :
  Fond : dark olive smoke (#384038)
  Gauche  : "CUISINE — SKYLARK" Manrope 13px weight 700 letter-spacing 0.12em champagne cream (#F3EBDD)
  Centre  : heure en temps réel HH:MM en Cormorant Garamond 28px champagne cream, mise à jour chaque seconde
  Droite  : badge fond skylark gold (#C89B3C) comptant les commandes actives (pending + preparing) + bouton Archive (lucide-react) + bouton LogOut (lucide-react)

NOTIFICATION SONORE — Web Audio API :
function playOrderBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = "sine"
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1)
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4)
  } catch {}
}
Double bip à l'arrivée de chaque nouvelle commande : playOrderBeep(); setTimeout(playOrderBeep, 250)

KANBAN 4 COLONNES :
Desktop : 4 colonnes égales avec séparateur 1px dark olive smoke (#384038) à 30%
Tablet : 2 colonnes, colonnes PRÊT + SERVI accessibles via scroll horizontal ou onglets

Headers de colonnes :
  EN ATTENTE    | Clock      (lucide-react 20px) | header fond #C89B3C (skylark gold) | texte dark olive smoke
  EN PREPARATION| Flame      (lucide-react 20px) | header fond #E8883A (sunset amber)  | texte blanc
  PRET          | BellRing   (lucide-react 20px) | header fond #25D366               | texte blanc
  SERVI         | CheckCircle(lucide-react 20px) | header fond #666666               | texte blanc

Badge dans chaque header : nombre de cards dans la colonne, fond blanc à 20%, Manrope 12px weight 700

ORDERCARD :
  Fond : #1A1208 (sombre riche)
  Bordure gauche : 3px solid [couleur du statut de la commande]
  Padding : 16px
  Margin bottom : 1px

  En-tête : "Table [N]" Cormorant Garamond 28px champagne cream (#F3EBDD) + heure relative Manrope 12px champagne cream à 50% (ex: "il y a 4 min")
  Indicateur durée (depuis timestamp) :
    Moins de 10 min : aucun style particulier
    10 à 20 min     : texte sunset amber (#D58C3B) — "Attente longue"
    Plus de 20 min  : texte rouge #E53935 — "URGENT"
  Liste articles : "2x Homard Grillé" Manrope 14px champagne cream (#F3EBDD) — sans les prix, un article par ligne
  Note cuisine (si note non vide) : fond #2A1E10, AlertCircle (lucide-react 14px skylark gold), texte Manrope 13px italic champagne cream à 80%
  Bouton d'action unique (pleine largeur, height 44px, border-radius 6px) :
    pending    → "Prendre en charge"  fond skylark gold (#C89B3C) texte dark olive smoke
    preparing  → "Commande prête"     fond #25D366 texte blanc
    ready      → "Marquer servie"     fond #444 texte champagne cream
    served     → aucun bouton, card légèrement grisée opacity 0.6

  Animation nouvelle card : entrée translateX -20px vers 0 + opacity 0 vers 1 en 400ms ease-out + flash fond skylark gold (#C89B3C) à 30% vers transparent en 1000ms

TOAST NOTIFICATIONS :
  Position : top-right, stack max 3, z-index 9999
  Fond : dark olive smoke (#384038), texte champagne cream (#F3EBDD), border-left 3px solid skylark gold (#C89B3C)
  Contenu : "Nouvelle commande — Table [N] · [nb] article(s)" Manrope 14px weight 500
  Auto-dismiss : 5s
  Entrée : translateX 100% vers 0 en 300ms ease-out
  Sortie : opacity 1 vers 0 en 200ms ease-in

ARCHIVAGE :
  Bouton "Archiver" dans la topbar : supprime les commandes "served" de plus de 2 heures de localStorage["legrm_orders"]

STRUCTURE DES DONNEES — clés localStorage :

  legrm_orders          : tableau JSON de toutes les commandes — écrit par /menu/scan, lu et modifié par /cuisine et /menu/scan
  legrm_last_order_id   : ID de la dernière commande du client — écrit et lu par /menu/scan
  cuisineAuth           : "true" si authentifié — écrit et lu par /cuisine
  tableNumber           : numéro de table saisi — écrit par /menu/scan, lu par /cuisine
  cart                  : panier actuel — écrit et lu par /menu et /menu/scan
  restaurantData        : données admin (plats, catégories, paramètres) — écrit par /admin, lu par toutes les pages

ORDER SCHEMA :
  id             : "order_" + Date.now()    (string unique)
  tableNumber    : string (saisi manuellement par le client)
  items          : [{ name, qty, unitPrice, price }]
  note           : string (peut être "")
  total          : number (FCFA)
  status         : "pending" | "preparing" | "ready" | "served"
  timestamp      : Date.now()
  statusUpdatedAt: Date.now()

CYCLE DES STATUTS : pending → preparing → ready → served (sens unique, pas de retour arrière)

FONCTIONS UTILITAIRES :
function getOrders() { try { return JSON.parse(localStorage.getItem("legrm_orders") || "[]") } catch { return [] } }
function saveOrders(orders) { localStorage.setItem("legrm_orders", JSON.stringify(orders)) }
function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders()
  const idx = orders.findIndex(o => o.id === orderId)
  if (idx !== -1) { orders[idx].status = newStatus; orders[idx].statusUpdatedAt = Date.now(); saveOrders(orders) }
}

LIMITE IMPORTANTE : ce système de synchronisation fonctionne entre onglets du même navigateur sur le même appareil. Si /cuisine est sur une tablette différente du téléphone du client, les commandes ne seront pas synchronisées en temps réel. Pour une synchronisation multi-appareil, intégrer Supabase Realtime en remplaçant getOrders() et saveOrders() par des subscriptions Supabase, sans changer la structure ORDER_SCHEMA.


— ANIMATIONS SYSTEME —

Scroll reveals globaux :
  Tous les éléments de section : translateY 24px vers 0 + opacity 0 vers 1, 650ms cubic-bezier(0.25, 0.46, 0.45, 0.94), IntersectionObserver threshold 0.15
  Stagger entre éléments d'un même groupe : 120ms

Transitions entre pages :
  Sortie : opacity 1 vers 0, 200ms ease-in
  Entrée : opacity 0 vers 1, 350ms ease-out, delay 50ms

Hover sur cards plats :
  box-shadow 0 4px 20px rgba(73,55,43,0.08) vers 0 12px 40px rgba(73,55,43,0.16), 250ms ease
  légère translation translateY 0 vers -2px, 250ms ease

Bottom sheet CartDrawer :
  Entrée : translateY 100% vers 0, 380ms cubic-bezier(0.32, 0.72, 0, 1)
  Sortie : translateY 0 vers 100%, 280ms cubic-bezier(0.72, 0, 0.68, 0.28)
  Overlay : opacity 0 vers 0.5, 380ms ease

Badge panier CartFab :
  Changement de chiffre : scale 1 vers 1.4 vers 1, 350ms spring (tension 400, friction 25)

TableModal :
  Entrée : scale 0.9 vers 1 + opacity 0 vers 1, 300ms ease-out

Bouton Plus dans MenuItemCard :
  scale 1 vers 1.25 vers 1, 300ms spring

CategoryNav pills :
  Transition background-color 200ms ease, couleur accent active

Navbar desktop :
  Au scroll : fond transparent vers champagne cream (#F3EBDD) + ombre bas apparaît, 250ms ease

Interdit : bounce excessif, élasticité visible, effets génériques de bibliothèque sans personnalisation, spinner rotatif dans l'interface publique


— TRAITEMENT DES IMAGES —

Traitement CSS global sur toutes les images publiques :
  filter: saturate(1.08) contrast(1.04)
  Pas de filtre supplémentaire sur les images de plats (garder la vérité gastronomique)

Overlays et gradients directionnels :
  Hero : dégradé vertical depuis dark olive smoke (#384038) à 0% opacity en haut jusqu'à dark olive smoke à 65% en bas — angle 180deg
  Sections profondes : overlay dark olive smoke (#384038) à 50% uniforme
  Cards lifestyle au hover : overlay dark olive smoke à 20%

Queries Unsplash recommandées par section :
  Hero                : "rooftop restaurant golden hour sunset warm light people"
  Notre univers       : "elegant restaurant interior warm evening light"
  Happy Moments       : "friends laughing restaurant table warm light", "couple dining romantic candlelight"
  Galerie ambiance    : "restaurant terrace evening atmosphere", "cocktail bar warm bokeh golden"
  Food                : "grilled fish plating warm light editorial", "chicken dish gastronomic"
  Cocktails           : "tropical cocktail glass golden hour bokeh close", "mojito fresh mint premium"
  Experience hero     : "restaurant interior design warm golden architecture"
  Contact             : "restaurant exterior warm evening glow city"


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMMENT UTILISER CE PROMPT
1. Copier l'intégralité du brief ci-dessus
2. Ouvrir Lovable (lovable.dev) et créer un nouveau projet
3. Coller dans le chat de l'agent et lancer la génération
4. Si le projet est trop long à générer en une fois : générer volet par volet
   — D'abord le site vitrine public (/, /experience, /menu, /galerie, /reservation, /contact)
   — Puis le dashboard admin (/admin)
   — Puis le menu scan (/menu/scan) avec le bloc suivi commande
   — Enfin la page cuisine (/cuisine) avec le Kanban
5. Tester /admin en tapant l'URL directement (pas de lien dans la nav)
6. Tester /menu/scan : le TableModal doit bloquer toute interaction avant saisie du numéro
7. Tester /cuisine : double bip sonore à chaque nouvelle commande de /menu/scan
8. Itérer section par section avec des instructions précises

INFORMATIONS À CONFIRMER AVANT MISE EN LIGNE :
  - Adresse exacte du restaurant Skylark à Lomé
  - Numéro WhatsApp format international +228XXXXXXXX
  - Horaires d'ouverture
  - Compte Instagram (@...)
  - Page Facebook (URL)
  - Intégration Google Maps (iframe embed)
  - ADMIN_PASSWORD "skylark2025" → changer avant déploiement
  - CUISINE_PASSWORD "cuisine2025" → changer avant déploiement
  - Données du menu (noms, descriptions, prix réels, disponibilités)
  - Photos réelles du restaurant à substituer aux images Unsplash

SYNCHRONISATION MULTI-APPAREIL (recommandation future) :
  Le système commande fonctionne entre onglets du même navigateur.
  Pour synchroniser /cuisine (tablette en cuisine) avec /menu/scan (téléphone du client) :
  Intégrer Supabase Realtime — remplacer getOrders() et saveOrders() par des subscriptions Supabase
  en conservant exactement le même ORDER_SCHEMA — aucun autre composant à modifier.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━