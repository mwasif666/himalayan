import Image from "next/image";
import ProductDetailsRight from "../products/ProductDetailsRight";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { request } from "@/api/axiosInstance";

const ProductDetailsQuick = ({ product }) => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProductById = async () => {
    try {
      setLoading(true);
      const response = await request({
        url: `GetAllProducts/${id}`,
        method: "GET",
      });

      const detail = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      setProductDetail(detail ?? product);
    } catch (error) {
      console.error("Error fetching product:", error);
      setProductDetail(product);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getProductById();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentProduct = id ? productDetail : product;
  const firstDoc = currentProduct?.documents?.[0]?.encoded_name;
  const imageSrc = firstDoc
    ? `https://himaliyansalt.innovationpixel.com/storage/app/public/products/${firstDoc}`
    : "/placeholder.png";

  return (
    <div className="ltn__modal-area ltn__quick-view-modal-area">
      <div className="modal fade" id="quick_view_modal" tabIndex="-1">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="ltn__quick-view-modal-inner">
                <div className="modal-product-item">
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <div className="modal-product-img">
                        <Image
                          src={imageSrc}
                          alt={currentProduct?.name || "Product"}
                          width={1000}
                          height={1000}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-12">
                      <ProductDetailsRight product={currentProduct || {}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsQuick;
