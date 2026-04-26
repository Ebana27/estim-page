import { useMemo, useRef } from 'react';
import './App.css';

const PWA_URL = 'https://amazing-sfogliatella-c713d8.netlify.app/';
const APK_URL = '/public/app/apk/estim.apk'; // TODO: collez ici le lien direct vers votre .apk

function useDevice() {
  return useMemo(() => {
    const ua = navigator.userAgent || '';
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    return { isIOS, isAndroid };
  }, []);
}

function IconDownload(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function IconGraduationCap(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M22 10L12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
      <path d="M2 10v6" />
    </svg>
  );
}

function IconCalendar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconBell(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
      <path d="M10.3 19a2 2 0 0 0 3.4 0" />
    </svg>
  );
}

function IconCheckCircle(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function App() {
  const downloadRef = useRef(null);
  const { isIOS, isAndroid } = useDevice();

  function scrollToDownload(e) {
    e.preventDefault();
    downloadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function handleAndroidClick(e) {
    if (APK_URL) return;
    e.preventDefault();
    alert("Le fichier APK sera bientôt disponible.");
  }

  return (
    <>
      <nav className="navbar">
        <div className="brand">ESTIM</div>

        {isIOS ? (
          <a href={PWA_URL} className="btn-nav" aria-label="Obtenir l'app iPhone">
            <IconDownload aria-hidden="true" />
            <span>Obtenir l'app</span>
          </a>
        ) : (
          <a href="#download" className="btn-nav" onClick={scrollToDownload} aria-label="Aller au téléchargement">
            <IconDownload aria-hidden="true" />
            <span>Obtenir l'app</span>
          </a>
        )}
      </nav>

      <main className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="badge fade-up d1">
              <IconGraduationCap aria-hidden="true" />
              Application étudiante
            </div>

            <h1 className="title fade-up d2">
              Votre campus,<br />
              dans votre <span className="highlight">poche.</span>
            </h1>

            <p className="description fade-up d3">
              L'application officielle pour les étudiants d'ESTIM. Gérez vos cours, suivez vos présences et restez
              connecté au campus en temps réel.
            </p>

            <div className="download-buttons fade-up d4" id="download" ref={downloadRef}>
              {!isAndroid && (
                <a href={PWA_URL} className="dl-btn dl-btn-ios" aria-label="Installer sur iPhone (PWA)">
                  <svg className="dl-btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div className="dl-btn-text">
                    <span className="dl-btn-small">Installer sur</span>
                    <span className="dl-btn-label">iPhone</span>
                  </div>
                </a>
              )}

              {!isIOS && (
                <a
                  href={APK_URL || '#'}
                  className="dl-btn dl-btn-android"
                  onClick={handleAndroidClick}
                  aria-label="Télécharger Android APK"
                >
                  <svg className="dl-btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.523 2.227l1.373-2.377a.292.292 0 00-.107-.398.292.292 0 00-.398.107l-1.39 2.408A8.406 8.406 0 0012 .98a8.406 8.406 0 00-4.999 1.987L5.609.559a.292.292 0 00-.398-.107.292.292 0 00-.107.398l1.373 2.377C3.826 4.765 2 7.603 2 10.877h20c0-3.274-1.826-6.112-4.477-7.65zM8.077 7.477a.726.726 0 110-1.452.726.726 0 010 1.452zm7.846 0a.726.726 0 110-1.452.726.726 0 010 1.452zM2 12.048v8.23c0 .806.653 1.46 1.46 1.46h.73v2.923c0 .806.653 1.46 1.46 1.46.805 0 1.458-.654 1.458-1.46v-2.923h3.654v2.923c0 .806.654 1.46 1.46 1.46.805 0 1.458-.654 1.458-1.46v-2.923h.73c.807 0 1.46-.654 1.46-1.46v-8.23H2zm-1.46 0c-.806 0-1.46.653-1.46 1.46v5.846c0 .806.654 1.46 1.46 1.46.807 0 1.46-.654 1.46-1.46v-5.846c0-.807-.653-1.46-1.46-1.46zm21.92 0c-.806 0-1.46.653-1.46 1.46v5.846c0 .806.654 1.46 1.46 1.46.807 0 1.46-.654 1.46-1.46v-5.846c0-.807-.653-1.46-1.46-1.46z" />
                  </svg>
                  <div className="dl-btn-text">
                    <span className="dl-btn-small">Télécharger</span>
                    <span className="dl-btn-label">Android APK</span>
                  </div>
                </a>
              )}
            </div>

            <p className="dl-note fade-up d5">
              iPhone : installation via PWA guidée &nbsp;·&nbsp; Android : téléchargement direct de l'APK
            </p>
          </div>

          <div className="hero-visual fade-up d5">
            <div className="deco deco-1" />
            <div className="deco deco-2" />
            <div className="deco deco-3" />
            <div className="deco deco-4" />

            <div className="phone-container">
              <div className="phone-frame">
                <div className="dynamic-island" />
                <div className="phone-screen" aria-label="Aperçu application">
                  <div className="screen-placeholder">
                    <svg
                      className="screen-placeholder-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                    <div className="screen-placeholder-logo">ESTIM</div>
                    <div className="screen-placeholder-text">
                      Remplacez par votre<br />
                      capture d'écran
                    </div>
                  </div>
                </div>
              </div>

              <div className="feature-pill pill-1">
                <IconCalendar aria-hidden="true" />
                Emploi du temps
              </div>
              <div className="feature-pill pill-2">
                <IconBell aria-hidden="true" />
                Annonces
              </div>
              <div className="feature-pill pill-3">
                <IconCheckCircle aria-hidden="true" />
                Présences
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
