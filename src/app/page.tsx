import FaceWireframeCanvas from "../components/FaceWireframeCanvas";
import StickyNavbar from "../components/StickyNavbar";
import WhooshButton from "../components/WhooshButton";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <StickyNavbar />
      <main className={styles.main}>
        <div className={styles.grid}>
          <section className={styles.heroText} id="home" data-section="home">
            <div className={styles.heroNameBlock}>
              <h1>Carlos Bolívar</h1>
            </div>
            <div className={styles.heroSloganBlock}>
              <p>Architecting Systems. Automating Growth.</p>
            </div>
            <div className={styles.heroCtas}>
              <WhooshButton label="View Work" href="#work" />
              <WhooshButton label="Get in Touch" href="#contact" />
            </div>
          </section>
          <section className={styles.heroFace} data-section="home">
            <div className={styles.faceCanvas}>
              <FaceWireframeCanvas />
            </div>
          </section>

          <section className={styles.workFilter} id="work" data-section="work">
            <h2>Work Filters</h2>
            <p>All · Workflow Automation · Backend Engineering · Full Stack Web · System Optimization</p>
            <div>
              <h3>Operational Automation Suite</h3>
              <p>Workflow Automation</p>
              <p>
                Engineered custom browser extensions and desktop utilities to
                eliminate manual data entry, optimizing internal business
                processes for high-volume operations.
              </p>
            </div>
            <div>
              <h3>Legacy Data Migration Engine</h3>
              <p>Backend Engineering</p>
              <p>
                Developed high-fidelity scraping and parsing scripts to migrate
                critical data between legacy architectures and modern
                SharePoint/Cloud environments.
              </p>
            </div>
            <div>
              <h3>Scalable Inventory Architecture</h3>
              <p>Full Stack Web</p>
              <p>
                Designed secure, scalable database architectures for inventory
                management systems, handling high-volume transactions for
                private clients.
              </p>
            </div>
            <div>
              <h3>EdTech Platform Optimization</h3>
              <p>System Optimization</p>
              <p>
                Optimized a virtual learning environment, reducing daily
                support inquiries by 90% through backend stability enhancements
                and custom administrative tools.
              </p>
            </div>
          </section>
          <section className={styles.workA} data-section="work">
            <h3>Operational Automation Suite</h3>
            <p>Workflow Automation</p>
            <p>Node.js · Chrome Extensions (Manifest V3) · Power Automate</p>
          </section>
          <section className={styles.workB} data-section="work">
            <h3>Legacy Data Migration Engine</h3>
            <p>Backend Engineering</p>
            <p>Python · XML Parsing · SQL · PowerShell</p>
          </section>

          <section className={styles.experienceDate} id="experience" data-section="experience">
            <h3>Dec 2025 – Present</h3>
            <p>Openrise</p>
          </section>
          <section className={styles.experienceRole} data-section="experience">
            <h3>Lead Developer</h3>
            <p>Designing open source tools focused on technical efficiency.</p>
          </section>

          <section className={styles.experienceDate} data-section="experience">
            <h3>Jul 2018 – Present</h3>
            <p>Freelance · Remote</p>
          </section>
          <section className={styles.experienceRole} data-section="experience">
            <h3>Freelance Software Developer</h3>
            <p>
              Delivering end-to-end software solutions and scalable web
              platforms using a robust stack (Laravel, Vue.js, Node.js).
              Specializing in custom workflow automation tools that solve
              operational inefficiencies.
            </p>
          </section>

          <section className={styles.experienceDate} data-section="experience">
            <h3>Apr 2025 – Nov 2025</h3>
            <p>BetterWorld Technology</p>
          </section>
          <section className={styles.experienceRole} data-section="experience">
            <h3>Service Desk Team Lead (Technical)</h3>
            <p>
              Led automated reporting workflows using Node.js and API
              integrations. Achieved record-breaking CSAT scores for 4
              consecutive months through data-driven strategy and team
              restructuring.
            </p>
          </section>

          <section className={styles.experienceDate} data-section="experience">
            <h3>Jan 2024 – Mar 2025</h3>
            <p>BetterWorld Technology</p>
          </section>
          <section className={styles.experienceRole} data-section="experience">
            <h3>IT Services Delivery Associate</h3>
            <p>
              Managed complex network configurations and infrastructure
              projects. Developed Python automation scripts for data migration
              and custom Chrome Extensions to streamline engineering
              operations.
            </p>
          </section>

          <section className={styles.experienceDate} data-section="experience">
            <h3>Apr 2023 – Dec 2023</h3>
            <p>Inglés en Español</p>
          </section>
          <section className={styles.experienceRole} data-section="experience">
            <h3>Technical Support Associate</h3>
            <p>
              Managed technical maintenance of web platforms (Wix/Velo) and
              standardized digital evaluation tools to optimize organizational
              intake processes.
            </p>
          </section>

          <section className={styles.experienceDate} data-section="experience">
            <h3>Feb 2022 – Feb 2023</h3>
            <p>Centro Venezolano Americano del Zulia</p>
          </section>
          <section className={styles.experienceRole} data-section="experience">
            <h3>IT Academic Analyst</h3>
            <p>
              Led digital transformation initiatives, conducting advanced data
              analysis (Pareto/Ishikawa) to identify bottlenecks and developing
              web tools to increase processing efficiency by 500%.
            </p>
          </section>

          <section className={styles.about} id="about" data-section="about">
            <h2>About</h2>
            <h3>Product-minded Full Stack Engineer & Operations Leader.</h3>
            <p>
              With over 6 years of experience, I bridge the gap between complex
              architectural logic and operational efficiency. I specialize in
              building scalable web applications (Next.js, Laravel) and
              engineering internal tools that directly solve business problems.
            </p>
            <p>
              My background blends deep technical expertise, ranging from Python
              automation to Generative AI integration, with strategic
              leadership. I don't just write code; I design systems that reduce
              friction, optimize workflows, and drive measurable growth.
            </p>
            <p>Core Stack: React, Next.js, Node.js, Python, Laravel.</p>
            <p>Focus: Workflow Automation, Immersive Web, System Architecture.</p>
            <p>Languages: Spanish (Native), English (Fluent), Italian (Intermediate).</p>
          </section>
          <section className={styles.contact} id="contact" data-section="contact">
            <h2>Contact</h2>
            <p>carlosabolivart@gmail.com</p>
            <p>LinkedIn: /in/carlos-alejandro-bolivar</p>
            <p>GitHub: github.com/kbtale</p>
            <p>Location: Maracaibo, Venezuela</p>
          </section>
        </div>
      </main>
    </div>
  );
}
