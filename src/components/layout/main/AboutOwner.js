import React from "react";
import styles from "./HimalayanEssenceCard.module.css";

/**
 * Props:
 *  - imageUrl (string) optional
 *  - message (string) optional
 *  - partners (array of strings) optional
 */
export default function HimalayanEssenceCard({
  imageUrl = "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80",
  message = "Himalayan Essence Ltd — crafting natural, pure Himalayan salts for wellness and culinary use. Our mission is to deliver premium quality and sustainable sourcing.",
  partners = ["Q H Dang", "Amir Sattar"],
}) {
  return (
    <div className={`container py-4 ${styles.cardWrap}`}>
      <div className={`row align-items-center ${styles.card}`}>
        {/* Left: image */}
        <div className="col-12 col-md-4 text-center mb-3 mb-md-0">
          <div className={styles.imageContainer}>
            <img
              src={imageUrl}
              alt="Himalayan Essence"
              className={styles.image}
            />
          </div>
        </div>

        {/* Right: message & names */}
        <div className="col-12 col-md-8">
          <div className={styles.content}>
            <h2 className={styles.companyName}>Himalayan Essence Ltd</h2>
            <p className={styles.message}>{message}</p>

            <div className={styles.partnersBlock}>
              <h5 className={styles.partnersTitle}>Business Partners</h5>
              <ul className={styles.partnerList}>
                {partners.map((p, i) => (
                  <li key={i} className={styles.partnerItem}>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.ctaRow}>
              <button
                type="button"
                className={`btn btn-primary me-2 ${styles.cta}`}
              >
                Contact
              </button>
              <button
                type="button"
                className={`btn btn-outline-secondary ${styles.cta}`}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   File: HimalayanEssenceCard.module.css
   Save this as HimalayanEssenceCard.module.css next to the JSX file
   ========================= */
