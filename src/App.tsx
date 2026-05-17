import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Home as HomeIcon,
  UtensilsCrossed,
  Sparkles,
  MapPin,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Hash,
  Clock,
  Phone,
  LogOut,
  Save,
  Pencil,
  CalendarDays,
  Users,
  Flame,
  BellRing,
  CheckCircle,
  Archive,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Copy,
  RotateCcw,
  Sparkle,
  Heart,
  Sun,
  X,
  AlertTriangle
} from 'lucide-react';
import {
  getRestaurantData,
  saveRestaurantData,
  getOrders,
  saveOrders,
  updateOrderStatus,
  playDoubleBeep
} from './utils';
import type { MenuItem, RestaurantData, Order } from './utils';

// Pixel-perfect Lucide-like custom inline SVGs for Instagram and Facebook
const Instagram = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// -------------------------------------------------------------
// APP ROUTING & CORE ENTRY
// -------------------------------------------------------------

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [loading, setLoading] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);
  const [db, setDb] = useState<RestaurantData>(getRestaurantData());
  const [cart, setCart] = useState<{ [itemId: string]: number }>(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "{}");
    } catch {
      return {};
    }
  });

  // Listen to path changes from custom navigation clicks
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushstate-navigation", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate-navigation", handleLocationChange);
    };
  }, []);

  // Sync DB updates across components/tabs
  useEffect(() => {
    const handleDbChange = () => {
      setDb(getRestaurantData());
    };
    window.addEventListener("restaurantDataChanged", handleDbChange);
    return () => {
      window.removeEventListener("restaurantDataChanged", handleDbChange);
    };
  }, []);

  // Premium loading screen logic (Minimum 1s loader, then 400ms fade)
  useEffect(() => {
    const minLoadTimer = setTimeout(() => {
      setFadeLoader(true);
      const fadeTimer = setTimeout(() => {
        setLoading(false);
      }, 400);
      return () => clearTimeout(fadeTimer);
    }, 1200);

    return () => clearTimeout(minLoadTimer);
  }, []);

  // Persistent cart logic
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Navigate utility
  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("pushstate-navigation"));
  };

  // Cart operations
  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const copy = { ...prev };
      if (copy[itemId] > 1) {
        copy[itemId]--;
      } else {
        delete copy[itemId];
      }
      return copy;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const deleteFromCart = (itemId: string) => {
    setCart(prev => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  return (
    <>
      {/* 1. Loader Screen */}
      {(loading || !fadeLoader) && (
        <div className={`loader-overlay ${fadeLoader ? 'fade-out' : ''}`}>
          <div className="loader-title">SKYLARK</div>
          <div className="loader-line" />
        </div>
      )}

      {/* 2. Page Transitions & Layout Wrapper */}
      <div className="app-container" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        
        {/* Render Navbar only on non-cuisine page */}
        {currentPath !== "/cuisine" && (
          <>
            <Navbar currentPath={currentPath} navigate={navigate} />
            {currentPath !== "/menu/scan" && (
              <MobileBottomNav currentPath={currentPath} navigate={navigate} />
            )}
          </>
        )}

        {/* 3. Page Routing Switch */}
        <main style={{ flexGrow: 1, paddingBottom: currentPath !== "/cuisine" ? "64px" : "0" }} className="page-transition">
          {(() => {
            switch (currentPath) {
              case "/":
                return <Home db={db} navigate={navigate} />;
              case "/experience":
                return <Experience db={db} />;
              case "/menu":
                return (
                  <Menu
                    db={db}
                    cart={cart}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    deleteFromCart={deleteFromCart}
                    scanMode={false}
                  />
                );
              case "/menu/scan":
                return (
                  <Menu
                    db={db}
                    cart={cart}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    clearCart={clearCart}
                    deleteFromCart={deleteFromCart}
                    scanMode={true}
                  />
                );
              case "/galerie":
                return <Galerie />;
              case "/reservation":
                return <Reservation db={db} />;
              case "/contact":
                return <Contact db={db} />;
              case "/admin":
                return <Admin db={db} onDbUpdate={setDb} />;
              case "/cuisine":
                return <Cuisine />;
              default:
                return <Home db={db} navigate={navigate} />;
            }
          })()}
        </main>

        {/* 4. Elegant Footer */}
        {currentPath !== "/cuisine" && currentPath !== "/admin" && (
          <Footer db={db} navigate={navigate} />
        )}
      </div>
    </>
  );
}

// -------------------------------------------------------------
// HELPER: SCROLL TRIGGER COMPONENT FOR REVEAL ANIMATIONS
// -------------------------------------------------------------
function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => {
      if (domRef.current) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`reveal-element ${isVisible ? "active" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// -------------------------------------------------------------
// UNIVERSAL COMPONENT: NAVBAR (DESKTOP)
// -------------------------------------------------------------
function Navbar({ currentPath, navigate }: { currentPath: string; navigate: (path: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const isScanMode = currentPath === "/menu/scan";
  const [tableNumber, setTableNumber] = useState(() => localStorage.getItem("tableNumber") || "");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    const checkTable = () => {
      setTableNumber(localStorage.getItem("tableNumber") || "");
    };
    window.addEventListener("storage", checkTable);
    window.addEventListener("tableNumberChanged", checkTable);
    const interval = setInterval(checkTable, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkTable);
      window.removeEventListener("tableNumberChanged", checkTable);
      clearInterval(interval);
    };
  }, []);

  if (isScanMode) {
    return (
      <nav className="desktop-navbar scrolled scan-navbar" style={{ justifyContent: "space-between", height: "70px", padding: "0 24px" }}>
        <div className="nav-logo" style={{ cursor: "default", pointerEvents: "none", color: "var(--bg-olive)" }}>
          SKYLARK
        </div>
        <div style={{
          backgroundColor: "var(--accent-gold)",
          color: "var(--bg-olive)",
          padding: "6px 16px",
          borderRadius: "50px",
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 700,
          letterSpacing: "0.05em",
          boxShadow: "0 4px 12px rgba(197, 160, 89, 0.2)",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          <Hash size={14} />
          TABLE {tableNumber || "..."}
        </div>
      </nav>
    );
  }

  return (
    <nav className={`desktop-navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Left side links */}
      <div className="nav-group">
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
          className={`nav-link ${currentPath === "/" ? "active" : ""}`}
        >
          Accueil
        </a>
        <a
          href="/menu"
          onClick={(e) => { e.preventDefault(); navigate("/menu"); }}
          className={`nav-link ${currentPath === "/menu" ? "active" : ""}`}
        >
          Menu Digital
        </a>
        <a
          href="/experience"
          onClick={(e) => { e.preventDefault(); navigate("/experience"); }}
          className={`nav-link ${currentPath === "/experience" ? "active" : ""}`}
        >
          L'Expérience
        </a>
      </div>

      {/* Centered Logo */}
      <div className="nav-logo" onClick={() => navigate("/")}>
        SKYLARK
      </div>

      {/* Right side links */}
      <div className="nav-group">
        <a
          href="/galerie"
          onClick={(e) => { e.preventDefault(); navigate("/galerie"); }}
          className={`nav-link ${currentPath === "/galerie" ? "active" : ""}`}
        >
          Galerie
        </a>
        <a
          href="/reservation"
          onClick={(e) => { e.preventDefault(); navigate("/reservation"); }}
          className={`nav-link ${currentPath === "/reservation" ? "active" : ""}`}
        >
          Réservations
        </a>
        <a
          href="/contact"
          onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
          className={`nav-link ${currentPath === "/contact" ? "active" : ""}`}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}

// -------------------------------------------------------------
// UNIVERSAL COMPONENT: MOBILE BOTTOM NAV
// -------------------------------------------------------------
function MobileBottomNav({ currentPath, navigate }: { currentPath: string; navigate: (path: string) => void }) {
  return (
    <div className="mobile-bottom-nav">
      <a
        href="/"
        onClick={(e) => { e.preventDefault(); navigate("/"); }}
        className={`mobile-nav-item ${currentPath === "/" ? "active" : ""}`}
      >
        <HomeIcon size={20} strokeWidth={1.5} />
        <span>Accueil</span>
      </a>
      <a
        href="/menu"
        onClick={(e) => { e.preventDefault(); navigate("/menu"); }}
        className={`mobile-nav-item ${currentPath.startsWith("/menu") ? "active" : ""}`}
      >
        <UtensilsCrossed size={20} strokeWidth={1.5} />
        <span>Menu</span>
      </a>
      <a
        href="/experience"
        onClick={(e) => { e.preventDefault(); navigate("/experience"); }}
        className={`mobile-nav-item ${currentPath === "/experience" ? "active" : ""}`}
      >
        <Sparkles size={20} strokeWidth={1.5} />
        <span>Expérience</span>
      </a>
      <a
        href="/contact"
        onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
        className={`mobile-nav-item ${currentPath === "/contact" ? "active" : ""}`}
      >
        <MapPin size={20} strokeWidth={1.5} />
        <span>Contact</span>
      </a>
    </div>
  );
}

// -------------------------------------------------------------
// UNIVERSAL COMPONENT: FOOTER
// -------------------------------------------------------------
function Footer({ db, navigate }: { db: RestaurantData; navigate: (path: string) => void }) {
  const currentYear = new Date().getFullYear();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Bonjour Skylark ! Je souhaite avoir des informations sur vos disponibilités ce soir.");
    window.open(`https://wa.me/${db.settings.whatsapp.replace(/\+/g, "")}?text=${message}`, "_blank");
  };

  return (
    <footer style={{ backgroundColor: "var(--bg-olive)", color: "var(--bg-champagne)", borderTop: "1px solid rgba(215, 195, 165, 0.15)" }}>
      <div className="section-padding" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "60px" }}>
        
        {/* Col 1: Identity */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 300, color: "var(--bg-champagne)", letterSpacing: "0.08em" }}>SKYLARK</h3>
          <p className="text-italic-quote" style={{ fontSize: "14px", color: "var(--accent-amber)" }}>
            “ {db.settings.tagline} ”
          </p>
          <div style={{ width: "40px", height: "1px", backgroundColor: "var(--accent-gold)", marginTop: "12px" }} />
        </div>

        {/* Col 2: Navigation Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bg-sand)" }}>
            LIENS
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
            {["Accueil", "L'Expérience", "Menu Digital", "Galerie", "Réservations", "Contact"].map((label, idx) => {
              const paths = ["/", "/experience", "/menu", "/galerie", "/reservation", "/contact"];
              return (
                <a
                  key={idx}
                  href={paths[idx]}
                  onClick={(e) => { e.preventDefault(); navigate(paths[idx]); }}
                  style={{ color: "rgba(243, 235, 221, 0.75)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243, 235, 221, 0.75)")}
                >
                  {label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Col 3: Contact details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bg-sand)" }}>
            NOUS TROUVER
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px", color: "rgba(243, 235, 221, 0.8)" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <MapPin size={16} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "3px" }} />
              <span>{db.settings.address}</span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <Clock size={16} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "3px" }} />
              <span style={{ whiteSpace: "pre-line" }}>{db.settings.hours}</span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Phone size={16} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
              <span>{db.settings.whatsapp}</span>
            </div>
          </div>
        </div>

        {/* Col 4: Social media & WhatsApp button */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--bg-sand)" }}>
            SUIVEZ-NOUS
          </h4>
          <div style={{ display: "flex", gap: "16px" }}>
            <a
              href={db.settings.instagram}
              target="_blank"
              rel="noreferrer"
              style={{ color: "rgba(243, 235, 221, 0.6)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243, 235, 221, 0.6)")}
            >
              <Instagram size={20} />
            </a>
            <a
              href={db.settings.facebook}
              target="_blank"
              rel="noreferrer"
              style={{ color: "rgba(243, 235, 221, 0.6)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243, 235, 221, 0.6)")}
            >
              <Facebook size={20} />
            </a>
          </div>
          <button
            onClick={handleWhatsAppClick}
            className="btn-primary"
            style={{
              padding: "12px 20px",
              fontSize: "12px",
              width: "100%",
              marginTop: "4px"
            }}
          >
            <MessageCircle size={16} />
            Écrire sur WhatsApp
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.15)", padding: "20px 0", textAlign: "center", fontSize: "12px", color: "rgba(243, 235, 221, 0.4)" }}>
        Skylark Restaurant · Lomé, Togo · © {currentYear} · Tous droits réservés
      </div>
    </footer>
  );
}

// -------------------------------------------------------------
// PAGE: / (HOME)
// -------------------------------------------------------------
function Home({ db, navigate }: { db: RestaurantData; navigate: (path: string) => void }) {
  
  // Testimonials Carousel Autoplay
  const testimonials = [
    {
      text: "Une expérience inoubliable. Le service est impeccable, les plats sont raffinés et l'ambiance est exactement ce qu'on cherche quand on veut une belle soirée à Lomé.",
      name: "Kofi A.",
      occasion: "Dîner romantique"
    },
    {
      text: "Skylark m'a réconcilié avec l'idée de sortir en famille. Tout le monde y trouve son bonheur, et la qualité est constante.",
      name: "Ama D.",
      occasion: "Repas en famille"
    },
    {
      text: "Le meilleur cocktail de Lomé, sans discussion. Et le service sourit vraiment.",
      name: "Jean-Paul K.",
      occasion: "Entre amis"
    },
    {
      text: "Business dinner parfait. Cadre premium, discrétion du staff, cuisine mémorable. Je recommande à tous mes partenaires.",
      name: "Ibrahim S.",
      occasion: "Business dinner"
    }
  ];

  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Quick Reservation Handler
  const [quickForm, setQuickForm] = useState({
    date: "",
    time: "20:00",
    guests: "2",
    occasion: "Dîner romantique",
    name: "",
    phone: ""
  });

  const handleQuickBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.phone || !quickForm.date) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }
    const msg = `Bonjour Skylark, je souhaite réserver une table pour ${quickForm.guests} personnes le ${quickForm.date} à ${quickForm.time} — Occasion : ${quickForm.occasion}. Nom : ${quickForm.name}. Tel : ${quickForm.phone}.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${db.settings.whatsapp.replace(/\+/g, "")}?text=${encoded}`, "_blank");
  };

  // Filter out only signature dishes
  const signatures = useMemo(() => {
    return db.items.filter(item => item.category === "Plats Signature" && item.available);
  }, [db.items]);

  return (
    <div>
      {/* SECTION 1: HERO IMMERSIVE */}
      <div style={{
        height: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "var(--bg-olive)",
        overflow: "hidden"
      }}>
        {/* Background Image with elegant tone */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1
        }} className="image-filter-lifestyle" />

        {/* Double layered overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, rgba(56,64,56,0.3) 0%, rgba(56,64,56,0.7) 100%)",
          zIndex: 2
        }} />
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(213, 140, 59, 0.08)", // sunset amber tint
          zIndex: 3
        }} />

        {/* Hero Content */}
        <div style={{
          position: "relative",
          zIndex: 4,
          maxWidth: "800px",
          padding: "0 24px",
          marginTop: "-5vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "rgba(243,235,221,0.75)",
            textTransform: "uppercase",
            marginBottom: "8px"
          }}>LOMÉ, TOGO</p>

          <div style={{ width: "60px", height: "1px", backgroundColor: "var(--accent-gold)", margin: "12px 0 20px" }} />

          <h1 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(44px, 7vw, 80px)",
            fontWeight: 300,
            color: "var(--bg-champagne)",
            lineHeight: 1.1,
            textShadow: "0 2px 40px rgba(0,0,0,0.3)",
            marginBottom: "12px"
          }}>
            We Serve Happiness
          </h1>

          <p className="text-italic-quote" style={{
            fontSize: "clamp(18px, 3vw, 24px)",
            color: "var(--bg-sand)",
            marginBottom: "36px"
          }}>
            Dining Above Ordinary
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <button className="btn-primary" onClick={() => navigate("/reservation")}>
              Réserver une table
            </button>
            <button className="btn-secondary" onClick={() => navigate("/menu")}>
              Découvrir le menu
            </button>
          </div>
        </div>

        {/* Chevron down animation */}
        <div style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          animation: "floatChevron 2s ease-in-out infinite",
          color: "rgba(243, 235, 221, 0.5)",
          cursor: "pointer"
        }} onClick={() => {
          const next = document.getElementById("notre-univers");
          next?.scrollIntoView({ behavior: "smooth" });
        }}>
          <ChevronDown size={28} />
        </div>

        <style>{`
          @keyframes floatChevron {
            0%, 100% { transform: translate(-50%, 0); }
            50% { transform: translate(-50%, -8px); }
          }
        `}</style>
      </div>

      {/* SECTION 2: NOTRE UNIVERS */}
      <section id="notre-univers" className="section-padding" style={{ backgroundColor: "var(--bg-champagne)" }}>
        <ScrollReveal>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "80px",
            alignItems: "center"
          }}>
            {/* Left side text */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "var(--accent-gold)",
                textTransform: "uppercase"
              }}>L'ESPRIT DU LIEU</p>

              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(32px, 4vw, 44px)",
                color: "var(--text-cocoa)",
                lineHeight: 1.2
              }}>
                Un endroit où les bons moments deviennent des souvenirs.
              </h2>

              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                lineHeight: 1.8,
                color: "var(--text-cocoa)"
              }}>
                Skylark n'est pas un restaurant ordinaire. C'est une parenthèse lumineuse au cœur de Lomé — un espace pensé pour que chaque repas soit une expérience, chaque tablée soit un souvenir, chaque instant soit vécu pleinement. La cuisine est généreuse, le service est attentif, l'ambiance est celle d'un soir parfait.
              </p>

              {/* Metrics */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                marginTop: "16px",
                flexWrap: "wrap"
              }}>
                <div>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", color: "var(--accent-gold)" }}>45+</h4>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Tables</p>
                </div>
                <div style={{ width: "1px", height: "40px", backgroundColor: "var(--bg-sand)" }} />
                <div>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", color: "var(--accent-gold)" }}>Chaque</h4>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Soirée unique</p>
                </div>
                <div style={{ width: "1px", height: "40px", backgroundColor: "var(--bg-sand)" }} />
                <div>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", color: "var(--accent-gold)" }}>2025</h4>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Depuis toujours</p>
                </div>
              </div>
            </div>

            {/* Right side image */}
            <div>
              <div style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                aspectRatio: "4/5",
                borderRadius: "4px",
                boxShadow: "0 20px 60px rgba(56, 64, 56, 0.15)"
              }} className="image-filter-lifestyle" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 3: SIGNATURE DISHES */}
      <section style={{ backgroundColor: "var(--bg-sand)", padding: "120px 0" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "60px", padding: "0 24px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 5vw, 52px)", color: "var(--text-cocoa)" }}>
              Nos Plats Signature
            </h2>
            <p className="text-italic-quote" style={{ fontSize: "20px", color: "var(--accent-amber)", marginTop: "8px" }}>
              Taste Elevated.
            </p>
            <div className="title-accent-line" />
          </div>

          {/* Cards slider */}
          <div className="no-scrollbar" style={{
            display: "flex",
            overflowX: "auto",
            gap: "24px",
            padding: "0 80px 40px",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch"
          }}>
            {signatures.map((dish, index) => (
              <div
                key={index}
                style={{
                  minWidth: "320px",
                  maxWidth: "380px",
                  flex: "0 0 100%",
                  scrollSnapAlign: "center",
                  backgroundColor: "var(--color-white, #FFFFFF)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(73, 55, 43, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "var(--transition-smooth)"
                }}
                className="signature-card-hover"
              >
                {/* Image */}
                <div style={{ overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 400ms ease" }}
                    className="dish-zoom-hover"
                  />
                  {dish.badge && (
                    <div style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      backgroundColor: "var(--accent-gold)",
                      color: "var(--bg-olive)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "2px"
                    }}>
                      {dish.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 500, color: "var(--text-cocoa)" }}>
                    {dish.name}
                  </h3>
                  <p style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color: "rgba(73, 55, 43, 0.7)",
                    flexGrow: 1
                  }}>
                    {dish.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "between", alignItems: "center", marginTop: "12px" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700, color: "var(--accent-gold)" }}>
                      {dish.price.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  <a
                    href="/menu"
                    onClick={(e) => { e.preventDefault(); navigate("/menu"); }}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--accent-gold)",
                      marginTop: "16px",
                      alignSelf: "flex-start",
                      borderBottom: "1px solid transparent"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "var(--accent-gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
                  >
                    Voir le menu
                  </a>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <style>{`
          .dish-zoom-hover:hover { transform: scale(1.03); }
          .signature-card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(73,55,43,0.15) !important;
          }
          @media (max-width: 768px) {
            .no-scrollbar { padding: 0 24px 20px !important; }
          }
        `}</style>
      </section>

      {/* SECTION 4: HAPPY MOMENTS */}
      <section style={{ backgroundColor: "var(--bg-olive)", padding: "120px 0", color: "var(--bg-champagne)" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "60px", padding: "0 24px" }}>
            <div style={{ width: "40%", height: "1px", backgroundColor: "var(--accent-gold)", margin: "0 auto 24px" }} />
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 5vw, 56px)", color: "var(--bg-champagne)" }}>
              Happy Moments
            </h2>
            <p className="text-italic-quote" style={{ fontSize: "22px", color: "var(--accent-amber)", marginTop: "12px" }}>
              More Than Food, A Feeling.
            </p>
          </div>

          {/* Mosaic Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            padding: "0 80px"
          }}>
            {/* Img 1 */}
            <div className="mosaic-item" style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: "3/4",
              borderRadius: "4px"
            }} />
            {/* Img 2 */}
            <div className="mosaic-item" style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1529516548873-9ce57c8f155e?auto=format&fit=crop&w=600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: "1/1",
              borderRadius: "4px"
            }} />
            {/* Img 3 */}
            <div className="mosaic-item" style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: "16/9",
              borderRadius: "4px"
            }} />
            {/* Img 4 */}
            <div className="mosaic-item" style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: "3/4",
              borderRadius: "4px"
            }} />
          </div>
        </ScrollReveal>
        <style>{`
          .mosaic-item {
            transition: var(--transition-smooth);
            filter: saturate(1.1) contrast(1.05);
            position: relative;
          }
          .mosaic-item::after {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-color: var(--bg-olive);
            opacity: 0;
            transition: opacity 300ms ease;
          }
          .mosaic-item:hover::after { opacity: 0.2; }
          @media (max-width: 768px) {
            .mosaic-item { aspect-ratio: 4/3 !important; }
            section div[style*="padding: 0 80px"] { padding: 0 24px !important; }
          }
        `}</style>
      </section>

      {/* SECTION 5: GALERIE LIFESTYLE PREVIEW */}
      <section style={{ backgroundColor: "var(--bg-champagne)", padding: "120px 0" }}>
        <ScrollReveal>
          <div style={{ display: "flex", overflowX: "auto", gap: "16px", padding: "0 40px 40px" }} className="no-scrollbar">
            {[
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
              "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
              "https://images.unsplash.com/photo-1528605248644-14dd04022da1",
              "https://images.unsplash.com/photo-1559339352-11d035aa65de",
              "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f"
            ].map((imgUrl, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: "260px",
                  height: "360px",
                  backgroundImage: `url('${imgUrl}?auto=format&fit=crop&w=600&q=80')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "4px",
                  transition: "var(--transition-smooth)"
                }}
                className="gallery-preview-item"
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <button className="btn-secondary" style={{ color: "var(--text-cocoa)", borderColor: "var(--bg-sand)" }} onClick={() => navigate("/galerie")}>
              Voir toute la galerie
            </button>
          </div>
        </ScrollReveal>
        <style>{`
          .gallery-preview-item:hover {
            transform: scale(1.04);
          }
          @media (max-width: 768px) {
            .no-scrollbar { padding: 0 24px 20px !important; }
          }
        `}</style>
      </section>

      {/* SECTION 6: RESERVATION RAPIDE */}
      <section style={{ background: "linear-gradient(to bottom, var(--bg-sand), var(--bg-champagne))", padding: "120px 80px" }}>
        <ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", alignItems: "center" }}>
            {/* Left Column */}
            <div>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "48px", color: "var(--text-cocoa)" }}>
                Réserver votre table
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", color: "var(--text-cocoa)", marginTop: "16px", lineHeight: 1.6 }}>
                Une soirée parfaite commence par une réservation. Entrez vos informations pour planifier votre venue dans l'ambiance chaleureuse de Skylark.
              </p>
            </div>

            {/* Right Column Form */}
            <form
              onSubmit={handleQuickBookingSubmit}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "12px",
                boxShadow: "0 8px 40px rgba(56, 64, 56, 0.1)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}
            >
              {/* Row 1 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                    Date
                  </label>
                  <div style={{ position: "relative" }}>
                    <CalendarDays size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--accent-gold)" }} />
                    <input
                      type="date"
                      required
                      value={quickForm.date}
                      onChange={(e) => setQuickForm({ ...quickForm, date: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "14px 16px 14px 40px",
                        border: "1px solid var(--bg-sand)",
                        borderRadius: "6px",
                        fontSize: "14px",
                        backgroundColor: "var(--bg-champagne)",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                    Heure
                  </label>
                  <div style={{ position: "relative" }}>
                    <Clock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--accent-gold)" }} />
                    <select
                      value={quickForm.time}
                      onChange={(e) => setQuickForm({ ...quickForm, time: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "14px 16px 14px 40px",
                        border: "1px solid var(--bg-sand)",
                        borderRadius: "6px",
                        fontSize: "14px",
                        backgroundColor: "var(--bg-champagne)",
                        outline: "none"
                      }}
                    >
                      {["12:00", "13:00", "19:00", "20:00", "21:00", "22:00"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                    Nombre de personnes
                  </label>
                  <div style={{ position: "relative" }}>
                    <Users size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--accent-gold)" }} />
                    <select
                      value={quickForm.guests}
                      onChange={(e) => setQuickForm({ ...quickForm, guests: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "14px 16px 14px 40px",
                        border: "1px solid var(--bg-sand)",
                        borderRadius: "6px",
                        fontSize: "14px",
                        backgroundColor: "var(--bg-champagne)",
                        outline: "none"
                      }}
                    >
                      {Array.from({ length: 15 }, (_, i) => String(i + 1)).map(n => (
                        <option key={n} value={n}>{n} personne{Number(n) > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                    Occasion
                  </label>
                  <div style={{ position: "relative" }}>
                    <Sparkles size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--accent-gold)" }} />
                    <select
                      value={quickForm.occasion}
                      onChange={(e) => setQuickForm({ ...quickForm, occasion: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "14px 16px 14px 40px",
                        border: "1px solid var(--bg-sand)",
                        borderRadius: "6px",
                        fontSize: "14px",
                        backgroundColor: "var(--bg-champagne)",
                        outline: "none"
                      }}
                    >
                      {["Dîner classique", "Dîner romantique", "Anniversaire", "Business dinner", "Repas en famille", "Entre amis"].map(occ => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                    Votre Nom
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Ama"
                    value={quickForm.name}
                    onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      border: "1px solid var(--bg-sand)",
                      borderRadius: "6px",
                      fontSize: "14px",
                      backgroundColor: "var(--bg-champagne)",
                      outline: "none"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ex: +228 90..."
                    value={quickForm.phone}
                    onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      border: "1px solid var(--bg-sand)",
                      borderRadius: "6px",
                      fontSize: "14px",
                      backgroundColor: "var(--bg-champagne)",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", height: "52px", marginTop: "10px" }}>
                Confirmer la réservation
              </button>
            </form>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 7: TEMOIGNAGES */}
      <section style={{ backgroundColor: "var(--bg-champagne)", padding: "120px 0" }}>
        <ScrollReveal>
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "48px", color: "var(--text-cocoa)" }}>
              Ce qu'ils disent de nous
            </h2>
            <div className="title-accent-line" />
          </div>

          <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <div style={{
              backgroundColor: "rgba(215, 195, 165, 0.4)",
              borderRadius: "8px",
              padding: "48px 32px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              transition: "opacity 300ms ease"
            }}>
              <p className="text-italic-quote" style={{ fontSize: "22px", color: "var(--text-cocoa)", lineHeight: 1.7 }}>
                “ {testimonials[activeReview].text} ”
              </p>
              <div>
                <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600, color: "var(--bg-olive)" }}>
                  {testimonials[activeReview].name}
                </h4>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--accent-gold)", marginTop: "4px" }}>
                  {testimonials[activeReview].occasion}
                </p>
              </div>
            </div>

            {/* Slider Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "24px" }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: activeReview === idx ? "var(--accent-gold)" : "rgba(200, 155, 60, 0.3)",
                    cursor: "pointer",
                    transition: "var(--transition-smooth)"
                  }}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// PAGE: /experience (THE SKYLARK EXPERIENCE)
// -------------------------------------------------------------
function Experience({ db }: { db: RestaurantData }) {
  return (
    <div>
      {/* Hero */}
      <div style={{
        height: "70vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "var(--bg-olive)"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('https://images.unsplash.com/photo-1485686531765-ba63b07845a7?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.45,
          zIndex: 1
        }} className="image-filter-lifestyle" />
        <div style={{ position: "relative", zIndex: 2, padding: "0 24px" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(40px, 6vw, 72px)", color: "var(--bg-champagne)" }}>
            The Skylark Experience
          </h1>
          <p className="text-italic-quote" style={{ fontSize: "24px", color: "var(--accent-amber)", marginTop: "12px" }}>
            {db.settings.tagline}
          </p>
        </div>
      </div>

      {/* Philosophy */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-champagne)" }}>
        <ScrollReveal>
          <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", gap: "20px" }}>
            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "var(--accent-gold)",
              textTransform: "uppercase"
            }}>NOTRE PHILOSOPHIE</p>

            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(32px, 4vw, 48px)", color: "var(--text-cocoa)", lineHeight: 1.2 }}>
              Nous ne servons pas simplement à manger.
            </h2>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              lineHeight: 1.8,
              color: "var(--text-cocoa)"
            }}>
              Skylark est né d'une conviction simple : un bon repas peut transformer une soirée ordinaire en souvenir de toute une vie. Notre cuisine est généreuse, notre service est sincère, et notre maison est conçue pour que vous vous y sentiez bien. Chaque plat sort d'une cuisine portée par la passion, chaque table est dressée avec le soin qu'un hôte apporte à ses invités les plus précieux.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Three Value Pillars */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-sand)" }}>
        <ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
            
            {/* Pillar 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", textAlign: "center" }}>
              <div style={{ color: "var(--accent-gold)" }}>
                <Sparkle size={32} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "var(--text-cocoa)" }}>
                L'Excellence Discrète
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.6, color: "rgba(73, 55, 43, 0.85)" }}>
                Ici, la qualité ne se vante pas. Elle se ressent à la première bouchée, au premier sourire de notre équipe.
              </p>
            </div>

            {/* Pillar 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", textAlign: "center" }}>
              <div style={{ color: "var(--accent-gold)" }}>
                <Heart size={32} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "var(--text-cocoa)" }}>
                L'Hospitalité Sincère
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.6, color: "rgba(73, 55, 43, 0.85)" }}>
                Chaque client qui franchit notre porte est un invité. Notre service est attentif parce qu'il est humain.
              </p>
            </div>

            {/* Pillar 3 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", textAlign: "center" }}>
              <div style={{ color: "var(--accent-gold)" }}>
                <Sun size={32} strokeWidth={1.5} />
              </div>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "var(--text-cocoa)" }}>
                L'Expérience Avant Tout
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", lineHeight: 1.6, color: "rgba(73, 55, 43, 0.85)" }}>
                Nous pensons chaque détail — la lumière, la musique, la carte — pour que vous repartiez avec l'envie de revenir.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Chef Section */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-champagne)" }}>
        <ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", alignItems: "center" }}>
            <div style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              aspectRatio: "4/3",
              borderRadius: "6px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
            }} className="image-filter-lifestyle" />
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "40px", color: "var(--text-cocoa)" }}>
                La cuisine, au cœur de tout.
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "16px", lineHeight: 1.8, color: "var(--text-cocoa)" }}>
                Notre cuisine est guidée par les saisons, le respect des saveurs locales du Togo et l'audace créative de notre brigade culinaire. Nous sélectionnons nos produits directement auprès de maraîchers locaux et des pêcheurs du port de Lomé pour s'assurer que chaque ingrédient qui entre en cuisine porte la vérité du terroir.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Atmospheric Gallery */}
      <section style={{ backgroundColor: "var(--bg-olive)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", height: "350px", overflow: "hidden" }}>
        {[
          "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
          "https://images.unsplash.com/photo-1559339352-11d035aa65de"
        ].map((url, idx) => (
          <div
            key={idx}
            style={{
              backgroundImage: `url('${url}?auto=format&fit=crop&w=600&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              width: "100%"
            }}
            className="image-filter-lifestyle"
          />
        ))}
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// PAGE: /menu & /menu/scan (MENU DIGITAL)
// -------------------------------------------------------------
interface MenuProps {
  db: RestaurantData;
  cart: { [itemId: string]: number };
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  deleteFromCart: (itemId: string) => void;
  scanMode: boolean;
}

function Menu({ db, cart, addToCart, removeFromCart, clearCart, deleteFromCart, scanMode }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState(db.categories[0] || "");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [note, setNote] = useState("");

  // Table number state for scan mode
  const [tableNumber, setTableNumber] = useState(() => {
    return localStorage.getItem("tableNumber") || "";
  });
  const [showTableModal, setShowTableModal] = useState(scanMode && !localStorage.getItem("tableNumber"));

  // Last order monitoring
  const [lastOrderId, setLastOrderId] = useState(() => {
    return localStorage.getItem("legrm_last_order_id") || "";
  });
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Poll orders status every 3000ms
  useEffect(() => {
    if (!lastOrderId) return;
    const fetchOrder = () => {
      const orders = getOrders();
      const match = orders.find(o => o.id === lastOrderId);
      if (match) {
        setLastOrder(match);
      }
    };
    fetchOrder();
    const interval = setInterval(fetchOrder, 3000);
    return () => clearInterval(interval);
  }, [lastOrderId]);

  // Sync listener on order updates (storage events)
  useEffect(() => {
    const handleStorageUpdate = () => {
      const currentLastId = localStorage.getItem("legrm_last_order_id") || "";
      setLastOrderId(currentLastId);
      if (currentLastId) {
        const orders = getOrders();
        const match = orders.find(o => o.id === currentLastId);
        if (match) setLastOrder(match);
      } else {
        setLastOrder(null);
      }
    };
    window.addEventListener("storage", handleStorageUpdate);
    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, []);

  const handleTableConfirm = (num: string) => {
    if (!num.trim()) return;
    localStorage.setItem("tableNumber", num);
    setTableNumber(num);
    setShowTableModal(false);
  };

  const handleNewOrderClick = () => {
    localStorage.removeItem("legrm_last_order_id");
    setLastOrderId("");
    setLastOrder(null);
  };

  // Categories items calculations
  const itemsByCategory = useMemo(() => {
    return db.items.reduce((acc, item) => {
      if (!item.available) return acc;
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as { [cat: string]: MenuItem[] });
  }, [db.items]);

  const activeCategoryItems = itemsByCategory[activeCategory] || [];

  // Cart values calculations
  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartDetailedList = useMemo(() => {
    return Object.entries(cart).map(([itemId, qty]) => {
      const match = db.items.find(i => i.id === itemId);
      return { item: match, qty };
    }).filter(d => d.item !== undefined) as { item: MenuItem; qty: number }[];
  }, [cart, db.items]);

  const cartTotalAmount = cartDetailedList.reduce((acc, d) => acc + (d.item.price * d.qty), 0);

  // Triggered on Order submit
  const handleOrderSubmit = () => {
    if (cartDetailedList.length === 0) return;

    // Send WhatsApp structured message
    let orderDetailsText = "";
    cartDetailedList.forEach(d => {
      orderDetailsText += `- ${d.qty}x ${d.item.name} (${(d.item.price * d.qty).toLocaleString("fr-FR")} FCFA)\n`;
    });

    const header = scanMode
      ? `Commande — Table ${tableNumber} :\n`
      : `Bonjour Skylark ! Je souhaite commander :\n`;

    const notePart = note.trim() ? `\nNote : ${note}\n` : "";
    const msg = `${header}${orderDetailsText}\nTotal : ${cartTotalAmount.toLocaleString("fr-FR")} FCFA${notePart}`;
    const encodedMsg = encodeURIComponent(msg);

    // Save in command history database if scanMode is true
    if (scanMode) {
      const newOrder: Order = {
        id: "order_" + Date.now(),
        tableNumber: tableNumber,
        items: cartDetailedList.map(d => ({
          name: d.item.name,
          qty: d.qty,
          unitPrice: d.item.price,
          price: d.item.price * d.qty
        })),
        note: note,
        total: cartTotalAmount,
        status: "pending",
        timestamp: Date.now(),
        statusUpdatedAt: Date.now()
      };

      const orders = getOrders();
      orders.push(newOrder);
      saveOrders(orders);
      localStorage.setItem("legrm_last_order_id", newOrder.id);
      setLastOrderId(newOrder.id);
      setLastOrder(newOrder);

      // Show beautiful success notification
      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
      }, 5000);
    } else {
      // Open WhatsApp only for non-scanMode order submissions
      window.open(`https://wa.me/${db.settings.whatsapp.replace(/\+/g, "")}?text=${encodedMsg}`, "_blank");
    }

    clearCart();
    setIsCartOpen(false);
    setNote("");
  };

  return (
    <div style={{ backgroundColor: "var(--bg-champagne)", minHeight: "100vh", position: "relative" }}>
      
      {/* Table block modal */}
      {showTableModal && (
        <TableModal onConfirm={handleTableConfirm} />
      )}

      {/* Header */}
      <div style={{
        padding: "120px 24px 60px",
        textAlign: "center",
        backgroundColor: "var(--bg-champagne)"
      }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "56px", color: "var(--text-cocoa)" }}>
          {scanMode ? `Table ${tableNumber} · Notre Menu` : "Notre Menu"}
        </h1>
        <p className="text-italic-quote" style={{ fontSize: "20px", color: "var(--accent-amber)", marginTop: "8px" }}>
          Taste Elevated.
        </p>
      </div>

      {/* Category Pills Header sticky */}
      <div style={{
        position: "sticky",
        top: "80px",
        backgroundColor: "var(--bg-champagne)",
        borderBottom: "1px solid rgba(73, 55, 43, 0.1)",
        boxShadow: "0 2px 20px rgba(56,64,56,0.08)",
        zIndex: 100,
        padding: "12px 24px",
        display: "flex",
        overflowX: "auto",
        gap: "8px"
      }} className="no-scrollbar">
        {db.categories.map((cat, idx) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              style={{
                backgroundColor: isActive ? "var(--accent-gold)" : "var(--bg-sand)",
                color: isActive ? "var(--bg-olive)" : "var(--text-cocoa)",
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "8px 16px",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "var(--transition-smooth)"
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Order Status tracking banner (Scan Mode only) */}
      {scanMode && lastOrder && (
        <div style={{ padding: "16px 24px 0" }}>
          <OrderStatusTracker order={lastOrder} onNewOrder={handleNewOrderClick} />
        </div>
      )}

      {/* Main Dishes Menu List */}
      <section className="section-padding" style={{ padding: "40px 24px 120px" }}>
        {activeCategoryItems.length === 0 ? (
          <div style={{ textAlign: "center", color: "rgba(73, 55, 43, 0.5)", padding: "80px 0" }}>
            Aucun article disponible dans cette catégorie pour le moment.
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px"
          }}>
            {activeCategoryItems.map((dish, idx) => {
              const inCartQty = cart[dish.id] || 0;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(73,55,43,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "var(--transition-smooth)"
                  }}
                  className="menu-item-card"
                >
                  {/* Image */}
                  <div style={{ overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 400ms ease" }}
                      className="menu-img-zoom"
                    />
                    {dish.badge && (
                      <div style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        backgroundColor: "var(--accent-gold)",
                        color: "var(--bg-olive)",
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "4px 8px",
                        borderRadius: "2px"
                      }}>
                        {dish.badge}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flexGrow: 1 }}>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "20px", fontWeight: 500, color: "var(--text-cocoa)" }}>
                      {dish.name}
                    </h3>
                    <p style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "13px",
                      lineHeight: 1.5,
                      color: "rgba(73, 55, 43, 0.65)",
                      minHeight: "38px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      flexGrow: 1
                    }}>
                      {dish.description}
                    </p>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 700, color: "var(--accent-gold)" }}>
                        {dish.price.toLocaleString("fr-FR")} FCFA
                      </span>

                      {/* Quantity select triggers */}
                      {inCartQty > 0 ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "var(--bg-sand)", borderRadius: "20px", padding: "4px 10px" }}>
                          <button
                            onClick={() => removeFromCart(dish.id)}
                            style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "var(--text-cocoa)" }}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ fontSize: "14px", fontWeight: 700 }}>{inCartQty}</span>
                          <button
                            onClick={() => addToCart(dish.id)}
                            style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "var(--text-cocoa)" }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(dish.id)}
                          style={{
                            border: "none",
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: "var(--accent-gold)",
                            color: "var(--bg-olive)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 2px 10px rgba(200, 155, 60, 0.3)"
                          }}
                          className="plus-btn"
                        >
                          <Plus size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Floating Cart Button (CartFab) */}
      {cartItemsCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            position: "fixed",
            bottom: scanMode ? "80px" : "32px",
            right: "32px",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "var(--accent-gold)",
            color: "var(--bg-olive)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(200, 155, 60, 0.4)",
            cursor: "pointer",
            zIndex: 900
          }}
          className="cart-fab"
        >
          <ShoppingCart size={24} />
          <div
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "var(--bg-olive)",
              color: "var(--bg-champagne)",
              fontSize: "11px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "popCount 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            {cartItemsCount}
          </div>
        </button>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsCartOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(56, 64, 56, 0.5)",
              zIndex: 1000,
              animation: "fadeInOverlay 380ms ease"
            }}
          />

          {/* Drawer Panel */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              width: "100%",
              maxWidth: "400px",
              height: "100%",
              backgroundColor: "var(--bg-champagne)",
              zIndex: 1001,
              boxShadow: "-10px 0 40px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              animation: "slideInDrawer 380ms cubic-bezier(0.32, 0.72, 0, 1)"
            }}
          >
            {/* Header */}
            <div style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--bg-sand)" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "var(--text-cocoa)" }}>Votre commande</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ border: "none", background: "none", cursor: "pointer", color: "var(--text-cocoa)" }}>
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div style={{ flexGrow: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {cartDetailedList.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", height: "100%", color: "rgba(73, 55, 43, 0.4)" }}>
                  <ShoppingCart size={48} />
                  <span>Votre panier est vide</span>
                </div>
              ) : (
                cartDetailedList.map((d, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid rgba(215, 195, 165, 0.3)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "60%" }}>
                      <span style={{ fontSize: "15px", fontWeight: 500 }}>{d.item.name}</span>
                      <span style={{ fontSize: "13px", color: "var(--accent-gold)", fontWeight: 600 }}>
                        {d.item.price.toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "var(--bg-sand)", borderRadius: "20px", padding: "4px 8px" }}>
                        <button onClick={() => removeFromCart(d.item.id)} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: "13px", fontWeight: 700 }}>{d.qty}</span>
                        <button onClick={() => addToCart(d.item.id)} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
                          <Plus size={12} />
                        </button>
                      </div>

                      <button onClick={() => deleteFromCart(d.item.id)} style={{ border: "none", background: "none", cursor: "pointer", color: "rgba(73, 55, 43, 0.4)" }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total, Note & Submit */}
            {cartDetailedList.length > 0 && (
              <div style={{ padding: "24px", borderTop: "1px solid var(--bg-sand)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 700 }}>
                  <span>Total :</span>
                  <span style={{ color: "var(--accent-gold)" }}>{cartTotalAmount.toLocaleString("fr-FR")} FCFA</span>
                </div>

                <textarea
                  placeholder="Ajouter une note pour la cuisine (ex: pas d'oignons)..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{
                    width: "100%",
                    height: "60px",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid var(--bg-sand)",
                    fontSize: "13px",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                    resize: "none"
                  }}
                />

                <button
                  onClick={handleOrderSubmit}
                  style={{
                    backgroundColor: scanMode ? "var(--bg-olive)" : "var(--whatsapp-green)",
                    color: "#FFFFFF",
                    border: "none",
                    height: "52px",
                    borderRadius: "6px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "13px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    cursor: "pointer",
                    width: "100%"
                  }}
                >
                  {scanMode ? <UtensilsCrossed size={18} /> : <MessageCircle size={18} />}
                  {scanMode ? "Envoyer en cuisine" : "Commander via WhatsApp"}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <style>{`
        .menu-item-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(73,55,43,0.16) !important;
        }
        .menu-img-zoom:hover { transform: scale(1.04); }
        .plus-btn { transition: transform 0.2s ease; }
        .plus-btn:hover { transform: scale(1.1); }
        
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInDrawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        }
        @keyframes popCount {
          0% { transform: scale(0.5); }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes slideInSuccess {
          from { transform: translateY(40px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>

      {/* Premium Order Success Toast */}
      {orderSuccess && (
        <div style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          backgroundColor: "var(--bg-olive)",
          color: "var(--bg-champagne)",
          padding: "20px 28px",
          borderRadius: "12px",
          boxShadow: "0 20px 50px rgba(33, 41, 33, 0.3)",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          gap: "16px",
          maxWidth: "420px",
          animation: "slideInSuccess 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          border: "1px solid var(--accent-gold)"
        }}>
          <div style={{
            backgroundColor: "var(--accent-gold)",
            color: "var(--bg-olive)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, fontFamily: "var(--font-serif)", color: "var(--bg-champagne)" }}>
              Commande transmise en cuisine !
            </div>
            <div style={{ fontSize: "12px", color: "rgba(247, 243, 233, 0.7)", marginTop: "2px", lineHeight: "1.4" }}>
              Notre brigade commence immédiatement la préparation de vos plats pour la Table {tableNumber}.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// SUB-COMPONENT: TABLE BLOCKED MODAL FOR ON-SITE SCAN ROUTE
// -------------------------------------------------------------
function TableModal({ onConfirm }: { onConfirm: (num: string) => void }) {
  const [val, setVal] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (val.trim()) onConfirm(val);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(56, 64, 56, 0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      backdropFilter: "blur(4px)"
    }}>
      <form
        onSubmit={submit}
        style={{
          backgroundColor: "var(--bg-champagne)",
          borderRadius: "16px",
          boxShadow: "0 20px 60px rgba(56,56,56,0.3)",
          padding: "48px 32px",
          width: "90%",
          maxWidth: "360px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          animation: "modalZoom 300ms ease-out"
        }}
      >
        <div style={{ color: "var(--accent-gold)" }}>
          <Hash size={40} strokeWidth={1.5} />
        </div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "30px", color: "var(--bg-olive)" }}>
          Votre numéro de table ?
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", color: "rgba(73, 55, 43, 0.75)" }}>
          Entrez le numéro inscrit sur le QR code ou sur votre table.
        </p>

        <input
          type="text"
          required
          autoFocus
          placeholder="ex : 7"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          style={{
            height: "56px",
            width: "100%",
            textAlign: "center",
            fontSize: "26px",
            fontFamily: "var(--font-serif)",
            border: "2px solid var(--bg-sand)",
            borderRadius: "6px",
            outline: "none",
            backgroundColor: "#FFFFFF"
          }}
        />

        <button type="submit" className="btn-primary" style={{ width: "100%", height: "52px" }}>
          Confirmer
        </button>
      </form>

      <style>{`
        @keyframes modalZoom {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// -------------------------------------------------------------
// SUB-COMPONENT: ORDER TRACKING STATUTES COMPONENT (SCAN MODE)
// -------------------------------------------------------------
function OrderStatusTracker({ order, onNewOrder }: { order: Order; onNewOrder: () => void }) {
  
  const renderStatus = () => {
    switch (order.status) {
      case "pending":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", borderRadius: "8px", backgroundColor: "var(--bg-sand)" }}>
            <Clock size={20} />
            <span style={{ fontSize: "14px", fontWeight: 500 }}>En attente de prise en charge par la cuisine...</span>
          </div>
        );
      case "preparing":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 20px", borderRadius: "8px", backgroundColor: "rgba(213, 140, 59, 0.15)", color: "var(--accent-amber)" }}>
            <Flame size={20} className="pulse-cooking" />
            <span style={{ fontSize: "14px", fontWeight: 600 }}>Votre commande est en cours de préparation... 🔥</span>
            <style>{`
              @keyframes pulseFlame {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
              .pulse-cooking { animation: pulseFlame 1.2s infinite ease-in-out; }
            `}</style>
          </div>
        );
      case "ready":
        return (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            padding: "16px 20px",
            borderRadius: "8px",
            backgroundColor: "rgba(37, 211, 102, 0.15)",
            color: "var(--whatsapp-green)",
            boxShadow: "0 0 0 4px rgba(37, 211, 102, 0.2)",
            animation: "pulseShadow 1.5s infinite"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <BellRing size={20} style={{ animation: "ringBell 0.5s infinite alternate" }} />
              <span style={{ fontSize: "14px", fontWeight: 700 }}>Votre commande est prête ! Elle arrive à votre table.</span>
            </div>
            <style>{`
              @keyframes pulseShadow {
                0% { box-shadow: 0 0 0 0px rgba(37, 211, 102, 0.4); }
                100% { box-shadow: 0 0 0 8px rgba(37, 211, 102, 0); }
              }
              @keyframes ringBell {
                from { transform: rotate(-10deg); }
                to { transform: rotate(10deg); }
              }
            `}</style>
          </div>
        );
      case "served":
        return (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            padding: "14px 20px",
            borderRadius: "8px",
            backgroundColor: "var(--bg-sand)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle size={20} style={{ color: "var(--whatsapp-green)" }} />
              <span style={{ fontSize: "14px", fontWeight: 600 }}>Commande servie. Bon appétit ! 🍽️</span>
            </div>
            <button
              onClick={onNewOrder}
              style={{
                border: "none",
                background: "none",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--accent-gold)",
                cursor: "pointer",
                textTransform: "uppercase"
              }}
            >
              Nouvelle commande
            </button>
          </div>
        );
    }
  };

  return (
    <div style={{ marginTop: "12px", animation: "slideDown 300ms ease" }}>
      {renderStatus()}
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// -------------------------------------------------------------
// PAGE: /galerie (GALERIE LIFESTYLE)
// -------------------------------------------------------------
function Galerie() {
  const [activeFilter, setActiveFilter] = useState("Tout");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [
    { url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0", cat: "Ambiance" },
    { url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b", cat: "Cocktails" },
    { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", cat: "Plats" },
    { url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1", cat: "Moments" },
    { url: "https://images.unsplash.com/photo-1559339352-11d035aa65de", cat: "Ambiance" },
    { url: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f", cat: "Plats" },
    { url: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7", cat: "Moments" },
    { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", cat: "Ambiance" },
    { url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20", cat: "Moments" },
    { url: "https://images.unsplash.com/photo-1529516548873-9ce57c8f155e", cat: "Moments" },
    { url: "https://images.unsplash.com/photo-1574096079513-d8259312b785", cat: "Cocktails" },
    { url: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6", cat: "Plats" }
  ];

  const filteredImages = useMemo(() => {
    if (activeFilter === "Tout") return images;
    return images.filter(img => img.cat === activeFilter);
  }, [activeFilter]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div>
      {/* Hero */}
      <div style={{
        height: "50vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "var(--bg-olive)"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.55,
          zIndex: 1
        }} className="image-filter-lifestyle" />
        <div style={{ position: "relative", zIndex: 2, padding: "0 24px" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 5vw, 60px)", color: "var(--bg-champagne)" }}>
            Moments at Skylark
          </h1>
        </div>
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "40px 24px 20px", overflowX: "auto" }} className="no-scrollbar">
        {["Tout", "Ambiance", "Plats", "Cocktails", "Moments"].map((f, idx) => {
          const active = activeFilter === f;
          return (
            <button
              key={idx}
              onClick={() => setActiveFilter(f)}
              style={{
                backgroundColor: active ? "var(--accent-gold)" : "var(--bg-sand)",
                color: active ? "var(--bg-olive)" : "var(--text-cocoa)",
                border: "none",
                borderRadius: "20px",
                padding: "8px 20px",
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "var(--transition-smooth)"
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grid Images list */}
      <section className="section-padding" style={{ padding: "20px 80px 120px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px"
        }}>
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxIndex(idx)}
              style={{
                backgroundImage: `url('${img.url}?auto=format&fit=crop&w=600&q=80')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                aspectRatio: "1/1",
                borderRadius: "4px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "var(--transition-smooth)"
              }}
              className="gallery-grid-img"
            />
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(56, 64, 56, 0.95)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <button onClick={() => setLightboxIndex(null)} style={{ position: "absolute", top: "24px", right: "24px", color: "#FFF", border: "none", background: "none", cursor: "pointer" }}>
            <X size={28} />
          </button>
          <button onClick={handlePrev} style={{ position: "absolute", left: "24px", color: "#FFF", border: "none", background: "none", cursor: "pointer" }}>
            <ChevronLeft size={36} />
          </button>
          <div style={{ maxWidth: "80%", maxHeight: "80%" }}>
            <img
              src={`${filteredImages[lightboxIndex].url}?auto=format&fit=crop&w=1200&q=80`}
              alt="Lightbox"
              style={{ maxWidth: "100%", maxHeight: "100vh", objectFit: "contain", borderRadius: "4px" }}
              className="image-filter-lifestyle"
            />
          </div>
          <button onClick={handleNext} style={{ position: "absolute", right: "24px", color: "#FFF", border: "none", background: "none", cursor: "pointer" }}>
            <ChevronRight size={36} />
          </button>
        </div>
      )}

      <style>{`
        .gallery-grid-img:hover {
          transform: scale(1.02);
          box-shadow: 0 0 0 2px var(--accent-gold);
        }
        @media (max-width: 768px) {
          section[style*="padding: 20px 80px 120px"] { padding: 20px 24px 80px !important; }
        }
      `}</style>
    </div>
  );
}

// -------------------------------------------------------------
// PAGE: /reservation (RÉSERVATION COMPLÈTE)
// -------------------------------------------------------------
function Reservation({ db }: { db: RestaurantData }) {
  const [form, setForm] = useState({
    date: "",
    time: "20:00",
    guests: "2",
    occasion: "Dîner classique",
    name: "",
    phone: "",
    note: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    const noteSection = form.note.trim() ? `\nDemandes spéciales : ${form.note}` : "";
    const msg = `Bonjour Skylark,\nJe souhaite réserver une table pour ${form.guests} personnes le ${form.date} à ${form.time} — Occasion : ${form.occasion}.\nNom : ${form.name}.\nTel : ${form.phone}.${noteSection}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/${db.settings.whatsapp.replace(/\+/g, "")}?text=${encoded}`, "_blank");
  };

  return (
    <div>
      {/* Hero */}
      <div style={{
        height: "50vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "var(--bg-olive)"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.5,
          zIndex: 1
        }} className="image-filter-lifestyle" />
        <div style={{ position: "relative", zIndex: 2, padding: "0 24px" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 5vw, 60px)", color: "var(--bg-champagne)" }}>
            Réserver une table
          </h1>
        </div>
      </div>

      {/* Form Area */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-champagne)", display: "flex", justifyContent: "center" }}>
        <ScrollReveal>
          <div style={{ width: "100%", maxWidth: "640px" }}>
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "16px",
                boxShadow: "0 16px 60px rgba(56, 64, 56, 0.12)",
                padding: "48px",
                display: "flex",
                flexDirection: "column",
                gap: "24px"
              }}
            >
            {/* Row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Date</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid var(--bg-sand)",
                    borderRadius: "6px",
                    backgroundColor: "var(--bg-champagne)",
                    outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Heure</label>
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid var(--bg-sand)",
                    borderRadius: "6px",
                    backgroundColor: "var(--bg-champagne)",
                    outline: "none",
                    height: "48px"
                  }}
                >
                  {["12:00", "13:00", "19:00", "20:00", "21:00", "22:00"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Nombre de personnes</label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid var(--bg-sand)",
                    borderRadius: "6px",
                    backgroundColor: "var(--bg-champagne)",
                    outline: "none",
                    height: "48px"
                  }}
                >
                  {Array.from({ length: 15 }, (_, i) => String(i + 1)).map(n => (
                    <option key={n} value={n}>{n} personne{Number(n) > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Occasion</label>
                <select
                  value={form.occasion}
                  onChange={(e) => setForm({ ...form, occasion: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid var(--bg-sand)",
                    borderRadius: "6px",
                    backgroundColor: "var(--bg-champagne)",
                    outline: "none",
                    height: "48px"
                  }}
                >
                  {["Dîner classique", "Dîner romantique", "Anniversaire", "Business dinner", "Repas en famille", "Entre amis"].map(occ => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Prénom & Nom</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ama K."
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid var(--bg-sand)",
                    borderRadius: "6px",
                    backgroundColor: "var(--bg-champagne)",
                    outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Téléphone</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: +228 90..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    border: "1px solid var(--bg-sand)",
                    borderRadius: "6px",
                    backgroundColor: "var(--bg-champagne)",
                    outline: "none"
                  }}
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Demandes Spéciales</label>
              <textarea
                placeholder="Précisions, allergies, demandes d'emplacement..."
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                style={{
                  width: "100%",
                  height: "80px",
                  padding: "14px 16px",
                  border: "1px solid var(--bg-sand)",
                  borderRadius: "6px",
                  backgroundColor: "var(--bg-champagne)",
                  outline: "none",
                  resize: "none",
                  fontFamily: "var(--font-sans)"
                }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", height: "56px" }}>
              Réserver ma table
            </button>

            <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(73, 55, 43, 0.6)", marginTop: "4px" }}>
              Votre réservation sera confirmée par WhatsApp dans les meilleurs délais.
            </p>
          </form>
        </div>
      </ScrollReveal>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// PAGE: /contact (CONTACT & ACCES)
// -------------------------------------------------------------
function Contact({ db }: { db: RestaurantData }) {
  
  const handleWhatsAppDirect = () => {
    const msg = encodeURIComponent("Bonjour Skylark, je souhaite planifier un événement / réserver pour un groupe.");
    window.open(`https://wa.me/${db.settings.whatsapp.replace(/\+/g, "")}?text=${msg}`, "_blank");
  };

  return (
    <div>
      {/* Hero */}
      <div style={{
        height: "40vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "var(--bg-olive)"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.45,
          zIndex: 1
        }} className="image-filter-lifestyle" />
        <div style={{ position: "relative", zIndex: 2, padding: "0 24px" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 5vw, 56px)", color: "var(--bg-champagne)" }}>
            Nous trouver
          </h1>
        </div>
      </div>

      {/* Info + Map */}
      <section className="section-padding" style={{ backgroundColor: "var(--bg-champagne)" }}>
        <ScrollReveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px" }}>
            
            {/* Left Block details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <MapPin size={24} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "4px" }} />
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 700, color: "var(--bg-olive)" }}>ADRESSE</h4>
                  <p style={{ marginTop: "4px", fontSize: "15px", lineHeight: 1.6 }}>{db.settings.address}</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <Clock size={24} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "4px" }} />
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 700, color: "var(--bg-olive)" }}>HORAIRES</h4>
                  <p style={{ marginTop: "4px", fontSize: "15px", lineHeight: 1.6, whiteSpace: "pre-line" }}>{db.settings.hours}</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <Phone size={24} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: "4px" }} />
                <div>
                  <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 700, color: "var(--bg-olive)" }}>TÉLÉPHONE</h4>
                  <p style={{ marginTop: "4px", fontSize: "15px" }}>{db.settings.whatsapp}</p>
                </div>
              </div>

              <button onClick={handleWhatsAppDirect} style={{ backgroundColor: "var(--whatsapp-green)", color: "#FFF" }} className="btn-primary">
                <MessageCircle size={18} />
                Écrire sur WhatsApp
              </button>
            </div>

            {/* Right block: map iframe placeholder */}
            <div>
              <iframe
                title="Google Map Skylark Lomé"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d1.2227183!3d6.1278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10215f5c1d31065b%3A0x7d6a5750bf595f9c!2sLom%C3%A9%2C%20Togo!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "8px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// PAGE: /admin (ADMIN DASHBOARD)
// -------------------------------------------------------------
interface AdminProps {
  db: RestaurantData;
  onDbUpdate: (data: RestaurantData) => void;
}

function Admin({ db, onDbUpdate }: AdminProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuth, setIsAuth] = useState(() => {
    return sessionStorage.getItem("adminAuth") === "true";
  });
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState<"menu" | "categories" | "settings" | "export">("menu");

  // Authentication submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "skylark2025") {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuth(true);
      setError("");
    } else {
      setError("Mot de passe incorrect.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuth(false);
    setPassword("");
  };

  // State elements for items editing/adding
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showItemForm, setShowItemForm] = useState(false);
  const [itemFormVal, setItemFormVal] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: db.categories[0] || "",
    badge: "",
    available: true,
    image: ""
  });

  const handleEditItemClick = (item: MenuItem) => {
    setEditingItem(item);
    setItemFormVal(item);
    setShowItemForm(true);
  };

  const handleAddItemClick = () => {
    setEditingItem(null);
    setItemFormVal({
      name: "",
      description: "",
      price: 0,
      category: db.categories[0] || "",
      badge: "",
      available: true,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
    });
    setShowItemForm(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemFormVal.name || !itemFormVal.category || !itemFormVal.price) return;

    let updatedItems = [...db.items];
    if (editingItem) {
      // Modify
      updatedItems = updatedItems.map(i => i.id === editingItem.id ? { ...i, ...itemFormVal } as MenuItem : i);
    } else {
      // Add
      const newItem: MenuItem = {
        ...(itemFormVal as Omit<MenuItem, 'id'>),
        id: "item_" + Date.now()
      };
      updatedItems.push(newItem);
    }

    const nextDb = { ...db, items: updatedItems };
    saveRestaurantData(nextDb);
    onDbUpdate(nextDb);
    setShowItemForm(false);
  };

  const handleDeleteItem = (itemId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
    const nextDb = { ...db, items: db.items.filter(i => i.id !== itemId) };
    saveRestaurantData(nextDb);
    onDbUpdate(nextDb);
  };

  const handleToggleAvailable = (itemId: string) => {
    const nextDb = {
      ...db,
      items: db.items.map(i => i.id === itemId ? { ...i, available: !i.available } : i)
    };
    saveRestaurantData(nextDb);
    onDbUpdate(nextDb);
  };

  // State elements for categories
  const [newCatName, setNewCatName] = useState("");
  const [renameCat, setRenameCat] = useState<{ idx: number; val: string } | null>(null);

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    if (db.categories.includes(newCatName.trim())) {
      alert("Cette catégorie existe déjà.");
      return;
    }
    const nextDb = { ...db, categories: [...db.categories, newCatName.trim()] };
    saveRestaurantData(nextDb);
    onDbUpdate(nextDb);
    setNewCatName("");
  };

  const handleRenameCategorySubmit = (idx: number) => {
    if (!renameCat || !renameCat.val.trim()) return;
    const oldName = db.categories[idx];
    const newName = renameCat.val.trim();

    // Update categories
    const nextCats = [...db.categories];
    nextCats[idx] = newName;

    // Update corresponding items category
    const nextItems = db.items.map(item => item.category === oldName ? { ...item, category: newName } : item);

    const nextDb = { ...db, categories: nextCats, items: nextItems };
    saveRestaurantData(nextDb);
    onDbUpdate(nextDb);
    setRenameCat(null);
  };

  const handleDeleteCategory = (idx: number) => {
    const name = db.categories[idx];
    const itemMatches = db.items.filter(i => i.category === name);
    if (itemMatches.length > 0) {
      if (!window.confirm(`Il y a ${itemMatches.length} plat(s) dans la catégorie "${name}". Supprimer la catégorie supprimera également ces plats. Continuer ?`)) {
        return;
      }
    }
    const nextDb = {
      ...db,
      categories: db.categories.filter((_, i) => i !== idx),
      items: db.items.filter(i => i.category !== name)
    };
    saveRestaurantData(nextDb);
    onDbUpdate(nextDb);
  };

  const handleMoveCategory = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === db.categories.length - 1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const copy = [...db.categories];
    const temp = copy[idx];
    copy[idx] = copy[targetIdx];
    copy[targetIdx] = temp;

    const nextDb = { ...db, categories: copy };
    saveRestaurantData(nextDb);
    onDbUpdate(nextDb);
  };

  // General Settings values
  const [settingsForm, setSettingsForm] = useState({ ...db.settings });
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const nextDb = { ...db, settings: settingsForm };
    saveRestaurantData(nextDb);
    onDbUpdate(nextDb);
    alert("Paramètres enregistrés avec succès !");
  };

  // Reset to default
  const handleResetData = () => {
    if (!window.confirm("Êtes-vous sûr de vouloir réinitialiser toutes les données aux valeurs par défaut de Skylark ? Toutes les modifications locales seront perdues.")) return;
    localStorage.removeItem("restaurantData");
    const defaultData = getRestaurantData();
    onDbUpdate(defaultData);
    setSettingsForm(defaultData.settings);
    alert("Données réinitialisées !");
  };

  // Auth Screen
  if (!isAuth) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F8F9FA", padding: "24px" }}>
        <form
          onSubmit={handleLogin}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            padding: "40px",
            width: "100%",
            maxWidth: "380px",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 600, color: "var(--bg-olive)" }}>Accès Administrateur</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(73, 55, 43, 0.6)", marginTop: "4px" }}>Skylark — Dashboard</p>
          </div>

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Entrez le mot de passe..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 40px 12px 16px",
                border: "1px solid #E0E0E0",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none"
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: "#888" }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <span style={{ color: "red", fontSize: "13px" }}>{error}</span>}

          <button type="submit" className="btn-primary" style={{ height: "48px", width: "100%" }}>
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8F9FA" }}>
      {/* Admin Topbar */}
      <header
        style={{
          height: "64px",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E0E0E0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 50
        }}
      >
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 700, color: "var(--bg-olive)" }}>
          SKYLARK — Admin
        </span>
        <button
          onClick={handleLogout}
          style={{
            border: "none",
            background: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--text-cocoa)"
          }}
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </header>

      <div style={{ display: "flex", flexWrap: "wrap", minHeight: "calc(100vh - 64px)" }}>
        
        {/* Tab Sidebar select */}
        <aside style={{ width: "240px", backgroundColor: "#FFFFFF", borderRight: "1px solid #E0E0E0", display: "flex", flexDirection: "column" }}>
          {[
            { id: "menu", label: "Menu Plats" },
            { id: "categories", label: "Catégories" },
            { id: "settings", label: "Paramètres" },
            { id: "export", label: "Export / Config" }
          ].map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "16px 24px",
                  textAlign: "left",
                  border: "none",
                  borderLeft: `4px solid ${active ? 'var(--accent-gold)' : 'transparent'}`,
                  backgroundColor: active ? "rgba(200, 155, 60, 0.05)" : "transparent",
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--accent-gold)" : "var(--text-cocoa)",
                  cursor: "pointer"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Tab contents panel */}
        <section style={{ flexGrow: 1, padding: "32px", maxWidth: "900px" }}>
          
          {/* TAB 1: MENU ITEMS */}
          {activeTab === "menu" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 700 }}>Gestion des Plats</h3>
                <button className="btn-primary" onClick={handleAddItemClick} style={{ padding: "10px 20px" }}>
                  <Plus size={16} />
                  Ajouter un plat
                </button>
              </div>

              {db.categories.map(cat => {
                const matches = db.items.filter(i => i.category === cat);
                return (
                  <div key={cat} style={{ backgroundColor: "#FFFFFF", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", padding: "20px", marginBottom: "24px" }}>
                    <h4 style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-gold)", marginBottom: "16px", display: "flex", gap: "8px" }}>
                      <span>{cat}</span>
                      <span style={{ color: "#888", fontWeight: 500 }}>({matches.length})</span>
                    </h4>

                    {matches.length === 0 ? (
                      <p style={{ fontSize: "13px", color: "#888", fontStyle: "italic" }}>Aucun plat enregistré dans cette catégorie.</p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {matches.map(item => (
                          <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid #EAEAEA" }}>
                            
                            {/* Left details */}
                            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                              <img src={item.image} alt={item.name} style={{ width: "40px", height: "40px", borderRadius: "4px", objectFit: "cover" }} />
                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                                <span style={{ fontSize: "14px", fontWeight: 600 }}>{item.name}</span>
                                <span style={{ fontSize: "13px", color: "var(--accent-gold)" }}>{item.price.toLocaleString("fr-FR")} FCFA</span>
                              </div>
                            </div>

                            {/* Right action controls */}
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                              {/* Availability toggle */}
                              <button
                                onClick={() => handleToggleAvailable(item.id)}
                                style={{
                                  padding: "6px 12px",
                                  fontSize: "11px",
                                  fontWeight: 600,
                                  borderRadius: "12px",
                                  border: "none",
                                  cursor: "pointer",
                                  backgroundColor: item.available ? "var(--accent-gold)" : "#CCC",
                                  color: item.available ? "var(--bg-olive)" : "#FFF"
                                }}
                              >
                                {item.available ? "Disponible" : "Indisponible"}
                              </button>

                              <button onClick={() => handleEditItemClick(item)} style={{ border: "none", background: "none", cursor: "pointer", color: "#888" }}>
                                <Pencil size={16} />
                              </button>

                              <button onClick={() => handleDeleteItem(item.id)} style={{ border: "none", background: "none", cursor: "pointer", color: "#FF4D4D" }}>
                                <Trash2 size={16} />
                              </button>
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Item Add/Modify Form Drawer */}
              {showItemForm && (
                <div style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  justifyContent: "flex-end",
                  zIndex: 1000
                }}>
                  <form
                    onSubmit={handleSaveItem}
                    style={{
                      width: "100%",
                      maxWidth: "420px",
                      backgroundColor: "#FFF",
                      height: "100%",
                      padding: "32px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      boxShadow: "-10px 0 30px rgba(0,0,0,0.15)",
                      overflowY: "auto"
                    }}
                  >
                    <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 700 }}>
                      {editingItem ? "Modifier le Plat" : "Ajouter un Plat"}
                    </h3>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Nom du plat</label>
                      <input
                        type="text"
                        required
                        value={itemFormVal.name}
                        onChange={(e) => setItemFormVal({ ...itemFormVal, name: e.target.value })}
                        style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Description</label>
                      <textarea
                        required
                        value={itemFormVal.description}
                        onChange={(e) => setItemFormVal({ ...itemFormVal, description: e.target.value })}
                        style={{ width: "100%", height: "80px", padding: "10px", border: "1px solid #CCC", borderRadius: "4px", resize: "none" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Prix (FCFA)</label>
                        <input
                          type="number"
                          required
                          value={itemFormVal.price}
                          onChange={(e) => setItemFormVal({ ...itemFormVal, price: Number(e.target.value) })}
                          style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Catégorie</label>
                        <select
                          value={itemFormVal.category}
                          onChange={(e) => setItemFormVal({ ...itemFormVal, category: e.target.value })}
                          style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px", height: "38px" }}
                        >
                          {db.categories.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Image (URL)</label>
                      <input
                        type="text"
                        required
                        value={itemFormVal.image}
                        onChange={(e) => setItemFormVal({ ...itemFormVal, image: e.target.value })}
                        style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Badge (optionnel)</label>
                      <input
                        type="text"
                        value={itemFormVal.badge || ""}
                        onChange={(e) => setItemFormVal({ ...itemFormVal, badge: e.target.value })}
                        style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px" }}
                        placeholder="Ex: Chef recommande"
                      />
                    </div>

                    <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                      <button type="submit" className="btn-primary" style={{ flexGrow: 1 }}>
                        <Save size={16} />
                        Sauvegarder
                      </button>
                      <button type="button" onClick={() => setShowItemForm(false)} className="btn-secondary" style={{ color: "var(--text-cocoa)", borderColor: "#CCC" }}>
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: CATEGORIES */}
          {activeTab === "categories" && (
            <div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Gestion des Catégories</h3>

              {/* Add category form */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
                <input
                  type="text"
                  placeholder="Nouvelle catégorie..."
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  style={{ flexGrow: 1, padding: "12px", border: "1px solid #CCC", borderRadius: "4px" }}
                />
                <button onClick={handleAddCategory} className="btn-primary" style={{ padding: "12px 24px" }}>
                  <Plus size={16} />
                  Ajouter
                </button>
              </div>

              {/* Cat List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {db.categories.map((cat, idx) => {
                  const isRenaming = renameCat?.idx === idx;
                  return (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF", padding: "16px 20px", borderRadius: "6px", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                      
                      {isRenaming ? (
                        <div style={{ display: "flex", gap: "10px", flexGrow: 1 }}>
                          <input
                            type="text"
                            value={renameCat.val}
                            onChange={(e) => setRenameCat({ idx, val: e.target.value })}
                            style={{ flexGrow: 1, padding: "6px", border: "1px solid #CCC", borderRadius: "4px" }}
                          />
                          <button onClick={() => handleRenameCategorySubmit(idx)} className="btn-primary" style={{ padding: "6px 12px", fontSize: "12px" }}>Sauvegarder</button>
                          <button onClick={() => setRenameCat(null)} className="btn-secondary" style={{ color: "var(--text-cocoa)", borderColor: "#CCC", padding: "6px 12px", fontSize: "12px" }}>Annuler</button>
                        </div>
                      ) : (
                        <>
                          <span style={{ fontSize: "15px", fontWeight: 600 }}>{cat}</span>

                          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            {/* Move category actions */}
                            <button
                              disabled={idx === 0}
                              onClick={() => handleMoveCategory(idx, 'up')}
                              style={{ border: "none", background: "none", cursor: idx === 0 ? "not-allowed" : "pointer", color: idx === 0 ? "#CCC" : "#888" }}
                            >
                              ▲
                            </button>
                            <button
                              disabled={idx === db.categories.length - 1}
                              onClick={() => handleMoveCategory(idx, 'down')}
                              style={{ border: "none", background: "none", cursor: idx === db.categories.length - 1 ? "not-allowed" : "pointer", color: idx === db.categories.length - 1 ? "#CCC" : "#888" }}
                            >
                              ▼
                            </button>

                            <button onClick={() => setRenameCat({ idx, val: cat })} style={{ border: "none", background: "none", cursor: "pointer", color: "#888" }}>
                              <Pencil size={16} />
                            </button>

                            <button onClick={() => handleDeleteCategory(idx)} style={{ border: "none", background: "none", cursor: "pointer", color: "#FF4D4D" }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === "settings" && (
            <div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Paramètres du Restaurant</h3>

              <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "#FFFFFF", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Nom du restaurant</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Slogan / Tagline</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Numéro WhatsApp (avec code pays)</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.whatsapp}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Adresse exacte</label>
                  <input
                    type="text"
                    required
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>Horaires d'ouverture</label>
                  <textarea
                    required
                    value={settingsForm.hours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                    style={{ width: "100%", height: "80px", padding: "10px", border: "1px solid #CCC", borderRadius: "4px", resize: "none", fontFamily: "var(--font-sans)" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>URL Instagram</label>
                    <input
                      type="text"
                      value={settingsForm.instagram}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>URL Facebook</label>
                    <input
                      type="text"
                      value={settingsForm.facebook}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                      style={{ width: "100%", padding: "10px", border: "1px solid #CCC", borderRadius: "4px" }}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ height: "48px", width: "100%", marginTop: "10px" }}>
                  <Save size={16} />
                  Enregistrer les Paramètres
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: BACKUP & CONFIG */}
          {activeTab === "export" && (
            <div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Sauvegardes & Configurations</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px", backgroundColor: "#FFFFFF", padding: "30px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>Copie de Configuration JSON</h4>
                  <p style={{ fontSize: "13px", color: "#666", marginBottom: "16px" }}>
                    Partagez ce JSON avec votre développeur pour mettre à jour les données par défaut du site. Les modifications admin ne sont visibles que sur cet appareil.
                  </p>
                  
                  <textarea
                    readOnly
                    value={JSON.stringify(db, null, 2)}
                    onClick={(e) => (e.currentTarget as HTMLTextAreaElement).select()}
                    style={{
                      width: "100%",
                      height: "200px",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #CCC",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      backgroundColor: "#F9F9F9",
                      outline: "none"
                    }}
                  />

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(db, null, 2));
                      alert("Configuration JSON copiée dans le presse-papiers !");
                    }}
                    className="btn-primary"
                    style={{ display: "inline-flex", gap: "8px", marginTop: "12px", height: "44px" }}
                  >
                    <Copy size={16} />
                    Copier la configuration JSON
                  </button>
                </div>

                <div style={{ borderTop: "1px solid #EAEAEA", paddingTop: "24px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#FF4D4D", marginBottom: "8px" }}>Zone de Danger</h4>
                  <p style={{ fontSize: "13px", color: "#666", marginBottom: "16px" }}>
                    Réinitialiser les données effacera toutes vos modifications locales et rétablira le menu et les paramètres d'origine de Skylark.
                  </p>

                  <button
                    onClick={handleResetData}
                    className="btn-secondary"
                    style={{ color: "#FF4D4D", borderColor: "#FF4D4D", display: "inline-flex", gap: "8px", height: "44px" }}
                  >
                    <RotateCcw size={16} />
                    Réinitialiser aux données par défaut
                  </button>
                </div>
              </div>
            </div>
          )}

        </section>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// PAGE: /cuisine (KITCHEN KANBAN DISPLAY SYSTEM)
// -------------------------------------------------------------
interface ToastItem {
  id: string;
  tableNumber: string;
  count: number;
}

function Cuisine() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("cuisineAuth") === "true";
  });
  const [error, setError] = useState("");

  const [orders, setOrders] = useState<Order[]>(getOrders());
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [systemTime, setSystemTime] = useState("");

  // System time clock HH:MM
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      setSystemTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Poll orders state for realtime syncing
  useEffect(() => {
    if (!isAuth) return;

    const syncOrders = () => {
      const latestOrders = getOrders();
      
      // Look for new commands that are "pending"
      const prevIds = orders.map(o => o.id);
      const newCommands = latestOrders.filter(o => o.status === "pending" && !prevIds.includes(o.id));

      if (newCommands.length > 0) {
        // Trigger Audio Notice
        playDoubleBeep();

        // Push new alerts/toasts
        newCommands.forEach(cmd => {
          const count = cmd.items.reduce((acc, i) => acc + i.qty, 0);
          const newToast: ToastItem = {
            id: cmd.id,
            tableNumber: cmd.tableNumber,
            count: count
          };
          setToasts(prev => [...prev, newToast]);

          // Auto-remove toast in 5s
          setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== cmd.id));
          }, 5000);
        });
      }

      setOrders(latestOrders);
    };

    const interval = setInterval(syncOrders, 3000);
    window.addEventListener("storage", syncOrders);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", syncOrders);
    };
  }, [isAuth, orders]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "cuisine2025") {
      localStorage.setItem("cuisineAuth", "true");
      setIsAuth(true);
      setError("");
      setOrders(getOrders());
    } else {
      setError("Mot de passe cuisine erroné.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cuisineAuth");
    setIsAuth(false);
    setPassword("");
  };

  const handleAdvanceStatus = (orderId: string, currentStatus: Order['status']) => {
    let nextStatus: Order['status'] = "pending";
    if (currentStatus === "pending") nextStatus = "preparing";
    else if (currentStatus === "preparing") nextStatus = "ready";
    else if (currentStatus === "ready") nextStatus = "served";
    else return;

    updateOrderStatus(orderId, nextStatus);
    setOrders(getOrders());
  };

  const handleArchive = () => {
    if (!window.confirm("Voulez-vous archiver toutes les commandes servies depuis plus de 2 heures ?")) return;
    const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);
    const cleaned = getOrders().filter(o => !(o.status === "served" && o.statusUpdatedAt < twoHoursAgo));
    saveOrders(cleaned);
    setOrders(cleaned);
    alert("Commandes anciennes archivées !");
  };

  // Group columns variables
  const grouped = useMemo(() => {
    return orders.reduce((acc, o) => {
      acc[o.status].push(o);
      return acc;
    }, {
      pending: [],
      preparing: [],
      ready: [],
      served: []
    } as { [s in Order['status']]: Order[] });
  }, [orders]);

  const activeCount = grouped.pending.length + grouped.preparing.length;

  // Render auth login
  if (!isAuth) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "var(--bg-olive)", padding: "24px" }}>
        <form
          onSubmit={handleLogin}
          style={{
            backgroundColor: "#1A2518",
            border: "1px solid rgba(215,195,165,0.15)",
            borderRadius: "12px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
            padding: "40px",
            width: "100%",
            maxWidth: "360px",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "16px", fontWeight: 700, color: "var(--bg-champagne)" }}>
              Accès Cuisine — Skylark
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "rgba(243, 235, 221, 0.5)", marginTop: "4px" }}>KDS Monitor</p>
          </div>

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Entrez le mot de passe cuisine..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 40px 12px 16px",
                border: "1px solid rgba(215,195,165,0.2)",
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#0D1A0B",
                color: "#FFF"
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: "#AAA" }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && <span style={{ color: "#FF4D4D", fontSize: "13px" }}>{error}</span>}

          <button type="submit" className="btn-primary" style={{ width: "100%", height: "48px" }}>
            Accéder à la cuisine
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="cuisine-layout">
      {/* Toast Alert popup banner */}
      <div className="toast-stack">
        {toasts.map(t => (
          <div key={t.id} className="cuisine-toast">
            <AlertTriangle size={18} style={{ color: "var(--accent-gold)", flexShrink: 0 }} />
            <div>
              <span style={{ fontWeight: 700 }}>Nouvelle Commande !</span>
              <p style={{ fontSize: "12px", marginTop: "2px", opacity: 0.8 }}>Table {t.tableNumber} · {t.count} article(s)</p>
            </div>
          </div>
        ))}
      </div>

      {/* Topbar */}
      <header className="cuisine-topbar">
        <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", color: "var(--bg-champagne)" }}>
          CUISINE — SKYLARK
        </span>

        <span style={{ fontFamily: "var(--font-serif)", fontSize: "28px", color: "var(--bg-champagne)", fontWeight: 300 }}>
          {systemTime}
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ backgroundColor: "var(--accent-gold)", color: "var(--bg-olive)", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: 700 }}>
            {activeCount} ACTIVES
          </div>
          <button onClick={handleArchive} style={{ color: "#FFF", background: "none", border: "none", cursor: "pointer" }} title="Archiver les commandes servies">
            <Archive size={20} />
          </button>
          <button onClick={handleLogout} style={{ color: "#FFF", background: "none", border: "none", cursor: "pointer" }} title="Se déconnecter">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Kanban Grid */}
      <div className="cuisine-grid">
        
        {/* Column 1: Pending */}
        <div className="cuisine-col">
          <div className="cuisine-col-header pending">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Clock size={18} />
              <span style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>EN ATTENTE</span>
            </div>
            <span style={{ fontSize: "13px", fontWeight: 700 }}>{grouped.pending.length}</span>
          </div>

          <div className="cuisine-card-list">
            {grouped.pending.map(order => (
              <KitchenOrderCard key={order.id} order={order} onAction={() => handleAdvanceStatus(order.id, "pending")} />
            ))}
          </div>
        </div>

        {/* Column 2: Preparing */}
        <div className="cuisine-col">
          <div className="cuisine-col-header preparing">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Flame size={18} />
              <span style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>PRÉPARATION</span>
            </div>
            <span style={{ fontSize: "13px", fontWeight: 700 }}>{grouped.preparing.length}</span>
          </div>

          <div className="cuisine-card-list">
            {grouped.preparing.map(order => (
              <KitchenOrderCard key={order.id} order={order} onAction={() => handleAdvanceStatus(order.id, "preparing")} />
            ))}
          </div>
        </div>

        {/* Column 3: Ready */}
        <div className="cuisine-col">
          <div className="cuisine-col-header ready">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <BellRing size={18} />
              <span style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>PRÊT</span>
            </div>
            <span style={{ fontSize: "13px", fontWeight: 700 }}>{grouped.ready.length}</span>
          </div>

          <div className="cuisine-card-list">
            {grouped.ready.map(order => (
              <KitchenOrderCard key={order.id} order={order} onAction={() => handleAdvanceStatus(order.id, "ready")} />
            ))}
          </div>
        </div>

        {/* Column 4: Served */}
        <div className="cuisine-col">
          <div className="cuisine-col-header served">
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <CheckCircle size={18} />
              <span style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase" }}>SERVI</span>
            </div>
            <span style={{ fontSize: "13px", fontWeight: 700 }}>{grouped.served.length}</span>
          </div>

          <div className="cuisine-card-list">
            {grouped.served.map(order => (
              <KitchenOrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SUB-COMPONENT: KITCHEN ORDER DISPLAY CARD (KDS)
// -------------------------------------------------------------
function KitchenOrderCard({ order, onAction }: { order: Order; onAction?: () => void }) {
  const [elapsed, setElapsed] = useState("");

  // Elapsed wait time indicator
  useEffect(() => {
    const updateElapsed = () => {
      const diff = Math.floor((Date.now() - order.timestamp) / 1000 / 60);
      setElapsed(`il y a ${diff} min`);
    };
    updateElapsed();
    const interval = setInterval(updateElapsed, 60000);
    return () => clearInterval(interval);
  }, [order.timestamp]);

  const diffMin = Math.floor((Date.now() - order.timestamp) / 1000 / 60);

  const getWarningStyle = () => {
    if (order.status === "served") return {};
    if (diffMin >= 20) return { color: "#E53935", fontWeight: 700 }; // Urgent
    if (diffMin >= 10) return { color: "var(--accent-amber)", fontWeight: 600 }; // Long wait
    return {};
  };

  const getWarningText = () => {
    if (order.status === "served") return null;
    if (diffMin >= 20) return "URGENT";
    if (diffMin >= 10) return "ATTENTE LONGUE";
    return null;
  };

  return (
    <div className={`order-card ${order.status}`} style={{ display: "flex", flexDirection: "column", gap: "12px", animation: "slideCardIn 400ms ease-out" }}>
      
      {/* Head */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 500, color: "var(--bg-champagne)" }}>
          Table {order.tableNumber}
        </span>
        <span style={{ fontSize: "12px", color: "rgba(243, 235, 221, 0.5)" }}>
          {elapsed}
        </span>
      </div>

      {/* Warning indicators if any */}
      {getWarningText() && (
        <span style={{ fontSize: "11px", letterSpacing: "0.08em", ...getWarningStyle() }}>
          ⚠️ {getWarningText()}
        </span>
      )}

      {/* Items list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", margin: "4px 0", borderTop: "1px solid rgba(215, 195, 165, 0.1)", paddingTop: "10px" }}>
        {order.items.map((item, idx) => (
          <span key={idx} style={{ fontSize: "14px", color: "var(--bg-champagne)" }}>
            {item.qty}x <strong style={{ color: "#FFF" }}>{item.name}</strong>
          </span>
        ))}
      </div>

      {/* Chef Note */}
      {order.note && (
        <div style={{ backgroundColor: "#2A1E10", borderLeft: "2px solid var(--accent-gold)", padding: "8px 10px", borderRadius: "4px" }}>
          <p style={{ fontSize: "13px", fontStyle: "italic", color: "rgba(243, 235, 221, 0.85)" }}>
            Note: {order.note}
          </p>
        </div>
      )}

      {/* Action CTA */}
      {onAction && (
        <button
          onClick={onAction}
          style={{
            marginTop: "8px",
            border: "none",
            height: "44px",
            borderRadius: "6px",
            fontWeight: 700,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            cursor: "pointer",
            width: "100%",
            backgroundColor: order.status === "pending" ? "var(--accent-gold)" : order.status === "preparing" ? "var(--whatsapp-green)" : "#444",
            color: order.status === "pending" ? "var(--bg-olive)" : "#FFF"
          }}
        >
          {order.status === "pending" ? "Prendre en charge" : order.status === "preparing" ? "Commande prête" : "Marquer servie"}
        </button>
      )}

      <style>{`
        @keyframes slideCardIn {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
