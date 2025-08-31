"use client";

import Link from "next/link";
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as TbIcons from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa";

const CategoryItem = ({ item, isMore }) => {
  const { name, path, dropdown, icon } = item;
  const totalSections = dropdown?.length;
  const allIcons = {
    ...FaIcons,
    ...GiIcons,
    ...TbIcons,
  };
  const Icon = allIcons[icon] || null;

  return (
    <li
      className={`${
        isMore
          ? "ltn__category-menu-more-item-child"
          : "ltn__category-menu-item ltn__category-menu-drop"
      }`}
    >
      <Link href={path} className="flex items-center justify-between">
        <span className="d-flex justify-content-between gap-4">
          <div className="d-flex align-items-center gap-4">
            <span className="">{Icon && <Icon className="text-lg" />}</span>
            <span> {name}</span>
          </div>
          <div>
            {dropdown && <FaChevronRight className="text-sm opacity-70" />}
          </div>
        </span>
      </Link>

      {dropdown ? (
        <ul
          className={`ltn__category-submenu ltn__category-column-${totalSections}`}
        >
          {dropdown?.map(({ title, path, items }, idx) => (
            <li
              key={idx}
              className="ltn__category-submenu-title ltn__category-menu-drop"
            >
              <Link href={path}>{title}</Link>
              <ul className="ltn__category-submenu-children">
                {items?.map(({ name, path }, idx1) => (
                  <li key={idx1}>
                    <Link href={path}>{name}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default CategoryItem;
