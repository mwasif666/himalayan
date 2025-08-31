"use client";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import getAllProducts from "@/libs/getAllProducts";
import makePath from "@/libs/makePath";
import Link from "next/link";

const Products3 = ({
  title,
  desc,
  isSmallTitle,
  subtitle,
  pt,
  type,
  isDouble,
}) => {
  const allProducts = getAllProducts();

  // Filter products by collection
  const spicesProducts = allProducts?.filter(
    ({ collection }) =>
      collection && makePath(collection) === makePath("Spices")
  );

  const spicesProducts1 = spicesProducts?.slice(0, 6);
  const spicesProducts2 = spicesProducts?.slice(6, 12);

  const kitchenwareProducts = allProducts?.filter(
    ({ collection }) =>
      collection && makePath(collection) === makePath("Kitchenware")
  );

  const kitchenwareProducts1 = kitchenwareProducts?.slice(0, 6);
  const kitchenwareProducts2 = kitchenwareProducts?.slice(6, 12);

  const saltLampsProducts = allProducts?.filter(
    ({ collection }) =>
      collection && makePath(collection) === makePath("Salt Lamps")
  );

  const saltLampsProducts1 = saltLampsProducts?.slice(0, 6);
  const saltLampsProducts2 = saltLampsProducts?.slice(6, 12);

  const homewareProducts = allProducts?.filter(
    ({ collection }) =>
      collection && makePath(collection) === makePath("Homeware")
  );

  const homewareProducts1 = homewareProducts?.slice(0, 6);
  const homewareProducts2 = homewareProducts?.slice(6, 12);

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
                  >
                    Spices
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_2">
                    Kitchenware
                  </Link>
                  <Link data-bs-toggle="tab" href="#liton_tab_3_3">
                    Salt Lamps
                  </Link>
                  {type !== 2 && (
                    <Link data-bs-toggle="tab" href="#liton_tab_3_4">
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
                      {spicesProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={product.id}>
                          <ProductCardPrimary product={product} />
                          {isDouble && spicesProducts2[idx] && (
                            <ProductCardPrimary
                              product={spicesProducts2[idx]}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kitchenware Tab */}
                <div className="tab-pane fade" id="liton_tab_3_2">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {kitchenwareProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={product.id}>
                          <ProductCardPrimary product={product} />
                          {isDouble && kitchenwareProducts2[idx] && (
                            <ProductCardPrimary
                              product={kitchenwareProducts2[idx]}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Salt Lamps Tab */}
                <div className="tab-pane fade" id="liton_tab_3_3">
                  <div className="ltn__product-tab-content-inner">
                    <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                      {saltLampsProducts1?.map((product, idx) => (
                        <div className="col-lg-12" key={product.id}>
                          <ProductCardPrimary product={product} />
                          {isDouble && saltLampsProducts2[idx] && (
                            <ProductCardPrimary
                              product={saltLampsProducts2[idx]}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Homeware Tab (only shown when type is not 2) */}
                {type !== 2 && (
                  <div className="tab-pane fade" id="liton_tab_3_4">
                    <div className="ltn__product-tab-content-inner">
                      <div className="row ltn__tab-product-slider-one-active slick-arrow-1">
                        {homewareProducts1?.map((product, idx) => (
                          <div className="col-lg-12" key={product.id}>
                            <ProductCardPrimary product={product} />
                            {isDouble && homewareProducts2[idx] && (
                              <ProductCardPrimary
                                product={homewareProducts2[idx]}
                              />
                            )}
                          </div>
                        ))}
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
