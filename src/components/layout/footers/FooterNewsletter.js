import { request } from "@/api/axiosInstance";
import { useState } from "react";
import Image from "next/image";
import styles from "../../../style/FooterNewsLetter.module.css";


const FooterNewsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); 

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("type", 'Subscribe Form');
      data.append("email", email);
  
      try {
        await request({
          url: "https://himaliyansalt.innovationpixel.com/public/SaveContactForm",
          method: "POST",
          data: data,
        });
        setStatus('Subscibe Successfully');
        setEmail("");
      } catch (error) {
        setStatus("Failed to subscribe newsletter.");
      }
    };

  return (
    <div className="col-xl-3 col-md-6 col-sm-12 col-12">
      <div className="footer-widget footer-newsletter-widget">
        <h4 className="footer-title">Newsletter</h4>
        <p>Subscribe to our weekly Newsletter and receive updates via email.</p>
        <div className="footer-newsletter">
          <form action="#" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email*" onChange={(e)=>setEmail(e.target.value)}/>
            <div className="btn-wrapper">
              <button className="theme-btn-1 btn" type="submit">
                <i className="fas fa-location-arrow"></i>
              </button>
            </div>
            {status.length > 0 && <div className={styles.statusContainer}><h6 className={styles.statusHeading}>{status}</h6></div>}
          </form>
        </div>
        <h5 className="mt-30">We Accept</h5>
        <Image
          src="/img/icons/payment-4.png"
          width={370}
          height={42}
          alt="Payment Image"
        />
      </div>
    </div>
  );
};

export default FooterNewsletter;
