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
          <h1 className={styles.mainHeading}>Terms & Conditions</h1>
          <p>
            By placing an order for goods on{" "}
            <strong>himalayanessenceltd</strong> you indicate your{" "}
            <strong>agreement</strong> to our terms and conditions. Ideally, all
            payments must be made using your own payment method and with
            sufficient funds to make the payment. Fraudulent use of the payment
            method will be reported to the appropriate authorities.
            Himalayanessenceltd may immediately suspend or cancel your order or
            registration if you breach any of these Terms.
          </p>

          <h2>Product Quality and Purity</h2>
          <p>
            We are dedicated to producing and exporting the highest-quality
            Himalayan salt products. Our salt is meticulously sourced from the
            pristine salt mines of Pakistan’s Himalayan region. We adhere to
            strict quality control measures, ensuring that our products are 100%
            natural, free from additives or impurities, and comply with
            international standards.
          </p>

          <h2>Section A: Return</h2>
          <p>
            You have 7 days from receipt of your order to let us know you wish
            to return your order. You then have a further 10 days to return the
            goods to us. Returns outside of these dates may not be accepted.
            Opened food is considered perishable and is not covered by the
            Consumer Rights Act / Consumer Contracts Regulation. DO NOT initiate
            a return of any items without notifying us in advance, either by
            email or via our contact form, otherwise payment may not be
            refunded. Please ensure you use a tracked service when returning
            items as we cannot provide a refund/exchange if the item is lost.
            Please use appropriate packaging when returning the item, damaged
            items will be disposed of and no refund/exchange will be provided.
          </p>

          <h2>Section B: Discounts / Subscriptions</h2>
          <p>
            We sometimes offer an order discount when you subscribe to our
            newsletter. In order to receive this discount code you will need to
            sign up and follow the link in the confirmation email to confirm
            your subscription and receive your code. This discount code can only
            be used once per person/company. The subscription discount cannot be
            abused, i.e. multiple emails used for the same person/company.
          </p>
          <p>
            Please note, subscribing and unsubscribing within the same day of
            placing an order, will result in the order being cancelled and the
            discount being revoked. If you have any questions or queries
            regarding our Terms and Conditions please get in touch.
          </p>

          <h2>Section C: Age of Consent</h2>
          <p>
            By using this site, you represent that you are at least the age of
            majority in your state or province of residence, or that you are the
            age of majority in your state or province of residence and you have
            given us your consent to allow any of your minor dependents to use
            this site.
          </p>

          <h2>Section D: Changes to Privacy Policy</h2>
          <p>
            We reserve the right to modify this privacy policy at any time, so
            please review it frequently. Changes and clarifications will take
            effect immediately upon their posting on the website. If we make
            material changes to this policy, we will notify you here that it has
            been updated, so that you are aware of what information we collect,
            how we use it, and under what circumstances, if any, we use and/or
            disclose it.
          </p>
          <p>
            If our store is acquired or merged with another company, your
            information may be transferred to the new owners so that we may
            continue to sell products to you.
          </p>

          <h2>Section E: Orders and Payments</h2>
          <ul>
            <li>
              Placing an order on Himalayanessenceltd constitutes an offer to
              purchase the selected products. We reserve the right to accept or
              decline your order at our discretion.
            </li>
            <li>
              Prices, shipping fees, and availability are subject to change
              without notice.
            </li>
            <li>
              Payment must be made in full at the time of placing your order. We
              accept various payment methods, which are listed on our website.
            </li>
            <li>
              All payments are processed securely. However, we are not
              responsible for any unauthorized access to or use of your payment
              information.
            </li>
          </ul>
          <p>
            We take utmost care in packaging our products. In the event of
            damage during transit, please contact us within 48 hours of receipt
            with photographic evidence. Refunds or replacements will be
            considered on a case-by-case basis.
          </p>

          <h2>Section F: Delivery</h2>
          <p>
            We work hard to meet all of our delivery times, but sometimes there
            may be delays – e.g. because of postal/carrier delays, logistics or
            bad weather. We will keep you updated as much as we can and you
            should be able to track your parcel’s progress.
          </p>
          <p>
            All prices shown on our website are inclusive of VAT. Delivery
            charges are clearly highlighted throughout the site.
          </p>
          <p>
            We reserve the right to stop a delivery at any time, including after
            despatch, if we suspect that the transaction might be fraudulent.
          </p>

          <h2>Section G: Processing</h2>
          <p>
            Once we receive clear payment for your order, we will begin
            processing your order. Orders are processed and shipped the same day
            (Monday to Friday) if the order is placed by 12:00pm. This does not
            include the listed holidays/ bank holidays. If for any reason any of
            the items are out of stock, you will be notified by our customer
            support by phone or email. In this situation, we always await your
            advice regarding a refund or alternative product selection.
          </p>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
