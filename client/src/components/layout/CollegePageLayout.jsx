import React from "react";

export default function CollegePageLayout({
  children,
  //   slateBgStyles,
  //   purpleBgStyles,
}) {
  return <div className={"sm:p-10 p-4 pt-20 sm:pt-32 bg-sky-100 flex-center"}>{children}</div>;
}
