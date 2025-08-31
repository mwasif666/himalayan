"use client";
import ProductCard2 from "@/components/shared/cards/ProductCard2";
import getAllProducts from "@/libs/getAllProducts";
import React from "react";

const ProductLists = () => {
  const allProducts = getAllProducts();
  const allFeaturedProducts = allProducts
    ?.filter(({ featured }) => featured)
    ?.slice(0, 9);
  const allMostViewProducts = allProducts
    ?.sort((a, b) => b.views - a.views)
    ?.slice(0, 9);
  const allBestSellerProducts = allProducts
    ?.filter(({ bestSeller }) => bestSeller)
    ?.slice(0, 9);

  const items = [
    {
      title: "Featured Products",
      products: allFeaturedProducts,
    },
    {
      title: "Most View Products",
      products: allMostViewProducts,
    },
    {
      title: "Bestseller Products",
      products: allBestSellerProducts,
    },
  ];

  return (
    <div className="ltn__small-product-list-area pt-80 pb-85">
      <div className="container">
        <div className="row">
          {items?.map(({ title, products }, idx) => (
            <div key={idx} className="col-lg-4 col-md-6 mb-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title-area">
                    <h1 className="section-title-2 border-bottom pb-2 mb-4">
                      {title}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="ltn__small-product-list">
                {products?.map((product, idx2) => (
                  <ProductCard2 key={idx2} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLists;
