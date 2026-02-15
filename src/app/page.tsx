import { getTranslations } from "next-intl/server";
import AboutHeader from "../components/AboutHeader";
import ProjectsSection from "../components/ProjectsSection";
import StickyNavbar from "../components/StickyNavbar";
import WhooshButton from "../components/WhooshButton";
import { projects } from "../data/projects";
import ExperienceTimeline, { ExperienceItem } from "../components/ExperienceTimeline";
import LazyFaceCanvas from "../components/LazyFaceCanvas";
import LazyGridCanvas from "../components/LazyGridCanvas";
import CertificationsSection from "../components/CertificationsSection";
import ContactFooter from "../components/ContactFooter";
import styles from "./page.module.css";

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className={styles.page}>
      <div className={styles.wireframeCanvas} aria-hidden="true">
        <LazyGridCanvas />
      </div>
      <StickyNavbar />
      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.stickyTrack}>
            <section className={styles.heroFace}>
              <div className={styles.faceCanvas}>
                <LazyFaceCanvas />
              </div>
            </section>
            <section className={styles.heroText} id="home" data-section="home">
              <div className={styles.heroNameBlock}>
                <h1>{t("hero.name")}</h1>
              </div>
              <div className={styles.heroSloganBlock}>
                <p>{t("hero.slogan")}</p>
              </div>
              <div className={styles.heroCtas}>
                <WhooshButton label={t("cta.viewWork") } href="#projects" />
                <WhooshButton label={t("cta.getInTouch")} href="#contact" />
              </div>
            </section>
            <section className={styles.about} id="about" data-section="about">
              <AboutHeader 
                title={t("about.title")} 
                subtitle={t("about.subtitle")} 
              />
              {t.raw("about.paragraphs").map((paragraph: string, index: number) => (
                <p key={`${paragraph.slice(0, 16)}-${index}`}>{paragraph}</p>
              ))}
            </section>
          </div>


          <ProjectsSection projects={projects} />

          <ExperienceTimeline items={t.raw("experience.items") as ExperienceItem[]} />

          <CertificationsSection />

          <ContactFooter />
        </div>
      </main>
    </div>
  );
}
