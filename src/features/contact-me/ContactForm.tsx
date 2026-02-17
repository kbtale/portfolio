"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import WhooshButton from "@/shared/ui/WhooshButton/WhooshButton";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const t = useTranslations("footer.form");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeyPot: "",
  });

  const handleSubmit = async (e?: React.SyntheticEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "", honeyPot: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="honeyPot"
        value={formData.honeyPot}
        onChange={handleChange}
        className={styles.honeyPot}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className={styles.row}>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder={t("namePlaceholder")}
          className={styles.input}
        />
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder={t("emailPlaceholder")}
          className={styles.input}
        />
      </div>

      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder={t("messagePlaceholder")}
        className={styles.textarea}
      />

      <div className={styles.submitWrapper}>
        <WhooshButton
          label={status === "loading" ? t("sending") : t("sendButton")}
          showDot={false}
          className={status === "loading" ? styles.submitDisabled : undefined}
          onClick={(e) => {
            e.preventDefault();
            if (status === "loading") return;
            const form = (e.currentTarget as HTMLElement).closest('form');
            if (form && form.reportValidity()) {
              handleSubmit();
            }
          }}
        />
      </div>

      {status === "success" && (
        <div className={`${styles.statusMessage} ${styles.success}`}>
          {t("success")}
        </div>
      )}
      {status === "error" && (
        <div className={`${styles.statusMessage} ${styles.error}`}>
          {t("error")}
        </div>
      )}
    </form>
  );
}
