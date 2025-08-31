// import IndexMain from "@/components/layout/main/IndexMain";
// import PageWrapper from "@/components/shared/wrappers/PageWrapper";

// export default function Home() {
//   return (
//     <PageWrapper isNavbarAppointmentBtn={true}>
//       <IndexMain />
//     </PageWrapper>
//   );
// }
import Home3Main from "@/components/layout/main/Home3Main";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";

const Home3 = () => {
  return (
    <PageWrapper headerStyle={5} footerBg={"light"}>
      <Home3Main />
    </PageWrapper>
  );
};

export default Home3;
