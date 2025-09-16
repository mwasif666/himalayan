"use client";
import { request } from "@/api/axiosInstance";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const Products3 = ({ title, desc, isSmallTitle, pt, type }) => {
  const tabs = [{label:'Spices', id:1}, {label:'Kitchenware', id:2}, {label:'Salt Lamps', id:3}, {label:'Homeware', id:4}];
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(1);
  console.log(type, isSmallTitle);
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
              <div>
                {tabs.map((item, idx)=>(
                  <div key={idx}>
                     <h3 onClick={()=>setCategoryId(item.id)}>{item.label}</h3>
                  </div>
                ))}
              </div>

               <div className="tab-content">
                <div>
                  <div>
                    <div>
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
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products3;
