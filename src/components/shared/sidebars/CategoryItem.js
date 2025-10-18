"use client";

import Link from "next/link";
import React from "react";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as TbIcons from "react-icons/tb";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
import * as SlIcons from "react-icons/sl";
import * as IoIcons from "react-icons/io5";

const CategoryItem = ({ item, isMore }) => {
  const { id, name, path = "/shop", dropdown, icon } = item;
  const totalSections = dropdown?.length;

  const allIcons = {
    ...FaIcons,
    ...AiIcons,
    ...GiIcons,
    ...TbIcons,
    ...MdIcons,
    ...BsIcons,
    ...BiIcons,
    ...RiIcons,
    ...HiIcons,
    ...SlIcons,
    ...IoIcons,
  };
  const Icon = allIcons[icon ? icon : 'FaBoxOpen'] || null;

  return (
    <li
      className={`${
        isMore
          ? "ltn__category-menu-more-item-child"
          : "ltn__category-menu-item ltn__category-menu-drop"
      }`}
    >
      <Link href={name === 'All' ? path : path+'/'+id} className="flex items-center justify-between">
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
