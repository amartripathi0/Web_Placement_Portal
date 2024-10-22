import React from "react";
import PurpleBackground from "../containers/PurpleBackground";
import SlateBackground from "../containers/SlateBackground";

export default function UserLayout({ children, slateBgStyles }) {
  return (
    <PurpleBackground additionalStyles={"p-10 pt-32"}>
      <SlateBackground additionalStyles={slateBgStyles}>
        {children}
      </SlateBackground>
    </PurpleBackground>
  );
}
