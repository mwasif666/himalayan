"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProductContext } from "@/providers/ProductContext";
import { useCommonContext } from "@/providers/CommonContext";
import { request } from "@/api/axiosInstance";
import Image from "next/image";
import Link from "next/link";
import SidebarTopRatedProducs from "@/components/shared/sidebars/widgets/SidebarTopRatedProducs";
import SidebarBanner from "@/components/shared/sidebars/widgets/SidebarBanner";
import ProductDetailsTab from "@/components/shared/products/ProductDetailsTab";
import ProductDetailsRightAsync from "@/components/shared/products/ProductDetailRightAsync";
const ProductDetailsPrimary = () => {
  // hooks
  const { id } = useParams();
  const { isNotSidebar, type } = useCommonContext();
  const { setCurrentProduct } = useProductContext();
  // products and filter current product
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProductById = async () => {
    try {
      setLoading(true);
      const response = await request({
        url: `GetAllProducts/${id}?paginate=${1}`,
        method: "GET",
      });

      const detail = Array.isArray(response?.data?.data)
        ? response?.data?.data[0]
        : response?.data?.data;
      setProductDetail(detail);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getProductById();
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`ltn__shop-details-area  ${
        type === 1 || type === 2 ? "pb-85" : "pb-120"
      }`}
      onMouseEnter={() => setCurrentProduct(productDetail)}
    >
      <div className="container">
        <div className="row">
          <div className={` ${isNotSidebar ? "" : "col-lg-8"} col-md-12`}>
            <div
              className={`ltn__shop-details-inner ${
                type === 1 || type === 2 ? "mb-60" : ""
              }`}
            >
              <div className="row">
                <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                  <div className="ltn__shop-details-img-gallery">
                    <div className="ltn__shop-details-large-img">
                      <div className="single-large-img">
                        <Link href="#" data-rel="lightcase:myCollection">
                          <Image
                            src={`https://himaliyansalt.innovationpixel.com/storage/app/public/products/${productDetail?.documents?.[0].encoded_name}`}
                            alt={"waleed"}
                            width={400}
                            height={400}
                            objectFit="contain"
                          />
                        </Link>
                      </div>
                    </div>
                    {/* <div className="ltn__shop-details-small-img slick-arrow-2">
                      {productDetail?.documents?.map(( image , idx) => (
                        <div key={idx} className="single-small-img">
                          <Image
                             src={`https://himaliyansalt.innovationpixel.com/storage/app/public/products/${image.encoded_name}`}
                            alt="Image"
                            width={1000}
                            height={1000}
                          />
                        </div>
                      ))}
                    </div> */}
                  </div>
                </div>
                <div className={isNotSidebar ? "col-lg-6" : "col-md-6"}>
                  {/*  */}
                  <ProductDetailsRightAsync product={productDetail || {}} />
                </div>
              </div>
            </div>
            {/* <!-- Shop Tab Start --> */}
            {type === 1 || type === 2 ? (
              <ProductDetailsTab product={productDetail || {}} />
            ) : (
              ""
            )}
            {/* <!-- Shop Tab End --> */}
          </div>
          {isNotSidebar ? (
            ""
          ) : (
            <div className="col-lg-4">
              <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
                {/* <!-- Top Rated Product Widget --> */}
                <SidebarTopRatedProducs />

                {/* <!-- Banner Widget --> */}
                <SidebarBanner
                  image={"/img/banner/2.jpg"}
                  imgWidth={740}
                  imgHeight={440}
                />
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPrimary;
