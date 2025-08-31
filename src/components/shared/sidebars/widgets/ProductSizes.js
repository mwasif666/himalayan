"use client";
import makePath from "@/libs/makePath";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React from "react";
// products.json import
import products from "@/../public/fakedata/products.json";

const ProductSizes = () => {
  const { currentPath, size: currentSize } = useCommonContext();

  // products.json se unique sizes nikalna
  const sizes = [...new Set(products.map((item) => item.size).filter(Boolean))];

  return (
    <div className="widget ltn__tagcloud-widget ltn__size-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Product Weight
      </h4>
      <ul>
        {sizes?.map((size, idx) => (
          <li key={idx}>
            <Link
              href={`${currentPath ? currentPath : "/shop"}?size=${makePath(
                size
              )}`}
              className={currentSize === makePath(size) ? "active" : ""}
            >
              {size}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSizes;
