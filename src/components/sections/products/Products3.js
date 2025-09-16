"use client";
import { request } from "@/api/axiosInstance";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Products3 = ({
  title,
  desc,
  isSmallTitle,
  subtitle,
  pt,
  type,
  isDouble,
}) => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(1);

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await request({
        url: `GetAllProducts/${categoryId}`,
        method: "GET",
      });

      setProducts(response.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [categoryId]);



  return (
    <section>
      <div
        className={`ltn__product-tab-area ltn__product-gutter pb-70 ${
          pt ? pt : "pt-115"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className={`section-title-area ${
                  type === 2
                    ? ""
                    : isSmallTitle
                    ? "text-center"
                    : "ltn__section-title-2 text-center"
                }`}
              >
                <h1 className="section-title">
                  {title ? title : "Our Products"}
                </h1>
                {desc && (
                  <p>
                    Discover our premium collection of spices, kitchenware, and
                    home essentials for your culinary journey.
                  </p>
                )}
              </div>
              <div
                className={`ltn__tab-menu ltn__tab-menu-2 ${
                  type === 2 ? "ltn__tab-menu-top-right" : ""
                } text-uppercase text-center`}
              >
                <div className="nav">
                  <Link
                    className="active show"
                    data-bs-toggle="tab"
                    href="#liton_tab_3_1"
                    onClick={() => setCategoryId(1)}
                  >
                    Spices
                  </Link>
                  <Link
                    data-bs-toggle="tab"
                    href="#liton_tab_3_2"
                    onClick={() => setCategoryId(2)}
                  >
                    Kitchenware
                  </Link>
                  <Link
                    data-bs-toggle="tab"
                    href="#liton_tab_3_3"
                    onClick={() => setCategoryId(3)}
                  >
                    Salt Lamps
                  </Link>
                  {type !== 2 && (
                    <Link
                      data-bs-toggle="tab"
                      href="#liton_tab_3_4"
                      onClick={() => setCategoryId(4)}
                    >
                      Homeware
                    </Link>
                  )}
                </div>
              </div>
              <div className="tab-content">
                {/* Spices Tab */}
                <div className="tab-pane fade active show" id="liton_tab_3_1">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {loading ? (
                        <div
                          style={{
                            height: "30vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FaSpinner
                            className="spin"
                            size={40}
                            color="#5D394D"
                          />
                        </div>
                      ) : product.length === 0 ? (
                        <div className="col-lg-12 text-center">
                          <p>No products found in this category.</p>
                        </div>
                      ) : (
                        product?.map((product, idx) => (
                          <div className="col-lg-12" key={product.id}>
                            <ProductCardPrimary product={product} url={product?.documents[0]?.encoded_name}/>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Kitchenware Tab */}
                <div className="tab-pane fade" id="liton_tab_3_2">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {loading ? (
                        <div
                          style={{
                            height: "30vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FaSpinner
                            className="spin"
                            size={40}
                            color="#5D394D"
                          />
                        </div>
                      ) : product.length === 0 ? (
                        <div className="col-lg-12 text-center">
                          <p>No products found in this category.</p>
                        </div>
                      ) : (
                        product?.map((product, idx) => (
                          <div className="col-lg-12" key={product.id}>
                            <ProductCardPrimary product={product} url={product?.documents[0]?.encoded_name}/>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Salt Lamps Tab */}
                <div className="tab-pane fade" id="liton_tab_3_3">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {loading ? (
                        <div
                          style={{
                            height: "30vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FaSpinner
                            className="spin"
                            size={40}
                            color="#5D394D"
                          />
                        </div>
                      ) : product.length === 0 ? (
                        <div className="col-lg-12 text-center">
                          <p>No products found in this category.</p>
                        </div>
                      ) : (
                        product?.map((product, idx) => (
                          <div className="col-lg-12" key={product.id}>
                            <ProductCardPrimary product={product} url={product?.documents[0]?.encoded_name}/>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Homeware Tab (only shown when type is not 2) */}
                {type !== 2 && (
                  <div className="tab-pane fade" id="liton_tab_3_4">
                    <div className="ltn__product-tab-content-inner">
                      <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                        {loading ? (
                          <div
                            style={{
                              height: "30vh",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <FaSpinner
                              className="spin"
                              size={40}
                              color="#5D394D"
                            />
                          </div>
                        ) : product.length === 0 ? (
                          <div className="col-lg-12 text-center">
                            <p>No products found in this category.</p>
                          </div>
                        ) : (
                          product?.map((product, idx) => (
                            <div className="col-lg-12" key={product.id}>
                              <ProductCardPrimary product={product} url={product?.documents[0]?.encoded_name}/>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products3;
