import React, { useState, useEffect } from 'react';
import './DespreNoi.css';
import { ChevronLeft, ChevronRight, Snowflake } from 'lucide-react';
import { Link } from 'react-router-dom';

const localPartners = [
  { name: 'Betty Ice', file: 'Betty Ice.webp' },
  { name: 'Alpin 57 Lux', file: 'alpin 57 lux.webp' },
  { name: 'Ati Cream', file: 'ati cream.jpg' },
  { name: 'Bucovina SA', file: 'bucovina SA.jpg' },
  { name: 'Cicom Târgoviște', file: 'cicom targoviste.png' },
  { name: 'Crazy Ice', file: 'crazy ice.jpg' },
  { name: 'Elion Constanța', file: 'elion constanta.jpg' },
  { name: 'Hochland', file: 'hochland.jpg' },
  { name: 'Ice Dyp Bals', file: 'ice dyp balas.jpg' },
  { name: 'Nelson Prod', file: 'nelson prod.png' },
  { name: 'Perena Prod', file: 'perena prod.webp' },
  { name: 'Top Gel', file: 'top gel.png' }
];

const PartnerLogoLocal = ({ partner }) => {
  return (
    <div className="partner-logo-wrapper">
      <img 
        src={`parteneriinostri/${partner.file}`} 
        alt={partner.name} 
        loading="lazy"
        className="partner-logo-img-native"
        title={partner.name}
      />
    </div>
  );
};

const DespreNoi = () => {
  return (
    <div className="home-page">
      {/* Static Hero Section */}
      <section 
        className="hero-static"
        style={{ backgroundImage: `url("/productimages/vento vsv.jpg")` }}
      >
        <div className="slide-overlay">
          <div className="container slide-content animate-fade-in">
            <h1 className="slide-title">Soluții Frigorifice Premium</h1>
            <p className="slide-desc">Echipamente de refrigerare și congelare la standarde globale</p>
            <div className="mt-8" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#company-info" className="btn btn-primary">Află Mai Multe</a>
              <Link to="/produse" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)' }}>Vezi Produsele Noastre</Link>
            </div>
          </div>
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

            <div className="company-sidebar flex-center-col" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', background: 'rgba(5, 10, 20, 0.4)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 50px rgba(14, 165, 233, 0.1)' }}>
               <Snowflake size={180} color="var(--accent-light)" strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 30px rgba(14, 165, 233, 0.6))', animation: 'spin-slow 30s linear infinite' }} />
               <h2 style={{ fontSize: '4.5rem', fontWeight: 800, marginTop: '1.5rem', background: 'linear-gradient(to right, #fff, var(--accent-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}>FunIce</h2>
               <p style={{ color: 'var(--secondary-text)', letterSpacing: '6px', textTransform: 'uppercase', marginTop: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>Din 1996</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand New Full Width Partners Marquee Section */}
      <section className="partners-full-section">
        <h2 className="section-title text-gradient-primary text-center" style={{ marginBottom: '2rem' }}>Partenerii Noștri</h2>
        <div className="partners-marquee-container">
          <div className="partners-marquee">
            {localPartners.map((p, idx) => <PartnerLogoLocal key={`orig-${idx}`} partner={p} />)}
            {/* Duplicate lines for ultra-wide seamless looping */}
            {localPartners.map((p, idx) => <PartnerLogoLocal key={`dup1-${idx}`} partner={p} />)}
            {localPartners.map((p, idx) => <PartnerLogoLocal key={`dup2-${idx}`} partner={p} />)}
            {localPartners.map((p, idx) => <PartnerLogoLocal key={`dup3-${idx}`} partner={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DespreNoi;
