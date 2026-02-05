import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import FaceWireframeCanvas from "../components/FaceWireframeCanvas";
import ParallaxTitle from "../components/ParallaxTitle";
import ProjectsSection from "../components/ProjectsSection";
import StickyNavbar from "../components/StickyNavbar";
import WhooshButton from "../components/WhooshButton";
import WireframeGridCanvas from "../components/WireframeGridCanvas";
import { projects } from "../data/projects";
import styles from "./page.module.css";

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className={styles.page}>
      <div className={styles.wireframeCanvas} aria-hidden="true">
        <WireframeGridCanvas />
      </div>
      <StickyNavbar />
      <main className={styles.main}>
        <div className={styles.grid}>
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
          <section className={styles.heroFace} data-section="home">
            <div className={styles.faceCanvas}>
              <FaceWireframeCanvas />
            </div>
          </section>

          <ProjectsSection projects={projects} />

          {t.raw("experience.items").map(
            (
              item: {
                date: string;
                company: string;
                role: string;
                description: string;
              },
              index: number
            ) => (
              <Fragment key={`${item.company}-${index}`}>
                <section
                  className={styles.experienceDate}
                  id={index === 0 ? "experience" : undefined}
                  data-section="experience"
                >
                  <h3>{item.date}</h3>
                  <p>{item.company}</p>
                </section>
                <section className={styles.experienceRole} data-section="experience">
                  <h3>{item.role}</h3>
                  <p>{item.description}</p>
                </section>
              </Fragment>
            )
          )}

          <section className={styles.about} id="about" data-section="about">
            <h2>{t("about.title")}</h2>
            <h3>{t("about.subtitle")}</h3>
            {t.raw("about.paragraphs").map((paragraph: string, index: number) => (
              <p key={`${paragraph.slice(0, 16)}-${index}`}>{paragraph}</p>
            ))}
          </section>
          <section className={styles.contact} id="contact" data-section="contact">
            <h2>{t("contact.title")}</h2>
            <p>{t("contact.email")}</p>
            <p>{t("contact.linkedin")}</p>
            <p>{t("contact.github")}</p>
            <p>{t("contact.location")}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
