import React from "react";
import PurpleBackground from "../containers/PurpleBackground";
import SlateBackground from "../containers/SlateBackground";

export default function StudentPageLayout({
  children,
  slateBgStyles,
  purpleBgStyles,
}) {
  return (
    <PurpleBackground
      additionalStyles={"sm:p-10 p-4 pt-20 sm:pt-32 " + purpleBgStyles}
    >
      <SlateBackground additionalStyles={slateBgStyles}>
        {children}
      </SlateBackground>
    </PurpleBackground>
  );
}
