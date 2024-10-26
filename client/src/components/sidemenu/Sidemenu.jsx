import { useState, useContext, createContext } from "react";
import { ChevronLast, ChevronFirst } from "lucide-react";
import { NavLink } from "react-router-dom";
import { userPlaceholderImage } from "../../constants";

const SidebarContext = createContext();
const Sidemenu = ({
  emailID,
  firstName,
  lastName,
  profileImgLink,
  sidemenuState,
  sidebarItems,
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`h-full fixed top-0 left-0 z-40 max-tablet:w-[8%] max-sm:w-[16%] ${
        expanded ? "w-[15%]" : "w-[5%] gap-2"
      } `}
    >
      <nav className="h-full flex flex-col max- bg-white border-r shadow-sm ">
        <div
          className={` flex justify-between items-center p-4 ${
            expanded ? "p-4" : "py-7"
          }`}
        >
          <NavLink
            to={``}
            className={`overflow-hidden transition-all  rounded-md max-tablet:hidden ${
              expanded ? "w-16 h-16" : " hidden "
            }`}
          >
            <img
              src={profileImgLink ? profileImgLink : userPlaceholderImage}
              className={`overflow-hidden transition-ease  object-cover h-full w-full rounded-md ${
                expanded ? "w-full" : "w-0 hidden "
              }`}
              alt=""
            />
          </NavLink>

          <button
            onClick={() => {
              setExpanded((curr) => !curr);
              sidemenuState(expanded);
            }}
            className={` rounded-lg p-1.5 hover:bg-gray-100 ${
              expanded ? " " : ""
            } max-tablet:hidden`}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 max-tablet:mt-16 ">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.label}
                text={item.label}
                icon={item.icon}
                active
              />
            ))}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 max-sm:p-2 w-full ">
          <img
            src={profileImgLink ? profileImgLink : userPlaceholderImage}
            alt=""
            className="w-12 h-12 max-sm:full rounded-md"
          />
          <div
            className={`
              flex-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4 max-tablet:hidden">
              <h4 className="font-semibold">
                {`${firstName !== undefined ? firstName : ""} ${
                  lastName !== undefined ? lastName : ""
                }`}{" "}
              </h4>
              <span className="text-xs text-gray-600">{emailID}</span>
            </div>
            {/* <MoreVertical size={20} /> */}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export function SidebarItem({ icon: Icon, text }) {
  const { expanded } = useContext(SidebarContext);
  const ch1 = text.split(" ")[0].toLowerCase();
  const ch2 = text.split(" ")[1];
  let link = ch1;
  if (ch2 !== undefined) {
    link += ch2;
  }
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? "text-sm bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800  relative flex items-center py-2 px-3 max-tablet:p-1  max-sm:my-1 max-sm:pl-1 max-sm:py-3 border my-1 font-medium rounded-md cursor-pointer transition-colors group "
          : "text-sm hover:bg-indigo-50 text-gray-600  relative flex items-center py-2 px-3 max-tablet:p-1 max-sm:my-1 max-sm:pl-1 max-sm:py-3 my-1 font-medium rounded-md cursor-pointer transition-colors group"
      }
    >
      <Icon
        className="size-6 sm:size-7 tablet:size-30"
        size={expanded ? 23 : 18}
      />

      <span
        className={`overflow-hidden transition-all duration-100 max-tablet:h-6  
        max-tablet:absolute max-tablet:left-full  max-tablet:rounded-md max-tablet:px-2 max-tablet:py-1 max-tablet:ml-6 
            max-tablet:bg-indigo-200 max-tablet:text-indigo-800 max-tablet:text-sm
            max-tablet:invisible max-tablet:opacity-20 max-tablet:-translate-x-3 max-tablet:transition-all
            max-tablet:group-hover:visible max-tablet:group-hover:opacity-100 max-tablet:group-hover:translate-x-0
            ${expanded ? "w-52 ml-3" : "w-0 h-6"}`}
      >
        {text}
      </span>
      {!expanded && (
        <div
          className={`
            
            absolute left-full  rounded-md px-2 py-1 ml-6
            bg-indigo-200 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </NavLink>
  );
}

export default Sidemenu;
