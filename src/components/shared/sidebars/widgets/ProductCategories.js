"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { request } from "@/api/axiosInstance";

const ProductCategories = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await request({
        url: `GetAllCategories`,
        method: "GET",
      });
      setCategories([{ name: "All" }, ...response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, [id]);

  return (
    <div className="widget ltn__menu-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Product categories
      </h4>
      <ul>
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
        ) : (
          categories?.map((category,idx) => (
            <li key={idx}>
              <Link
                href={category.name === 'All' ? `/shop` : `/shop/${category?.id}`}
                className={id == category?.id ? "active" : ""}
              >
                {category.name}{" "}
                <span>
                  <i className="fas fa-long-arrow-alt-right"></i>
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ProductCategories;
