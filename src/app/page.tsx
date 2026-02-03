import FaceWireframeCanvas from "../components/FaceWireframeCanvas";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <section className={styles.heroText}>
            <h1>[Your Name]</h1>
            <p>[Slogan or short intro that spans two lines]</p>
            <p>[Primary CTA] · [Secondary CTA]</p>
          </section>
          <section className={styles.heroFace}>
            <div className={styles.faceCanvas}>
              <FaceWireframeCanvas />
            </div>
          </section>

          <section className={styles.workFilter}>
            <h2>Work Filters</h2>
            <p>All 3D Web Brand Motion</p>
            <div>
              <h3>Studio Launch</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div>
              <h3>Immersive Product</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
                ad minim veniam.
              </p>
            </div>
            <div>
              <h3>Brand System</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                aute irure dolor in reprehenderit.
              </p>
            </div>
          </section>
          <section className={styles.workA}>
            <h3>Atlas Experience</h3>
            <p>Full-screen 3D brand story with scroll-driven sequences.</p>
            <p>Three.js · R3F · GSAP · 2025</p>
          </section>
          <section className={styles.workB}>
            <h3>Vanta Commerce</h3>
            <p>High-conversion product UI with interactive previews.</p>
            <p>Next.js · Tailwind · Vercel · 2024</p>
          </section>

          <section className={styles.experienceDate}>
            <h3>2024–Present</h3>
            <p>Remote · New York</p>
          </section>
          <section className={styles.experienceRole}>
            <h3>Senior Creative Developer</h3>
            <p>Studio North · Experience Team</p>
            <p>
              Led immersive product storytelling, bridging 3D, motion, and web
              performance.
            </p>
          </section>

          <section className={styles.about}>
            <h2>About</h2>
            <p>
              I design and build interactive brand experiences that feel tactile
              and cinematic. My focus is on 3D, motion, and performance-driven
              UI.
            </p>
            <p>Three.js · R3F · GSAP · WebGL · UI Systems</p>
          </section>
          <section className={styles.contact}>
            <h2>Contact</h2>
            <p>hello@yourdomain.com</p>
            <p>+1 (212) 555-0198</p>
            <p>LinkedIn · GitHub · Behance</p>
          </section>
        </div>
      </main>
    </div>
  );
}
