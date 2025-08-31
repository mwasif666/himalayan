"use client";
import makePath from "@/libs/makePath";
import { useCommonContext } from "@/providers/CommonContext";
import Link from "next/link";
import React, { useState } from "react";
// products.json import
import products from "@/../public/fakedata/products.json";

const BlogTags = () => {
  const { currentPath, tag: currentTag } = useCommonContext();

  // products.json se unique tags nikalna
  const tags = [...new Set(products.flatMap((item) => item.tags || []))];

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const tagsPerPage = 10;

  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

  const totalPages = Math.ceil(tags.length / tagsPerPage);

  // Dynamic page numbers (sirf 2)
  let pageNumbers = [];
  if (currentPage === 1) {
    pageNumbers = [1, 2].filter((n) => n <= totalPages);
  } else if (currentPage === totalPages) {
    pageNumbers = [totalPages - 1, totalPages].filter((n) => n > 0);
  } else {
    pageNumbers = [currentPage, currentPage + 1].filter((n) => n <= totalPages);
  }

  return (
    <div className="widget ltn__tagcloud-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Popular Tags
      </h4>
      <ul>
        {currentTags?.map((tag, idx) => (
          <li key={idx}>
            <Link
              href={`${currentPath ? currentPath : "/blogs"}?tag=${makePath(
                tag
              )}`}
              className={currentTag === makePath(tag) ? "active" : ""}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination mt-3 flex items-center gap-2">
          {/* Prev Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            «
          </button>

          {/* Dynamic Page Numbers */}
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 border rounded ${
                currentPage === num ? "bg-gray-300" : ""
              }`}
            >
              {num}
            </button>
          ))}

          {/* Next Button */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogTags;
