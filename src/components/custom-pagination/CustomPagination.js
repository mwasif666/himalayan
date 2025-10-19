"use client";
import React from "react";  
import styles from "../../style/Pagination.module.css";

const CustomPagination = ({ paginationLinks, currentPage, handleCurrentPage }) => {
  if (!paginationLinks || paginationLinks.length === 0) return null;
  
  return (
    <div className={styles.paginationDiv}>
      <ul className="pagination" style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
        {paginationLinks.map((link, index) => {
          if (!link.url) return null;
          const page = new URL(link.url).searchParams.get("page");

          return (
            <li
              key={index}
              className={`${styles.paginationList} ${link.active ? styles.active : styles.inactive}`}
              dangerouslySetInnerHTML={{ __html: link.label }}
              onClick={() => handleCurrentPage(Number(page))}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CustomPagination;
