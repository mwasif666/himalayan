import TermsAndConditions from "@/components/layout/footers/Terms&condition";
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
      <TermsAndConditions />
    </PageWrapper>
  );
};

export default Team;
