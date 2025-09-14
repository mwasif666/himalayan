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
            We respect and are committed to protecting your privacy. When you
            visit our site, we may collect personal information. We also
            automatically receive and record information in our server logs from
            your browser, including your IP address, cookie information, and
            pages visited. We will not sell your personal data to anyone.
          </p>

          <h2>Safety Rules</h2>
          <p>
            Your payment and personal information are always safe. Our Secure
            Sockets Layer (SSL) software is the industry standard and among the
            best software available today for secure business transactions. It
            encrypts all your personal information, including credit card
            number, name and address, so it cannot be read over the Internet.
          </p>

          <h2>Data Controllers and Data Protection Officer</h2>
          <p>
            An organisation who collects, uses and manages personal data as you
            shop, is known as a <strong>Data Controller</strong>. The person
            whose job it is to make sure we act in accordance with the law is
            the <strong>Data Protection Officer</strong>. It’s who you should
            contact if you have any concerns over the use of your data.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
