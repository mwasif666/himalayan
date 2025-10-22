"use client";
import React from "react";
import styles from "./TermsAndConditions.module.css";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";

const TermsAndConditions = () => {
  return (
    <>
      <HeroPrimary title="Terms & Conditions" text="Terms & Conditions" />

      <div className={styles.termsWrapper}>
        <div className="container">
          <h1 className={styles.mainHeading}>Terms and Conditions</h1>
          <p>
            <strong>Last Updated:</strong> 25/09/2025
          </p>
          <p>
            Welcome to <strong>Himalayan Essence Ltd.</strong>
          </p>

          <p>
            These Terms and Conditions (“Terms”) govern your use of our website{" "}
            <strong>www.himalayanessenceltd.com</strong> and the purchase of our
            products, including Himalayan salt and related items. By accessing
            or using our website, you agree to these Terms. Please read them
            carefully.
          </p>

          <h2>General Information</h2>
          <p>
            This website is owned and operated by{" "}
            <strong>Himalayan Essence Ltd</strong> located in the UK. By using
            this site, you confirm that you are at least 18 years old or are
            using it with the consent of a parent or guardian.
          </p>

          <h2>Products</h2>
          <p>
            We offer natural Himalayan salt and related products. While we
            strive for accuracy, product descriptions, pricing, and availability
            may change without notice. We make no guarantees that all products
            displayed on our site will always be available.
          </p>

          <h2>Pricing and Payment</h2>
          <p>
            All prices are listed in £ (pound sterling) and include/exclude
            applicable taxes as stated. We accept payments through{" "}
            <strong>
              [list accepted payment methods – e.g., credit/debit card, PayPal,
              UPI, etc.]
            </strong>
            . By placing an order, you confirm that you are authorized to use
            the chosen payment method.
          </p>

          <h2>Shipping and Delivery</h2>
          <p>
            Orders are processed within 2 business days after payment
            confirmation. Delivery times depend on your location and shipping
            provider. We are not responsible for delays or damages caused by
            third-party couriers.
          </p>

          <h2>Returns and Refunds</h2>
          <p>
            Here’s a detailed description of product returns, suitable for use
            in a company policy, website section, or internal documentation.
          </p>

          <h3>Product Returns</h3>
          <p>
            Product returns refer to the process in which customers send back
            purchased goods to the seller or manufacturer for various reasons.
            Returns are an essential component of customer service and supply
            chain management, allowing businesses to maintain trust and customer
            satisfaction while ensuring product quality and compliance with
            policies.
          </p>

          <h3>Return Eligibility</h3>
          <p>Customers may return products for several reasons, including:</p>
          <ul>
            <li>
              <strong>Defective or damaged items:</strong> Products that arrive
              broken, malfunctioning, or not as described.
            </li>
            <li>
              <strong>Incorrect product shipped:</strong> The wrong size, color,
              or model was delivered.
            </li>
            <li>
              <strong>Product not matching description:</strong> The item
              differs from online images or specifications.
            </li>
          </ul>

          <h2>Intellectual Property</h2>
          <p>
            All content on this website — including text, images, graphics, and
            logos — is the property of Himalayan Essence Ltd and protected by
            copyright laws. You may not reproduce, distribute, or use our
            content without written permission.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            We are not liable for any damages arising from the use or misuse of
            our products or website. Himalayan salt is a natural product —
            individuals allergic to these products should avoid consumption.
            Always consult a healthcare professional before using our products
            if you have health concerns.
          </p>

          <h2>Privacy</h2>
          <p>
            Your privacy is important to us. Please review our{" "}
            <strong>[Privacy Policy]</strong> to understand how we collect, use,
            and protect your personal data.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. Any changes will be
            posted on this page with the updated date. Continued use of our
            website after changes means you accept the revised Terms.
          </p>

          <h2>Contact Us</h2>
          <p>
            For any questions or concerns regarding these Terms, please contact
            us at:
          </p>
          <p>
            📧{" "}
            <a href="mailto:Himalayanessenceltd@outlook.com">
              Himalayanessenceltd@outlook.com
            </a>
            <br />
            📍 [business address]
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
