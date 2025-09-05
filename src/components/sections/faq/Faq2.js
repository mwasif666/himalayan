/* eslint-disable jsx-a11y/role-supports-aria-props */
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Faq2 = () => {
  return (
    <div className="ltn__faq-area pt-115 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area ltn__section-title-2 text-center">
              <h1 className="section-title white-color---">Some Questions</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="ltn__faq-inner ltn__faq-inner-2">
              <div id="accordion_2">
                {/* <!-- card --> */}
                <div className="card">
                  <h6
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-item-2-1"
                    aria-expanded="false"
                  >
                    What is Himalayan Salt?
                  </h6>
                  <div
                    id="faq-item-2-1"
                    className="collapse"
                    data-bs-parent="#accordion_2"
                  >
                    <div className="card-body">
                      <p>
                        Himalayan Salt is a natural rock salt mined from the
                        foothills of the Himalayas in Pakistan. It is rich in
                        minerals and trace elements that give it a unique
                        pinkish color and health benefits.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h6
                    className="ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-item-2-2"
                    aria-expanded="true"
                  >
                    How can I use Himalayan Salt in daily life?
                  </h6>
                  <div
                    id="faq-item-2-2"
                    className="collapse show"
                    data-bs-parent="#accordion_2"
                  >
                    <div className="card-body">
                      <p>
                        You can use Himalayan Salt for cooking, seasoning food,
                        detox baths, salt lamps for air purification, and even
                        in skincare products for exfoliation.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h6
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-item-2-3"
                    aria-expanded="false"
                  >
                    What are the health benefits of Himalayan Salt?
                  </h6>
                  <div
                    id="faq-item-2-3"
                    className="collapse"
                    data-bs-parent="#accordion_2"
                  >
                    <div className="card-body">
                      <p>
                        Himalayan Salt contains over 80 trace minerals that may
                        help improve hydration, balance electrolytes, support
                        respiratory health, and promote better sleep when used
                        properly.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h6
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-item-2-4"
                    aria-expanded="false"
                  >
                    Is Himalayan Salt better than regular table salt?
                  </h6>
                  <div
                    id="faq-item-2-4"
                    className="collapse"
                    data-bs-parent="#accordion_2"
                  >
                    <div className="card-body">
                      <p>
                        Unlike refined table salt, Himalayan Salt is unprocessed
                        and naturally rich in minerals. It has a more balanced
                        taste and can be a healthier alternative when consumed
                        in moderation.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <!-- card --> */}
                <div className="card">
                  <h6
                    className="collapsed ltn__card-title"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq-item-2-5"
                    aria-expanded="false"
                  >
                    Where does authentic Himalayan Salt come from?
                  </h6>
                  <div
                    id="faq-item-2-5"
                    className="collapse"
                    data-bs-parent="#accordion_2"
                  >
                    <div className="card-body">
                      <p>
                        Authentic Himalayan Salt is mined exclusively from the
                        Khewra Salt Mine in Punjab, Pakistan, which is the
                        second-largest salt mine in the world and the only
                        source of genuine pink salt.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <aside className="sidebar-area ltn__right-sidebar mt-60">
              {/* <!-- Banner Widget --> */}
              <div className="widget ltn__banner-widget">
                <Link href="/shop">
                  <Image
                    style={{ height: "auto" }}
                    src="/img/banner/banner.png"
                    alt="Banner Image"
                    width={631}
                    height={500}
                  />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq2;
