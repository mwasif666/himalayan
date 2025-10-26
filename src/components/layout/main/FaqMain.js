import FaqPrimary from "@/components/sections/faq/FaqPrimary";
import HeroPrimary from "@/components/sections/hero-banners/HeroPrimary";
import React from "react";

const FaqMain = () => {
  return (
    <main>
      <HeroPrimary title={"Frequently asked questions"} text={"FAQ"} />
      <FaqPrimary />
      {/* <CounterUp2 />
      <Blogs2 type={2} pb="pb-70" /> */}
    </main>
  );
};

export default FaqMain;
