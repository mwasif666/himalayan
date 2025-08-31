import About5 from "@/components/sections/about/About5";
import ContactPrimary from "@/components/sections/contacts/ContactPrimary";
import Faq2 from "@/components/sections/faq/Faq2";
import Features5 from "@/components/sections/features/Features5";
import Hero15 from "@/components/sections/hero-banners/Hero15";
import Products3 from "@/components/sections/products/Products3";
import Testimonials3 from "@/components/sections/testimonils/Testimonials3";
import React from "react";
import Map2 from "@/components/shared/map/Map2";

const Home3Main = () => {
  return (
    <main>
      <Hero15 />
      <Features5 type={2} />

      <Products3
        isSmallTitle={true}
        isDouble={true}
        desc="A highly efficient slip-ring scanner for today's diagnostic requirements."
      />
      <About5 pt={"pt-0"} />
      <Testimonials3 pt="pt-115" />
      <Faq2 />
      <ContactPrimary />
      <Map2 />
      {/* <Categories3 type={2} /> */}
    </main>
  );
};

export default Home3Main;
