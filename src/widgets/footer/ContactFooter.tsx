import { getTranslations } from "next-intl/server";
import styles from "./ContactFooter.module.css";
import pageStyles from "@/app/page.module.css";
import ParallaxTitle from "@/shared/ui/ParallaxTitle/ParallaxTitle";
import ContactForm from "@/features/contact-me/ContactForm";

export default async function ContactFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className={styles.footer} id="contact" data-section="contact">
      <div className={styles.content}>
        {/* ─── Left Column: Title + Headline ─── */}
        <div className={styles.left}>
          <h2>
            <ParallaxTitle
              text={t("sectionTitle")}
              triggerId="contact"
              className={pageStyles.projectsTitle}
              letterClassName={pageStyles.projectsTitleLetter}
              innerClassName={pageStyles.projectsTitleInner}
              glyphClassName={pageStyles.projectsTitleGlyph}
              spaceClassName={pageStyles.projectsTitleSpace}
            />
          </h2>
          <p className={styles.headline}>{t("headline")}</p>
          <p className={styles.tagline}>{t("tagline")}</p>
        </div>

        {/* ─── Right Column: Contact Details ─── */}
        <div className={styles.right}>
          {/* Contact Form */}
          <ContactForm />

          {/* Location */}
          <div className={styles.contactGroup}>
            <h4 className={styles.contactLabel}>{t("locationLabel")}</h4>
            <p className={styles.contactValue}>{t("location")}</p>
          </div>

          {/* Socials */}
          <div className={styles.contactGroup}>
            <h4 className={styles.contactLabel}>{t("socialsLabel")}</h4>
            <div className={styles.socialsList}>
              <a
                href="https://www.linkedin.com/in/carlos-alejandro-bolivar"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg
                  className={styles.socialIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                {t("linkedinLabel")}
              </a>
            <a
                href="https://github.com/kbtale"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg
                  className={styles.socialIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                {t("githubLabel")}
              </a>
              <a
                href="https://www.tiktok.com/@labestiaenlacueva"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 448 512"
                    className={styles.socialIcon}
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14z"/>
                  </svg>
                {t("tiktokLabel")}
              </a>
               <a
                href="https://github.com/kbtale/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <svg
                  className={styles.socialIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                </svg>
                {t("repoLabel")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>{t("copyright")}</p>
        <div className={styles.bottomSocials}>
          <a
            href="https://www.linkedin.com/in/carlos-alejandro-bolivar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bottomSocialLink}
            aria-label="LinkedIn"
          >
            <svg
              className={styles.bottomSocialIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://github.com/kbtale"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bottomSocialLink}
            aria-label="GitHub"
          >
            <svg
              className={styles.bottomSocialIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
