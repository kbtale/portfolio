import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.grid}>
          <section className={styles.heroText}>
            <p>[Nav: Home · Work · About · Contact]</p>
            <h1>[Your Name]</h1>
            <p>[Slogan or short intro that spans two lines]</p>
            <p>[Primary CTA] · [Secondary CTA]</p>
          </section>
          <section className={styles.heroFace}>
            <h2>Wireframe Face</h2>
            <p>[3D placeholder / interactive canvas]</p>
          </section>

          <section className={styles.workFilter}>
            <h2>Work Filters</h2>
            <p>[All] [3D] [Web] [Brand]</p>
          </section>
          <section className={styles.workA}>
            <h3>Project A</h3>
            <p>[Image]</p>
            <p>[Title · Tech stack · Year]</p>
          </section>
          <section className={styles.workB}>
            <h3>Project B</h3>
            <p>[Image]</p>
            <p>[Title · Tech stack · Year]</p>
          </section>

          <section className={styles.experienceDate}>
            <h3>2024–Present</h3>
            <p>[Location]</p>
          </section>
          <section className={styles.experienceRole}>
            <h3>Role & Description</h3>
            <p>[Company · Team]</p>
            <p>[Key achievement or responsibility]</p>
          </section>

          <section className={styles.about}>
            <h2>About</h2>
            <p>
              [Short bio paragraph that spans a couple of lines to test column
              width and rhythm.]
            </p>
            <p>[Skills · Tools · Focus]</p>
          </section>
          <section className={styles.contact}>
            <h2>Contact</h2>
            <p>[Email]</p>
            <p>[Phone]</p>
            <p>[LinkedIn · GitHub · Behance]</p>
          </section>
        </div>
      </main>
    </div>
  );
}
