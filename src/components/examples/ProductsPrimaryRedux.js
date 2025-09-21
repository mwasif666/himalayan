"use client";

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, setFilters } from '@/store/slices/productSlice';
import { addToCart, openCart } from '@/store/slices/cartSlice';
import { setViewMode, setCurrentPage } from '@/store/slices/uiSlice';
import ProductCardPrimary from "@/components/shared/cards/ProductCardPrimary";
import ProductCardPrimary2 from "@/components/shared/cards/ProductCardPrimary2";
import Nodata from "@/components/shared/no-data/Nodata";
import Pagination from "@/components/shared/paginations/Pagination";
import ShopDataShowing from "@/components/shared/products/ShopDataShowing";
import ShopShortSelect from "@/components/shared/products/ShopShortSelect";
import ProductSidebar from "@/components/shared/sidebars/ProductSidebar";
import usePagination from "@/hooks/usePagination";
import filterItems from "@/libs/filterItems";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const ProductsPrimaryRedux = ({ isSidebar, currentTapId }) => {
  const dispatch = useAppDispatch();
  
  // Redux state
  const { products, loading: productsLoading, filters } = useAppSelector((state) => state.products);
  const { viewMode } = useAppSelector((state) => state.ui);
  
  // Local state
  const [arrangeInput, setArrangeInput] = useState("default");
  const [currentTab, setCurrentTab] = useState(currentTapId ? currentTapId : 0);

  const limit =
    currentTab === 1
      ? isSidebar === false
        ? 4
        : 7
      : isSidebar === false
      ? 16
      : 21;

  // Filter products based on Redux filters
  const filteredProducts = filterItems(
    products,
    filters.category ? "category" : 
    filters.brand ? "brand" : 
    filters.tag ? "tags" : 
    filters.size ? "size" : 
    filters.color ? "color" : 
    filters.search ? "search" : "",
    filters.category || filters.brand || filters.tag || filters.size || filters.color || filters.search || ""
  );

  const arrangedProducts = filterItems(
    filteredProducts,
    arrangeInput,
    arrangeInput
  );

  // Pagination
  const {
    currentItems,
    totalItems,
    currentpage,
    setCurrentpage,
    paginationItems,
    currentPaginationItems,
    showMore,
    totalPages,
    handleCurrentPage,
    firstItem,
    lastItem,
  } = usePagination(arrangedProducts, limit, 5);

  const tabControllers = ["fas fa-th-large", "fas fa-list"];

  useEffect(() => {
    setCurrentpage(0);
  }, [currentTab]);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle view mode change
  const handleViewModeChange = (mode) => {
    dispatch(setViewMode(mode));
    setCurrentTab(mode === 'grid' ? 0 : 1);
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(openCart());
  };

  // Handle sort change
  const handleSortChange = (sortValue) => {
    setArrangeInput(sortValue);
    dispatch(setFilters({ sortBy: sortValue }));
  };

  return (
    <div className="ltn__product-area ltn__product-gutter mb-120">
      <div className="container">
        <div className="row">
          <div
            className={`${isSidebar === false ? "col-lg-12" : "col-lg-8"}  ${
              isSidebar === "left" ? "order-lg-2 " : ""
            }`}
          >
            {!totalPages ? <Nodata text={"No Product Found!"} /> : ""}

            <div
              className={`ltn__shop-options ${!totalPages ? "no-data" : ""}`}
            >
              <ul>
                <li>
                  <div className="ltn__grid-list-tab-menu ">
                    <div className="nav">
                      {tabControllers?.map((iconName, idx) => (
                        <Link
                          key={idx}
                          onClick={() => handleViewModeChange(idx === 0 ? 'grid' : 'list')}
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
                <li>
                  {isSidebar === "left" || isSidebar === false ? (
                    <ShopShortSelect setArrangeInput={handleSortChange} />
                  ) : (
                    <ShopDataShowing
                      limit={limit}
                      totalItems={totalItems}
                      firstItem={firstItem}
                      lastItem={lastItem}
                    />
                  )}
                </li>
                <li>
                  {isSidebar === "left" || isSidebar === false ? (
                    <ShopDataShowing
                      limit={limit}
                      totalItems={totalItems}
                      firstItem={firstItem}
                      lastItem={lastItem}
                    />
                  ) : (
                    <ShopShortSelect setArrangeInput={handleSortChange} />
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
                    {productsLoading ? (
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
                    ) : products.length === 0 ? (
                      <div className="col-lg-12 text-center">
                        <p>No products found in this category.</p>
                      </div>
                    ) : (
                      products?.map((product, idx) => (
                        <div
                          className={`${
                            isSidebar === false
                              ? "col-xl-3 col-lg-4"
                              : "col-xl-4"
                          }  col-sm-6 col-6`}
                          key={idx}
                        >
                          <ProductCardPrimary 
                            product={product} 
                            onAddToCart={() => handleAddToCart(product)}
                          />
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
                    {products?.map((product, idx) => (
                      <div className="col-lg-12" key={idx}>
                        <ProductCardPrimary2 
                          product={product} 
                          onAddToCart={() => handleAddToCart(product)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {totalPages > 1 ? (
              <Pagination
                totalPages={totalPages}
                currentPaginationItems={currentPaginationItems}
                showMore={showMore}
                items={paginationItems}
                currenIndex={currentpage}
                handleCurrentPage={handleCurrentPage}
              />
            ) : (
              ""
            )}
          </div>
          {isSidebar === false ? (
            ""
          ) : (
            <div className="col-lg-4">
              <ProductSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPrimaryRedux;
