import About5 from "@/components/sections/about/About5";
import Faq2 from "@/components/sections/faq/Faq2";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import Services3 from "@/components/sections/services/Services3";
import Testimonials3 from "@/components/sections/testimonils/Testimonials3";

const AboutMain = () => {
  return (
    <main>
      <HeroPrimary title="About Us" text="About Us" />
      <About5 pt={"pt-0"} />
      <Services3 />
      <Testimonials3 pt="pt-115" />
      <Faq2 />

      {/* <Blogs2 type={2} pb={"pb-70"} /> */}
    </main>
  );
};

export default AboutMain;
