"use client";
import React from "react";
import styles from "./PrivacyPolicy.module.css";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";

const PrivacyPolicy = () => {
  return (
    <>
      <HeroPrimary title="Privacy & Policy" text="Privacy & Policy" />
      <div className={styles.policyWrapper}>
        <div className="container">
          <h1 className={styles.mainHeading}>Privacy Policy</h1>

          <p>
            <strong>Last Updated:</strong> October 2025
          </p>

          <p>
            At <strong>Himalayan Essence Ltd</strong>, we respect your privacy
            and are committed to protecting your personal information. This
            Privacy Policy explains how we collect, use, and safeguard your
            information when you visit or make a purchase from our website.
          </p>

          <h2>Information We Collect</h2>
          <p>When you use our website, we may collect the following:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> name, email address,
              billing/shipping address, phone number.
            </li>
            <li>
              <strong>Payment Information:</strong> processed securely by our
              payment providers (we do not store your full credit card details).
            </li>
            <li>
              <strong>Website Usage Data:</strong> IP address, browser type, and
              how you interact with our site (for analytics and improvements).
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process and deliver your orders.</li>
            <li>
              Communicate with you about your purchases, promotions, or updates.
            </li>
            <li>Improve our website and customer experience.</li>
            <li>Comply with legal requirements.</li>
          </ul>

          <h2>Sharing Your Information</h2>
          <p>
            We do not sell or rent your personal data. We only share information
            with:
          </p>
          <ul>
            <li>Trusted payment processors (e.g., Stripe, PayPal).</li>
            <li>Delivery services to ship your orders.</li>
            <li>
              Analytics tools (e.g., Google Analytics) to improve our website.
            </li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement reasonable safeguards to protect your information.
            However, no online transmission is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience,
            remember your preferences, and analyze site traffic. You can disable
            cookies in your browser settings.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, update,
            or request deletion of your personal data. To make a request, please
            contact us at:{" "}
            <a href="mailto:Himalayanessenceltd@outlook.com">
              Himalayanessenceltd@outlook.com
            </a>
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <p>
            📧{" "}
            <a href="mailto:Himalayanessenceltd@outlook.com">
              Himalayanessenceltd@outlook.com
            </a>
            <br />
            📍 128 City Road, London EC1V 2NX
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
