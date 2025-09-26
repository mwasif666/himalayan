"use client";
import SidebarSearch from "./widgets/SidebarSearch";
import ProductCategories from "./widgets/ProductCategories";
import PriceRange from "./widgets/PriceRange";
import SidebarTopRatedProducs from "./widgets/SidebarTopRatedProducs";


const ProductSidebar = ({id}) => {
  return (
    <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar">
      {/* <!-- Category or Brands Widget --> */}
      {<ProductCategories id={id}/>}

      {/* <!-- Price Filter Widget --> */}
      <PriceRange />

      {/* <!-- Top Rated Product Widget --> */}
      <SidebarTopRatedProducs />

      {/* <!-- Search Widget --> */}
      <SidebarSearch />

      {/* <!-- Tagcloud Widget --> */}
      {/* <ProductTags /> */}

      {/* <!-- Size Widget --> */}
      {/* <ProductSizes /> */}
    </aside>
  );
};

export default ProductSidebar;
