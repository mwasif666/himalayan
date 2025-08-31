import ServiceCard3 from "@/components/shared/cards/ServiceCard3";
import getAllServices from "@/libs/getAllServices";
import Image from "next/image";

const Services3 = () => {
  const services1 = getAllServices()?.filter(({ id }) => id > 20 && id < 24);
  const services2 = getAllServices()?.filter(({ id }) => id > 23 && id < 27);
  return (
    <div className="ltn__feature-area pt-115 pb-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 section-title-style-3">
              <div className="section-brief-in">
                <p>
                  We provide 100% natural and premium quality Himalayan salt
                  products, ensuring purity, health benefits, and customer
                  satisfaction worldwide.
                </p>
              </div>
              <div className="section-title-in">
                <h6 className="section-subtitle ltn__secondary-color">
                  {"//"} Why Choose Us
                </h6>
                <h1 className="section-title">
                  Trusted Quality & Service<span>.</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="row  justify-content-center">
              {services1?.map((service, idx) => (
                <div key={idx} className="col-lg-12 col-md-6 col-12">
                  <ServiceCard3 service={service} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div className="feature-banner-img text-center mb-30">
              <Image
                src="/img/others/saltbottle.png"
                alt="#"
                width={250}
                height={450}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row  justify-content-center">
              {services2?.map((service, idx) => (
                <div key={idx} className="col-lg-12 col-md-6 col-12">
                  <ServiceCard3 type={2} service={service} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services3;
