"use client";

import CartProduct from "@/components/shared/cart/CartProduct";
import Nodata from "@/components/shared/no-data/Nodata";
import { useWishlistContext } from "@/providers/WshlistContext";
import { useEffect, useState } from "react";

const WishlistPrimary = () => {
  const { wishlistProducts } = useWishlistContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // ✅ SSR hydration issue fix

  return (
    <div className="liton__wishlist-area mb-105">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping-cart-inner">
              <div className="shoping-cart-table table-responsive">
                <table className="table">
                  <tbody>
                    {wishlistProducts?.length > 0 ? (
                      wishlistProducts.map((product, idx) => (
                        <CartProduct
                          key={product.id || idx}
                          product={product}
                          isWishlist={true}
                        />
                      ))
                    ) : (
                      <tr>
                        <td>
                          <Nodata text="Empty Wishlist!" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPrimary;
