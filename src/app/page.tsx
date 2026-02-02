import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Portfolio</h1>
        <section>
          <h2>About Me</h2>
          <p>[Placeholder for About Me]</p>
        </section>
        <section>
          <h2>Projects</h2>
          <p>[Placeholder for Projects]</p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>[Placeholder for Contact]</p>
        </section>
      </main>
    </div>
  );
}
