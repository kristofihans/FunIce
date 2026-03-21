import React, { useState } from 'react';
import './Produse.css';
import { Filter, ChevronDown, ChevronUp, X, Download } from 'lucide-react';

const categories = [
  "Toate",
  "AHT Frigorifice",
  "Brutărie & Panificație",
  "Orizontale",
  "Cofetărie",
  "Servicii Speciale"
];

const subcategoriesData = [
  {
    category: "AHT Frigorifice",
    title: "Congelatoare și Lăzi Frigorifice AHT",
    products: [
      { name: "Paris", image: "productimages/paris.jpg" },
      { name: "Salzburg", image: "productimages/salzburg.jpg" },
      { name: "Macao", image: "productimages/macao.jpg" },
      { name: "AthenXL", image: "productimages/athenxl.jpg" },
      { name: "Sydney", image: "productimages/sydney.jpg" },
      { name: "Montreal", image: "productimages/montreal.jpg" },
      { name: "Miami", image: "productimages/miami.jpg" }
    ]
  },
  {
    category: "AHT Frigorifice",
    title: "Dulapuri Congelatoare Suspendate",
    products: [
      { name: "Kinley", image: "productimages/kinley.jpg" }
    ]
  },
  {
    category: "AHT Frigorifice",
    title: "Vitrine Verticale",
    products: [
      { name: "Vento Hybrid", image: "productimages/vento hybrid.jpg" },
      { name: "Vento Water", image: "productimages/vento water.jpg" },
      { name: "Vento VSV", image: "productimages/vento vsv.jpg" }
    ]
  },
  {
    category: "AHT Frigorifice",
    title: "Lăzi de Înghețată / Congelare",
    products: [
      { name: "Rio", image: "productimages/rio.jpg" },
      { name: "Sao Paulo", image: "productimages/sao paulo.jpg" }
    ]
  },
  {
    category: "AHT Frigorifice",
    title: "Vitrine cu Perdea de Aer",
    products: [
      { name: "Vitrine cu perdea de aer AC", image: "productimages/vitrine cu perdea de aer ac.jpg" }
    ]
  },
  {
    category: "AHT Frigorifice",
    title: "Vitrine Frigorifice Coolpoint AHT",
    products: [
      { name: "RVC-300 Black LED", image: "productimages/RVC-300 Black LED.jpg" }
    ]
  },
  {
    category: "Brutărie & Panificație",
    title: "Cuptoare DEBAG",
    products: [
      { name: "Tehnologie Cuptoare Debag", image: "productimages/debag.jpg" }
    ]
  },
  {
    category: "Brutărie & Panificație",
    title: "Echipamente GIERRE",
    products: [
      { name: "Linia BAKETEK", image: "productimages/Linia Baketek.jpg" },
      { name: "Linia MEGA BAKERY", image: "productimages/Linia Mega Bakery.jpg" },
      { name: "Linia BRIO - SNACKERY", image: "productimages/Linia BRIO - SNACKERY.jpg" }
    ]
  },
  {
    category: "Brutărie & Panificație",
    title: "Sistem de Gătire SOGECO",
    products: [
      { name: "KITCHEN 2.0", image: "productimages/Kitchen 2.0.jpg" },
      { name: "KITCHEN 4.0", image: "productimages/Kitchen 4.0.jpg" }
    ]
  },
  {
    category: "Orizontale",
    title: "Vitrine Frigorifice Orizontale",
    products: [
      { name: "Vitrina Frigorifică Samos Deep", image: "productimages/Vitrina frigorifica Samos Deep.jpg" },
      { name: "Vitrine Frigorifice Basia 2", image: "productimages/Vitrine frigorifice Basia 2.jpg" }
    ]
  },
  {
    category: "Cofetărie",
    title: "Vitrine Pentru Cofetărie",
    products: [
      { name: "Vitrina Frigorifică Innova", image: "productimages/Vitrine frigorifica Innova.jpg" },
      { name: "Vitrina Frigorifică Innova T", image: "productimages/Vitrina frigorifica Innova T.jpg" },
      { name: "Vitrină Cofetărie Cube", image: "productimages/Vitrina frigorifica pentru cofetarie Cube.jpg" }
    ]
  },
  {
    category: "Servicii Speciale",
    title: "Categorii Speciale și Servicii",
    products: [
      { name: "Echipamente AHT Recondiționate", image: "productimages/Echipamente AHT reconditionate.jpg" },
      { name: "Echipamente AHT pe Cel.ro", image: "productimages/Echipamente AHT pe Cel.ro.jpg" }
    ]
  }
];

const CollapsableSubcategory = ({ subcat, isOpen, onToggle, onProductClick }) => {
  const subcatImage = subcat.products[0]?.image;

  return (
    <div className="subcategory-wrapper">
      <button 
        className={`subcategory-header glass-card ${isOpen ? 'open' : ''}`} 
        onClick={onToggle}
      >
        <div className="subcategory-header-main">
          {subcatImage && <img src={subcatImage} alt={subcat.title} className="subcategory-header-img" />}
          <div className="subcategory-title-container">
            <span className="subcategory-tag">{subcat.category}</span>
            <h2 className="subcategory-title">{subcat.title}</h2>
          </div>
        </div>
        <div className="subcategory-icon">
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      <div className={`subcategory-content ${isOpen ? 'expanded' : ''}`}>
        <div className="product-grid">
          {subcat.products.map((product, idx) => (
            <div key={idx} className="product-card glass-card" onClick={() => onProductClick(product)}>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Produse = () => {
  const [activeCategory, setActiveCategory] = useState("Toate");
  
  // Track open states independently using an object map
  const [openSubcats, setOpenSubcats] = useState({});
  
  // Lightbox state
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredSubcats = activeCategory === "Toate" 
    ? subcategoriesData 
    : subcategoriesData.filter(s => s.category === activeCategory);

  const toggleSubcat = (index) => {
    setOpenSubcats(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const closeLightbox = () => {
    setSelectedProduct(null);
  };

  const getProductDescription = (name) => {
    const descriptions = {
      "Paris": "Lada frigorifică AHT Paris oferă o vizibilitate maximă a produselor și un volum generos cu eficiență energetică de top. Clasic, durabil și usor de întreținut.",
      "Salzburg": "Design compact cu uși culisante din sticlă, perfect pentru spații comerciale medii, cu un consum energetic optimizat.",
      "Macao": "Insulă frigorifică inovatoare cu control electronic, oferind o expunere panoramică ideală pentru supermarketuri și retail.",
      "AthenXL": "Capacitate extra-large pentru produse congelate, cu un design robust, iluminare LED și decongelare semi-automată complet integrată.",
      "Sydney": "Design curbat modern și ergonomic, maximizând capacitatea de stocare și vizibilitatea. Se integrează perfect în orice configurație comercială.",
      "Montreal": "Soluție premium cu uși push-pull. Design form-factor minimalist pentru cel mai înalt grad de vizibilitate a produselor și accesibilitate.",
      "Miami": "Tehnologie avansată cu cel mai mic consum de energie din clasa sa. Vitrină panoramică de nivel înalt, ideală pentru lanțuri moderne de retail.",
      "Kinley": "Dulap frigorific suspendat revoluționar, oferind spațiu adițional de vânzare direct deasupra insulelor de congelare existente, optimizând metrii pătrați.",
      "Vento Hybrid": "Vitrina frigorifică verticală plug-in, ce funcționează independent. Instalare usoara, fără emisii majore de căldură în magazin.",
      "Vento Water": "Sistem vertical multi-deck conectat la o rețea de apă (Water loop) pentru o recuperare eficientă a căldurii și un design ultra-subțire.",
      "Vento VSV": "Vento VSV reprezintă inovația supremă AHT, cu instalare rapidă de tip plug & play, flux de aer optimizat și un volum uriaș de depozitare flexibilă.",
      "Rio": "Formă curbată și plată, perfectă pentru promovarea înghețatei și a produselor de impuls poziționate strategic direct la casa de marcat.",
      "Sao Paulo": "Vizibilitate incredibilă cu uși frontale speciale arcuite asimetric, menținând calitatea înghețatei la cele mai inalte standarde posibile.",
      "Vitrine cu perdea de aer AC": "Vitrină deschisă grab-and-go, cu perdea de aer stabilă și răcire ventilată, asigurând prospețimea perfectă a produselor alimentare.",
      "RVC-300 Black LED": "Vitrină frigorifică elegantă pentru băuturi, într-un design complet negru mat, o ușă vitrată termo-izolantă și iluminare interioară LED vibrantă.",
      "Tehnologie Cuptoare Debag": "Inovator și extrem de durabil. Cuptoare premium germane de patiserie si panificație destinate coacerii impecabile asistate de funcții abur inteligente.",
      "Linia BAKETEK": "Performanță termodinamică pentru brutării profesionale intensiv tranzitate. Construcție durabilă Gierre din oțel inoxidabil de top.",
      "Linia MEGA BAKERY": "Cea mai robustă alegere comercială pentru un flux de producție continuu, oferind volume de coacere excelente și distribuție precisă a temperaturii.",
      "Linia BRIO - SNACKERY": "Compact dar absolut puternic. Formatul ideal pentru gatitul de snack-uri, pentru patiserii mici, gastro-bar-uri, bistro-uri și covrigării.",
      "KITCHEN 2.0": "Echipament versatil și inteligent SOGECO pentru gastronomie. Garantează un răspuns rapid la cerința permanentă a oricărei bucătării dinamice.",
      "KITCHEN 4.0": "Noua eră a sistemelor de gătire profesionale. Beneficiază de un control digital complet intuitiv, precizie maximă și curățare complet automatizată.",
      "Vitrina Frigorifică Samos Deep": "Design excelent la superlativ, oferind o adâncime de dispunere mărită pentru o prezentare impresionantă a selecțiilor de brânzeturi, cărnuri și mezeluri.",
      "Vitrine Frigorifice Basia 2": "Vitrină panoramică de servire ireproșabilă. Un sistem fiabil cu ventilație internă asistată, expunere mare și design front end extrem de curat.",
      "Vitrina Frigorifică Innova": "Eleganță formidabilă prin detalii. Sticlă frontală dreaptă, minimalism de lux absolut și finisaje premium, perfect dedicate pentru cofetării rafinate.",
      "Vitrina Frigorifică Innova T": "Variația superioară a faimoasei game Innova echipată cu geam arcuit. Aport maxim de vizibilitate vizuală frontală pentru prajituri și torturi artizanale.",
      "Vitrină Cofetărie Cube": "Echipament cu formă compactă, stil exclusiv perfect cubic. Iluminare perimtrală interioară avansată ce atrage direct privirea către colecțiile dulci expuse.",
      "Echipamente AHT Recondiționate": "Standardele stricte de calitate AHT, făcute mai accesibile. Seria de echipamente riguros testate în centru, recondiționate și garantate sa opereze impecabil.",
      "Echipamente AHT pe Cel.ro": "Cele mai apreciate variante AHT selecționate și stocate pentru achiziție sigură direct prin rețelele noastre de platforme partenere locale și Cel.ro."
    };
    return descriptions[name] || "Echipament profesional de top, fabricat integral sub cele mai înalte norme de calitate internațională. Proiectat special pentru a oferi funcționalitate ireproșabilă, eficiență energetică, și susținere excelentă în orice mediu solicitant.";
  };

  return (
    <div className="produse-page">
      {/* Lightbox */}
      {selectedProduct && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content glass-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>
            <div className="lightbox-image-wrapper">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            <div className="lightbox-info">
              <h2>{selectedProduct.name}</h2>
              <p>{getProductDescription(selectedProduct.name)}</p>
              <a 
                href="https://www.funice.ro/ro/produse/" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-primary download-btn"
              >
                <Download size={18} />
                Descarcă Fișa Tehnică
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Header */}
      <section className="produse-header animate-fade-in">
        <div className="container">
          <h1 className="page-title text-gradient">Produsele Noastre</h1>
          <p className="page-subtitle">Explorați gama noastră completă de echipamente profesionale.</p>
        </div>
      </section>

      {/* Filter Menu */}
      <section className="filter-section container">
        <div className="filter-scroll">
          <div className="category-filters">
            <div className="filter-icon" aria-label="Filtrează">
              <Filter size={20} />
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  // Optionally close all when filtering, or keep state
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Subcategories List */}
      <section className="section container pt-0">
        <div className="subcategories-container">
          {filteredSubcats.map((subcat, originalIndex) => {
            // Find global index to keep toggle state consistent even when filtered
            const globalIndex = subcategoriesData.findIndex(s => s.title === subcat.title);
            return (
              <CollapsableSubcategory 
                key={globalIndex}
                subcat={subcat}
                isOpen={!!openSubcats[globalIndex]}
                onToggle={() => toggleSubcat(globalIndex)}
                onProductClick={(product) => setSelectedProduct(product)}
              />
            )
          })}
        </div>
      </section>
    </div>
  );
};

export default Produse;
