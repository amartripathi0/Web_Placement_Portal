import { Link } from "react-router-dom";
import { socialHandles } from "../constants";

export default function SocialHandles({ nameDisable }) {
  return (
    <nav className="flex space-x-8">
      {socialHandles.map((socialHandle) => (
        <SocialHandle
          key={socialHandle.name}
          name={socialHandle.name}
          link={socialHandle.link}
          icon={socialHandle.icon}
          nameDisable={nameDisable}
        />
      ))}
    </nav>
  );
}

function SocialHandle({ link, icon: Icon, name, nameDisable = false }) {
  return (
    <Link
      to={link}
      className="flex items-center text-neutral-800 hover:text-black hover:scale-105 duration-150 transition-colors"
    >
      <Icon className="h-5 w-5 mr-2" />
      {!nameDisable && <span>{name}</span>}
    </Link>
  );
}
