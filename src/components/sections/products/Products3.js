"use client";
import { request } from "@/api/axiosInstance";
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import styles from "../../../style/Product.module.css";
import CustomPagination from "@/components/custom-pagination/CustomPagination";

const Products3 = ({ title, desc, isSmallTitle, pt, type }) => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tabLoading, setTabLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginationLinks, setPaginationLinks] = useState([]);

  const getProduct = async (page = 1) => {
    let url = categoryId
      ? `GetAllProducts?per_page=6&page=${page}&category_id=${categoryId}`
      : `GetAllProducts?per_page=6&page=${page}`;
    try {
      setLoading(true);
      const response = await request({
        url,
        method: "GET",
      });

      setProducts(response.data);
      setTotalPages(response.data.last_page);
      setCurrentPage(response.data.current_page);
      setPaginationLinks(response.data.links);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [categoryId]);

  const getCategories = async () => {
    try {
      setTabLoading(true);
      const response = await request({
        url: `GetAllCategories`,
        method: "GET",
      });
      setCategories([{ name: "All", id: "" }, ...response.data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setTabLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const setIdAndIndex = (id, idx) => {
    setCategoryId(id);
    setActiveIndex(idx);
    setCurrentPage(1);
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
    getProduct(page);
  };

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
              {/* Section Title */}
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

              {/* Tabs */}
              <div className={styles.tabContainer}>
                {tabLoading ? (
                  <div>Loading...</div>
                ) : (
                  categories.map((item, idx) => (
                    <div key={idx} className={styles.tabInnerContainer}>
                      <h4
                        onClick={() => setIdAndIndex(item.id, idx)}
                        className={`${styles.tabTitle} ${
                          activeIndex === idx ? styles.active : ""
                        }`}
                      >
                        {item.name}
                      </h4>
                    </div>
                  ))
                )}
              </div>

              {/* Products */}
              <div className="tab-content d-flex flex-wrap justify-content-center">
                {loading ? (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FaSpinner className="spinner" size={40} color="#5D394D" />
                  </div>
                ) : product?.data?.length === 0 ? (
                  <div className="col-lg-12 text-center">
                    <p>No products found in this category.</p>
                  </div>
                ) : (
                  <div className="row">
                    {product?.data?.map((product, idx) => (
                      <div
                        className="col-lg-4 col-md-6 col-sm-12 mb-4"
                        key={product.id}
                      >
                        <ProductCardPrimary
                          product={product}
                          url={product?.documents[0]?.encoded_name}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <CustomPagination
                  paginationLinks={paginationLinks}
                  currentPage={currentPage}
                  handleCurrentPage={handleCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products3;
