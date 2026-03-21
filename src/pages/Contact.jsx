import React, { useState } from 'react';
import './Contact.css';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-header animate-fade-in">
        <div className="container">
          <h1 className="page-title text-gradient">Contactează-ne</h1>
          <p className="page-subtitle">Suntem aici pentru a te ajuta să găsești cele mai bune soluții pentru afacerea ta.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section container pt-0">
        <div className="contact-grid">
          
          {/* Contact Info & Map */}
          <div className="contact-info-wrapper animate-fade-in text-slide-up">
            <div className="glass-card contact-info-card">
              <h3 className="card-title text-gradient-accent mb-8">Informații Contact</h3>
              
              <div className="info-item">
                <div className="icon-wrapper">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="info-title">Sediul Central - Oradea</h4>
                  <p className="info-desc">Strada Exemplu, Nr. 10, Oradea, România</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="info-title">Filiala București</h4>
                  <p className="info-desc">Bulevardul Afacerilor, Nr. 45, București, România</p>
                </div>
              </div>

              <div className="info-item mt-8">
                <div className="icon-wrapper">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="info-title">Telefon</h4>
                  <p className="info-desc">+40 123 456 789</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon-wrapper">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="info-title">Email</h4>
                  <p className="info-desc">office@funice.ro</p>
                </div>
              </div>
            </div>

            <div className="map-container glass-card mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87538.5414845582:21.87902092928574!2d21.87902092928574!3d47.05494491959325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474647e3687621c1%3A0x6bbaeeeae776fdd0!2sOradea!5e0!3m2!1sen!2sro!4v1699999999999!5m2!1sen!2sro"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Oradea"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card form-card">
              <h3 className="card-title text-gradient-accent mb-8">Trimite un Mesaj</h3>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nume Complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ion Popescu"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="ion@exemplu.ro"
                    />
                  </div>
                  <div className="form-group half">
                    <label htmlFor="phone">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="07XX XXX XXX"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mesajul Tău</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Cum te putem ajuta?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''} ${isSuccess ? 'success' : ''}`}
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? 'Se trimite...' : isSuccess ? 'Mesaj Trimis!' : (
                    <>
                      <span>Trimite Mesajul</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
