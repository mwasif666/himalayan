import PrivacyPolicy from "@/components/layout/footers/PrivacyPolicy";
import PageWrapper from "@/components/shared/wrappers/PageWrapper";
import React from "react";

const Team = () => {
  return (
    <PageWrapper
      isNotHeaderTop={true}
      isHeaderRight={true}
      isTextWhite={true}
      isNavbarAppointmentBtn={true}
    >
      <PrivacyPolicy />
    </PageWrapper>
  );
};

export default Team;
