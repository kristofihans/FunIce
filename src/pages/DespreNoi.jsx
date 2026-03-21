import React, { useState, useEffect } from 'react';
import './DespreNoi.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sliderData = [
  {
    image: 'productimages/vento vsv.jpg',
    title: 'Soluții Frigorifice Premium',
    description: 'Echipamente de refrigerare și congelare la standarde globale.'
  },
  {
    image: 'productimages/Vitrina frigorifica Samos Deep.jpg',
    title: 'Vitrine Frigorifice de Înaltă Calitate',
    description: 'Excelență în prezentarea și conservarea produselor.'
  },
  {
    image: 'productimages/Echipamente AHT pe Cel.ro.jpg',
    title: 'Partenerul Tău de Încredere',
    description: 'Din 1996, oferim cele mai bune soluții pentru afacerea ta.'
  }
];

const DespreNoi = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderData.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderData.length - 1 : currentSlide - 1);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="home-page">
      {/* Hero Slider Section */}
      <section 
        className="hero-slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sliderData.map((slide, index) => (
          <div 
            key={index} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url("${slide.image}")` }}
          >
            <div className="slide-overlay">
              <div className="container slide-content animate-fade-in">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-desc">{slide.description}</p>
                <div className="mt-8" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="#company-info" className="btn btn-primary">Află Mai Multe</a>
                  <Link to="/produse" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)' }}>Vezi Produsele Noastre</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={32} />
        </button>
        <button className="slider-btn next" onClick={nextSlide} aria-label="Next slide">
          <ChevronRight size={32} />
        </button>
        
        <div className="slider-dots">
          {sliderData.map((_, index) => (
            <button 
              key={index}
              className={`dot-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Company Info Section */}
      <section id="company-info" className="section company-section">
        <div className="container">
          <div className="company-grid">
            
            <div className="company-content animate-fade-in">
              <h2 className="section-title text-gradient">Tradiție și Excelență</h2>
              <div className="info-blocks">
                <div className="glass-card info-card">
                  <p>
                    <strong>Fun Ice SRL</strong>, firmă înființată în 1996, în București, având filiala și în Oradea, oraș în care din 1998 a devenit și sediul central al societății.
                  </p>
                  <p className="mt-4">
                    <strong>Obiectul principal de activitate:</strong> comerț cu ridicata nespecializat.
                  </p>
                  <ul className="activity-list mt-4">
                    <li><span className="dot">•</span> Vânzare echipamente frigorifice AHT (Austria)</li>
                    <li><span className="dot">•</span> Vânzare echipamente brutărie și panificație Debag (Germania)</li>
                    <li><span className="dot">•</span> Reparații echipamente frigorifice AHT</li>
                    <li><span className="dot">•</span> Reparații echipamente de brutărie și panificație Debag</li>
                    <li><span className="dot">•</span> Instalare, montaj echipamente AHT și Debag</li>
                  </ul>
                </div>

                <div className="glass-card info-card mt-8">
                  <h3 className="card-title text-gradient-accent">Lideri Mondiali</h3>
                  <p>
                    <strong>AHT Austria</strong>, înființată în 1983, este unul din liderii mondiali în producerea echipamentelor de refrigerare sau congelare. Echipamentele AHT sunt utilizate la scară largă în lanțurile de magazine cu discount și în supermarket (Lidl, Penny, Aldi, Kaufland, Carrefour, etc) și ale producătorilor de renume în industria de înghețată și băuturi.
                  </p>
                  <p className="mt-4">
                    <strong>Debag</strong> reprezintă tradiția și inovația în tehnologia cuptoarelor de coacere germane. Cuptoarele Debag sunt garantate pentru a rezista datorită celei mai înalte calități tehnice. Garanție pe viață oferită camerei de coacere.
                  </p>
                </div>
              </div>
            </div>

            <div className="company-sidebar">
              <div className="glass-card partners-card sticky-card">
                <h3 className="card-title text-gradient-accent">Partenerii Noștri</h3>
                <div className="partners-list">
                  <span>Hochland</span>
                  <span>Betty Ice</span>
                  <span>Bucovina SA</span>
                  <span>Good People</span>
                  <span>Ati Cream</span>
                  <span>Top Gel</span>
                  <span>Ice Dyp Bals</span>
                  <span>Secret Prod</span>
                  <span>Perena Prod</span>
                  <span>Alpin 57 Lux</span>
                  <span>Crazy Ice</span>
                  <span>Calitas</span>
                  <span>Elion Constanța</span>
                  <span>Nelson Prod</span>
                  <span>Cicom Târgoviște</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default DespreNoi;
