import Image from "next/image";
const featureImage1 = "/img/icons/svg/quality.svg";
const featureImage2 = "/img/icons/svg/chef.svg";
const featureImage3 = "/img/icons/svg/5-madel.svg";
const featureImage4 = "/img/icons/svg/ok.svg";

const Features5 = ({ type }) => {
  return (
    <div
      className={`ltn__feature-area ${type === 2 ? "mt-35" : "mt-100 mt--65"} `}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="ltn__feature-item-box-wrap ltn__feature-item-box-wrap-2 ltn__border section-bg-6">
              <div className="ltn__feature-item ltn__feature-item-8">
                <div className="ltn__feature-icon">
                  <Image src={featureImage1} width={640} height={640} alt="#" />
                </div>
                <div className="ltn__feature-info">
                  <h4>100% Tracability</h4>
                  <p>Follow every step</p>
                </div>
              </div>
              <div className="ltn__feature-item ltn__feature-item-8">
                <div className="ltn__feature-icon">
                  <Image src={featureImage2} width={640} height={640} alt="#" />
                </div>
                <div className="ltn__feature-info">
                  <h4>Used By Professional Chefs</h4>
                  <p>Trusted in every kitchen</p>
                </div>
              </div>
              <div className="ltn__feature-item ltn__feature-item-8">
                <div className="ltn__feature-icon">
                  <Image src={featureImage3} width={640} height={640} alt="#" />
                </div>
                <div className="ltn__feature-info">
                  <h4>Quality Tested</h4>
                  <p>Certified for top performance</p>
                </div>
              </div>
              <div className="ltn__feature-item ltn__feature-item-8">
                <div className="ltn__feature-icon">
                  <Image src={featureImage4} width={640} height={640} alt="#" />
                </div>
                <div className="ltn__feature-info">
                  <h4>Top Rated Reviewed</h4>
                  <p>Loved by happy customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features5;
