import React from "react";
import PurpleBackground from "../containers/PurpleBackground";
import SlateBackground from "../containers/SlateBackground";

export default function UserLayout({ children, slateBgStyles, purpleBgStyles }) {
  return (
    <PurpleBackground additionalStyles={"p-10 pt-32 " + purpleBgStyles}>
      <SlateBackground additionalStyles={slateBgStyles}>
        {children}
      </SlateBackground>
    </PurpleBackground>
  );
}
