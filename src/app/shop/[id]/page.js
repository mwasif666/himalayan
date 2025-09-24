import ShopMain from "@/components/layout/main/ShopMain";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const TeamDetails = ({ params }) => {
  const { id } = params;
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
     <ShopMain isSidebar="primary" id={id} />
    </PageWrapper>
  );
};

export default TeamDetails;
