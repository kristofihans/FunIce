import React, { useState } from 'react';
import './Produse.css';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

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
      { name: "Paris", image: "/productimages/paris.jpg" },
      { name: "Salzburg", image: "/productimages/salzburg.jpg" },
      { name: "Macao", image: "/productimages/macao.jpg" },
      { name: "AthenXL", image: "/productimages/athenxl.jpg" },
      { name: "Sydney", image: "/productimages/sydney.jpg" },
      { name: "Montreal", image: "/productimages/montreal.jpg" },
      { name: "Miami", image: "/productimages/miami.jpg" }
    ]
  },
  {
    category: "AHT Frigorifice",
    title: "Dulapuri Congelatoare Suspendate",
    products: [
      { name: "Kinley", image: "/productimages/kinley.jpg" }
    ]
  },
  {
    category: "AHT Frigorifice",
    title: "Vitrine Verticale",
    products: [
      { name: "Vento Hybrid", image: "/productimages/vento hybrid.jpg" },
      { name: "Vento Water", image: "/productimages/vento water.jpg" },
      { name: "Vento VSV", image: "/productimages/vento vsv.jpg" }
    ]
  },
  {
    category: "AHT Frigorifice",
    title: "Lăzi de Înghețată / Congelare",
    products: [
      { name: "Rio", image: "/productimages/rio.jpg" },
      { name: "Sao Paulo", image: "/productimages/sao paulo.jpg" }
    ]
  },
  {
    category: "AHT Frigorifice",
    title: "Vitrine cu Perdea de Aer",
    products: [
      { name: "Vitrine cu perdea de aer AC", image: "/productimages/vitrine cu perdea de aer ac.jpg" }
    ]
  },
  {
    category: "AHT Frigorifice",
    title: "Vitrine Frigorifice Coolpoint AHT",
    products: [
      { name: "RVC-300 Black LED", image: "/productimages/RVC-300 Black LED.jpg" }
    ]
  },
  {
    category: "Brutărie & Panificație",
    title: "Cuptoare DEBAG",
    products: [
      { name: "Tehnologie Cuptoare Debag", image: "/productimages/debag.jpg" }
    ]
  },
  {
    category: "Brutărie & Panificație",
    title: "Echipamente GIERRE",
    products: [
      { name: "Linia BAKETEK", image: "/productimages/Linia Baketek.jpg" },
      { name: "Linia MEGA BAKERY", image: "/productimages/Linia Mega Bakery.jpg" },
      { name: "Linia BRIO - SNACKERY", image: "/productimages/Linia BRIO - SNACKERY.jpg" }
    ]
  },
  {
    category: "Brutărie & Panificație",
    title: "Sistem de Gătire SOGECO",
    products: [
      { name: "KITCHEN 2.0", image: "/productimages/Kitchen 2.0.jpg" },
      { name: "KITCHEN 4.0", image: "/productimages/Kitchen 4.0.jpg" }
    ]
  },
  {
    category: "Orizontale",
    title: "Vitrine Frigorifice Orizontale",
    products: [
      { name: "Vitrina Frigorifică Samos Deep", image: "/productimages/Vitrina frigorifica Samos Deep.jpg" },
      { name: "Vitrine Frigorifice Basia 2", image: "/productimages/Vitrine frigorifice Basia 2.jpg" }
    ]
  },
  {
    category: "Cofetărie",
    title: "Vitrine Pentru Cofetărie",
    products: [
      { name: "Vitrina Frigorifică Innova", image: "/productimages/Vitrine frigorifica Innova.jpg" },
      { name: "Vitrina Frigorifică Innova T", image: "/productimages/Vitrina frigorifica Innova T.jpg" },
      { name: "Vitrină Cofetărie Cube", image: "/productimages/Vitrina frigorifica pentru cofetarie Cube.jpg" }
    ]
  },
  {
    category: "Servicii Speciale",
    title: "Categorii Speciale și Servicii",
    products: [
      { name: "Echipamente AHT Recondiționate", image: "/productimages/Echipamente AHT reconditionate.jpg" },
      { name: "Echipamente AHT pe Cel.ro", image: "/productimages/Echipamente AHT pe Cel.ro.jpg" }
    ]
  }
];

const CollapsableSubcategory = ({ subcat, isOpen, onToggle }) => {
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
            <div key={idx} className="product-card glass-card">
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

  const filteredSubcats = activeCategory === "Toate" 
    ? subcategoriesData 
    : subcategoriesData.filter(s => s.category === activeCategory);

  const toggleSubcat = (index) => {
    setOpenSubcats(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="produse-page">
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
              />
            )
          })}
        </div>
      </section>
    </div>
  );
};

export default Produse;
