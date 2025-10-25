import getAllProducts from "@/libs/getAllProducts";
import TopRatedProductCard from "../../cards/TopRatedProductCard";
import { useEffect, useState } from "react";
import { request } from "@/api/axiosInstance";
import { FaSpinner } from "react-icons/fa";

const SidebarTopRatedProducs = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await request({
        url: `GetAllProducts?top_rated_product&per_page=${6}`,
        method: "GET",
      });
      setProducts(response.data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="widget ltn__top-rated-product-widget">
      <h4 className="ltn__widget-title ltn__widget-title-border">
        Top Rated Product
      </h4>
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
      ) : products?.data?.length === 0 ? (
        <div><p>No Top Rated Product Found</p></div>
      ) : (
        <ul>
          {products?.data?.map((product, idx) => (
            <li key={product.id || idx}>
              <TopRatedProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SidebarTopRatedProducs;
