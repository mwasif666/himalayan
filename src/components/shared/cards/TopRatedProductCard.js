import countDiscount from "@/libs/countDiscount";
import modifyAmount from "@/libs/modifyAmount";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductRating from "./ProductRating";

const TopRatedProductCard = ({ product }) => {
  const { name, price, discount, id, reviews } = product;
  const { netPrice } = countDiscount(price, discount);
  const netPriceModified = modifyAmount(netPrice);
  const priceModified = modifyAmount(price);

  return (
    <div className="top-rated-product-item clearfix">
      <div className="top-rated-product-img">
        <Link href={`/products/${id}`}>
          <Image src={`https://himaliyansalt.innovationpixel.com/storage/app/public/products/${product?.documents?.[0]?.encoded_name}`} alt={name} width={1000} height={1000} />
        </Link>
      </div>
      <div className="top-rated-product-info">
        <ProductRating reviews={reviews} isProductDetail={false}/>
        <h6>
          <Link href={`/products/${id}`}>{sliceText(name, 25)}</Link>
        </h6>
        <div className="product-price">
          <span>${netPriceModified}</span>
          <del>${priceModified}</del>
        </div>
      </div>
    </div>
  );
};

export default TopRatedProductCard;
