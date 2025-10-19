"use client";
import React, { useEffect, useState } from "react";
import { request } from "@/api/axiosInstance";
import { FaSpinner } from "react-icons/fa";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import ProductCardPrimary2 from "@/components/shared/cards/ProductCardPrimary2";
import ShopDataShowing from "@/components/shared/products/ShopDataShowing";
import ShopShortSelect from "@/components/shared/products/ShopShortSelect";
import ProductSidebar from "@/components/shared/sidebars/ProductSidebar";
import Link from "next/link";
import styles from "../../../style/ProductPrimary.module.css";
import Pagination from "@/components/shared/paginations/Pagination";
import CustomPagination from "@/components/custom-pagination/CustomPagination";
// import Nodata from "@/components/shared/no-data/Nodata";

const ProductsPrimary = ({ id, isSidebar, currentTapId, rangeValue }) => {
  const [arrangeInput, setArrangeInput] = useState("default");
  const [currentTab, setCurrentTab] = useState(currentTapId ? currentTapId : 0);
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState("");

  const tabControllers = ["fas fa-th-large", "fas fa-list"];

  const setSortingFilter = () => {
    let url = `GetAllProducts?paginate=${1}`;
    if (rangeValue) {
      let rangeSortedVal = rangeValue.split("-");
      url += `&price_min=${Number(rangeSortedVal[0])}&price_max=${Number(
        rangeSortedVal[1]
      )}`;
    }
    switch (arrangeInput) {
      case "default":
        url = url;
        break;
      case "new":
        url += "&new_arrivals";
        break;
      case "popularity":
        url += "&popularity";
        break;
      case "price ascending":
        url += "&low_to_high";
        break;
      case "price descending":
        url += "&high_to_low";
        break;
    }

    if (id) {
      return `${url}/${id}`;
    }

    return url;
  };

  const getProduct = async (page = 1) => {
    setLoading(true);
    try {
      const response = await request({
        url: `${setSortingFilter()}&page=${page}`,
        method: "GET",
      });

      setProducts(response.data);
      setTotalPages(response.data.last_page);
      setCurrentPage(response.data.current_page);
      setPaginationLinks(response.data.links);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
    getProduct(page);
  };

  useEffect(
    () => {
      if (rangeValue) {
        const delay = setTimeout(() => {
          setSortingFilter();
          getProduct();
        }, 250);

        return () => clearTimeout(delay);
      }

      getProduct();
    },
    id ? [arrangeInput, rangeValue, id] : [arrangeInput, rangeValue]
  );

  return (
    <div className="ltn__product-area ltn__product-gutter mb-120">
      <div className="container">
        <div className={styles.primaryCardShopLayouy}>
          <div
            className={`${isSidebar === false ? "col-lg-12" : "col-lg-8"}  ${
              isSidebar === "left" ? "order-lg-2 " : ""
            }`}
          >
            {/* {!totalPages ? <Nodata text={"No Product Found!"} /> : ""} */}

            <div
              // className={`ltn__shop-options ${!totalPages ? "no-data" : ""}`}
              className={`ltn__shop-options`}
            >
              <ul>
                <li>
                  <div className="ltn__grid-list-tab-menu ">
                    <div className="nav">
                      {tabControllers?.map((iconName, idx) => (
                        <Link
                          key={idx}
                          onClick={() => setCurrentTab(idx)}
                          className={idx === currentTab ? "active " : ""}
                          data-bs-toggle="tab"
                          href={`#liton_product_${idx + 1}`}
                        >
                          <i className={iconName}></i>
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
                {/* <li>
                  {isSidebar === "left" || isSidebar === false ? (
                    <ShopShortSelect setArrangeInput={setArrangeInput} />
                  ) : (
                    <ShopDataShowing
                      limit={limit}
                      totalItems={totalItems}
                      firstItem={firstItem}
                      lastItem={lastItem}
                    />
                  )}
                </li> */}
                <li>
                  {isSidebar === "left" || isSidebar === false ? (
                    <ShopDataShowing
                      limit={limit}
                      totalItems={totalItems}
                      firstItem={firstItem}
                      lastItem={lastItem}
                    />
                  ) : (
                    <ShopShortSelect setArrangeInput={setArrangeInput} />
                  )}
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div
                className={`tab-pane fade ${
                  currentTab === 0 ? " active " : ""
                }`}
                id="liton_product_1"
              >
                <div className="ltn__product-tab-content-inner ltn__product-grid-view">
                  <div className="row">
                    {/* <!-- ltn__product-item --> */}
                    {loading ? (
                      <div
                        style={{
                          height: "30vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaSpinner className="spin" size={40} color="#5D394D" />
                      </div>
                    ) : product?.data?.length === 0 ? (
                      <div className="col-lg-12 text-center">
                        <p>No products found in this category.</p>
                      </div>
                    ) : (
                      product?.data?.map((product, idx) => (
                        <div
                          className={`${
                            isSidebar === false
                              ? "col-xl-3 col-lg-4"
                              : "col-xl-4"
                          }  col-sm-6 col-6`}
                          key={idx}
                        >
                          <ProductCardPrimary product={product} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${currentTab === 1 ? " active" : ""}`}
                id="liton_product_2"
              >
                <div className="ltn__product-tab-content-inner ltn__product-list-view">
                  <div className="row">
                    {loading ? (
                      <div
                        style={{
                          height: "30vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaSpinner className="spin" size={40} color="#5D394D" />
                      </div>
                    ) : product?.data?.length === 0 ? (
                      <div className="col-lg-12 text-center">
                        <p>No products found in this category.</p>
                      </div>
                    ) : (
                      product?.data?.map((product, idx) => (
                        <div className="col-lg-12" key={idx}>
                          <ProductCardPrimary2 product={product} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            {totalPages > 1 && (
                <CustomPagination
                  paginationLinks={paginationLinks}
                  currentPage={currentPage}
                  handleCurrentPage={handleCurrentPage}
                />
            )}
          </div>
          {isSidebar === false ? (
            ""
          ) : (
            <div className="col-lg-4">
              <ProductSidebar id={id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPrimary;
