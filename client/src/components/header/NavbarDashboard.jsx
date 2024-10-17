import React, { useState } from "react";
import Button from "../buttons/Button";
import { FaBell } from "react-icons/fa6";

const NavbarDashboard = ({
  isLoading,
  userName,
  heading,
  navbarButtonHandler,
  notficationCount,
  notficationFrom,
  notficationTitle,
  notificationBody,
  sidemenuExpanded,
}) => {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <nav
      className={`flex-btwn-center h-20 max-sm:h-14 py-4 px-10 backdrop-blur-sm backdrop-filter 
            max-sm:px-4 max-sm:gap-2 fixed top-0 right-0   max-sm:py-8   z-40   border-b-1 border-black bg-gray-900 
       
            max-tablet:w-[92%] max-sm:w-[84%]
            ${sidemenuExpanded ? "w-[85%]" : "w-[95%]"}


            ${isLoading && " opacity-50 "} text-white`}
    >
      <div className="h-full  flex items-center gap-4 max-sm:hidden">
        <h1 className="text-[1vw] max-tablet:text-lg font-medium hover:underline hover:font-semibold">
          {userName}
        </h1>
      </div>

      {/* <h1 className="text-[1.5vw] max-tablet:text-xl max-sm:text-base font-medium">
        {heading}
      </h1> */}

      <div className=" flex flex-col h-full">
        <div className="flex justify-between  items-center h-full gap-10 ">
          {/* Notification bell and count */}
          <div
            className="relative flex-center max-sm:hidden"
            onMouseEnter={() => setShowNotification(true)}
            onClick={() => setShowNotification(false)}
          >
            {/*notification count  */}
            <div className="rounded-full bg-red-500 text-white  absolute -top-3 left-2 flex-center text-xs size-4 px-1 aspect-square font-medium">
              {notficationCount ? notficationCount + "+" : 10}
            </div>
            <FaBell className="text-white size-5" />
          </div>

          <Button
            label={"Sign Out"}
            onClickHandler={navbarButtonHandler}
            color={"pink"}
            additionalStyles={"font-medium max-sm:text-sm "}
          />
        </div>

        {showNotification && (
          <div
            // onMouseEnter={() => setShowNotification(true)}
            onMouseLeave={() => setShowNotification(false)}
            className="flex flex-col fixed  bg-blue-100 gap-4 top-20 p-5 rounded-lg right-10  w-1/5 "
          >
            <h1 className="text-2xl font-medium  bg-white p-3 px-4 rounded-xl hover:bg-slate-50">
              Notifications
            </h1>
            <div className="p-4 flex flex-col gap-2 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-all  duration-200">
              <div className="flex justify-between text-xl">
                <h1 className="bg-white p-2 rounded-xl hover:bg-slate-50">
                  Titile:{" "}
                  <span className=" font-semibold">{notficationTitle}</span>{" "}
                </h1>
                <h1 className="bg-white p-2 rounded-xl hover:bg-slate-50">
                  From:{" "}
                  <span className=" font-semibold">{notficationFrom}</span>{" "}
                </h1>
              </div>
              <p className="text-lg font-medium text-justify px-2">
                {notificationBody}
              </p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarDashboard;
