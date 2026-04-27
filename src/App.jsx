import { useMemo, useRef } from "react";
import "./App.css";

// 💡 NOTES SUR LES CHEMINS :
// Les fichiers placés dans le dossier "public" s'appellent depuis la racine "/".
const PWA_URL = "https://amazing-sfogliatella-c713d8.netlify.app/";
const APK_URL = "/app/apk/estim.apk"; // Assure-toi que le fichier est bien dans public/app/apk/
const SCREENSHOT_URL = "/img/screenshot_home_app.png"; // Assure-toi que le fichier est bien dans public/img/screenshot_home_app.png
const LOGO_URL = "/img/logo.png"; // Assure-toi que le fichier est bien dans public/img/logo.png

function useDevice() {
  return useMemo(() => {
    const ua = navigator.userAgent || "";
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    return { isIOS, isAndroid };
  }, []);
}

function IconDownload(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function IconCalendar(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconBell(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7" />
      <path d="M10.3 19a2 2 0 0 0 3.4 0" />
    </svg>
  );
}

function IconCheckCircle(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
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
    downloadRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function handleAndroidClick(e) {
    // Si l'URL de l'APK est valide et n'est pas un lien vide, on laisse le comportement natif (téléchargement)
    if (APK_URL && APK_URL !== "#") return;

    e.preventDefault();
    alert("Le fichier APK sera bientôt disponible au téléchargement.");
  }

  return (
    <>
      <nav className="navbar">
        <div className="brand">
          <img src={LOGO_URL} alt="Logo ESTIM" />
          <h1>ESTIM</h1>
        </div>

        {/* ✅ Bouton navbar — masqué sur petit écran */}
        <a
          href={isIOS ? PWA_URL : APK_URL || "#"}
          className="btn-nav nav-download-btn"
          onClick={!isIOS && !APK_URL ? scrollToDownload : undefined}
          aria-label="Obtenir l'app"
          download={!isIOS}
        >
          <IconDownload aria-hidden="true" />
          <span>Obtenir l'app</span>
        </a>
      </nav>

      <main className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="title fade-up d2">
              Votre campus,
              <br />
              dans votre <span className="highlight">poche.</span>
            </h1>

            <p className="description fade-up d3">
              L'application officielle pour les étudiants d'ESTIM. Gérez vos
              cours, suivez vos présences et restez connecté au campus en temps
              réel.
            </p>

            <div
              className="download-buttons fade-up d4"
              id="download"
              ref={downloadRef}
            >
              
              {!isAndroid && (
                <a
                  href={PWA_URL}
                  className="dl-btn dl-btn-ios"
                  aria-label="Installer sur iPhone (PWA)"
                >
                  <svg
                    className="dl-btn-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
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
                  href={APK_URL || "#"}
                  className="dl-btn dl-btn-android"
                  onClick={handleAndroidClick}
                  aria-label="Télécharger Android APK"
                  download // 💡 Ajout de l'attribut download ici pour forcer le téléchargement du fichier
                >
                  <svg
                    className="dl-btn-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    style={{ width: "24px", height: "24px" }}
                  >
                    {/* Tête, antennes et yeux combinés en un seul tracé propre */}
                    <path d="M17.52 2.23l1.37-2.38a.3.3 0 00-.1-.4.3.3 0 00-.4.1l-1.39 2.41A8.4 8.4 0 0012 .98a8.4 8.4 0 00-5 1.99L5.61.56a.3.3 0 00-.4-.1.3.3 0 00-.1.4l1.37 2.38C3.83 4.77 2 7.6 2 10.88h20c0-3.28-1.83-6.12-4.48-7.65zM8.08 7.48a.73.73 0 110-1.45.73.73 0 010 1.45zm7.84 0a.73.73 0 110-1.45.73.73 0 010 1.45z" />
                  </svg>
                  <div className="dl-btn-text">
                    <span className="dl-btn-small">Télécharger</span>
                    <span className="dl-btn-label">Android APK</span>
                  </div>
                </a>
              )}
            </div>

            <p className="dl-note fade-up d5">
              iPhone : installation via PWA guidée &nbsp;·&nbsp; Android :
              téléchargement direct de l'APK
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
                  {/* 💡 Remplacement du SVG par ta capture d'écran */}
                  <img
                    src={SCREENSHOT_URL}
                    alt="Capture d'écran de l'application ESTIM"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
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
