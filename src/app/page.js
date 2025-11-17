
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homePage}>
      {/* Hero Section */}
      <section className={styles.heroSection} id="hero-section">
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Find Comprehensive Vehicle Information
            </h1>
            <p className={styles.heroSubtitle}>
              Get instant access to detailed car information using Danish number plates. 
              Check fuel consumption, insurance details, tax information, and more.
            </p>
            <div className={styles.heroFeatures}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🚗</span>
                <span>Vehicle Details</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>💰</span>
                <span>Tax Information</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>🛡️</span>
                <span>Insurance Details</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className={styles.infoSection} id="info-section">
        <div className="container">
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <h3>Quick Vehicle Lookup</h3>
              <p>
                Simply enter a Danish number plate in the format AB12345 to get 
                comprehensive vehicle information instantly.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3>Detailed Information</h3>
              <p>
                Access fuel consumption, Euro norms, annual tax rates, and 
                insurance information for any registered vehicle.
              </p>
            </div>
            <div className={styles.infoCard}>
              <h3>Up-to-Date Data</h3>
              <p>
                Our database contains current information about vehicle 
                specifications and Danish registration details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection} id="how-it-works-section">
        <div className="container">
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Enter Number Plate</h4>
              <p>Type the Danish number plate in the search field above</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>Get Results</h4>
              <p>View comprehensive vehicle information and specifications</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Explore Details</h4>
              <p>Check photos, technical details, and registration information</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
