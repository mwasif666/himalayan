import Image from "next/image";
import React from "react";

const About5 = ({ pt }) => {
  return (
    <div className={`ltn__about-us-area ${pt ? pt : "pt-120"} pb-120`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="about-us-img-wrap about-img-left">
              <Image
                src="/img/others/7.png"
                alt="About Us Image"
                width={570}
                height={531}
                style={{
                  borderRadius: "20px",
                }}
              />
            </div>
          </div>
          <div className="col-lg-6 align-self-center">
            <div className="about-us-info-wrap">
              <div className="section-title-area ltn__section-title-2">
                <h6 className="section-subtitle ltn__secondary-color">
                  Know More About Us
                </h6>
                <h1 className="section-title">
                  Premium Himalayan <br className="d-none d-md-block" /> Salt
                  Company
                </h1>
                <p>
                  We specialize in providing 100% natural and pure Himalayan
                  salt products, carefully extracted from the ancient mines of
                  Pakistan. Our mission is to bring the health and wellness
                  benefits of this natural treasure to homes worldwide.
                </p>
              </div>
              <p>
                From gourmet edible salts to decorative lamps and wellness
                products, we deliver excellence with every piece. Our Himalayan
                salt is known for its purity, rich minerals, and unmatched
                quality — trusted by customers around the globe.
              </p>
              <div className="about-author-info d-flex">
                <div className="author-name-designation align-self-center mr-30">
                  <h4 className="mb-0">Amir Sattar & Q H Dang</h4>
                  <small>/ Founder & Director</small>
                </div>
                <div className="author-sign align-self-center">
                  <Image
                    src="/img/icons/icon-img/author-sign.png"
                    alt="Signature"
                    width={35}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About5;
