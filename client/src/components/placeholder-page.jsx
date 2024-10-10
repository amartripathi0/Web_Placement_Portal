import React from "react";
import SocialHandles from "./social-handles";

export default function PlaceholderPage({ pageTitle }) {
  return (
    <div className="flex-center h-screen bg-gradient-to-r from-cyan-200  to-pink-300">
      <div className="flex flex-col items-center gap-8 text-lg">
        <h3 className="text-3xl font-medium">{pageTitle}</h3>
        <SocialHandles />
      </div>
    </div>
  );
}
