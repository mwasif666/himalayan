"use client";
import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import getCategoryItems from "@/libs/getCategoryItems";
import { request } from "@/api/axiosInstance";

const HeroSidebar = ({ type }) => {
  const allItems = getCategoryItems();
  const items = allItems?.filter(({ id }) => id < 9);
  const moreItems = allItems?.filter(({ id }) => id > 8);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await request({
        url: `GetAllCategories`,
        method: "GET",
      });
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="ltn__category-menu-wrap">
      <div className="ltn__category-menu-title">
        <h2
          className={
            type === 2
              ? ` section-bg-2 ltn__secondary-bg text-color-white`
              : "section-bg-1"
          }
        >
          categories
        </h2>
      </div>
      <div className="ltn__category-menu-toggle ltn__one-line-active">
        <ul>
          {/* <!-- Submenu Column - unlimited --> */}

          {loading ? (
            <div>loading...</div>
          ) : (
            categories?.map((item, idx) => (
              <CategoryItem key={idx} item={item} />
            ))
          )}

          {/* <!-- Show more menu --> */}
          {moreItems?.map((item, idx) => (
            <CategoryItem key={idx + 10} item={item} isMore={true} />
          ))}

          {/* show more controllers */}

          {/* <!-- Single menu end --> */}
        </ul>
      </div>
    </div>
  );
};

export default HeroSidebar;
