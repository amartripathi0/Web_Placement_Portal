import React, { useState } from "react";
import Button from "../buttons/Button";
import { FaBell } from "react-icons/fa6";
import NotificationsPanel from "../notifications-panel";
import cn from "../../utils/cn";

const NavbarDashboard = ({
  userName,
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
      className={cn(
        `flex-btwn-center h-20 max-sm:h-14 py-4 px-10 backdrop-blur-sm backdrop-filter max-sm:px-4 max-sm:gap-2 fixed top-0 right-0 max-sm:py-8 z-40 border-b-1 border-black bg-neutral-800 max-tablet:w-[92%] max-sm:w-[84%] text-neutral-50`,
        sidemenuExpanded ? "w-[85%]" : "w-[95%]"
      )}
    >
      <h1 className="text-[1vw] max-tablet:text-lg font-medium hover:underline hover:font-semibold h-full flex items-center gap-4 max-sm:hidden">
        {userName}
      </h1>

      <div className="flex justify-between items-center h-full gap-10  ">
        {/* Notification bell and count */}
        <div
          className="relative flex-center max-sm:hidden"
          onMouseEnter={() => setShowNotification(true)}
          onClick={() => setShowNotification(false)}
        >
          {/*notification count  */}
          <div className="rounded-full bg-red-500 text-white  absolute -top-2 left-2 flex-center text-xs size-4 px-1 aspect-square font-medium">
            {notficationCount ? notficationCount + "+" : 10}
          </div>
          <FaBell className="text-white size-5 mt-1" />
        </div>

        <Button
          label={"Sign Out"}
          onClickHandler={navbarButtonHandler}
          color={"pink"}
          additionalStyles={"font-medium max-sm:text-sm"}
        />
      </div>

      {showNotification && (
        <NotificationsPanel
          notficationTitle={notficationTitle}
          setShowNotification={setShowNotification}
          notificationBody={notificationBody}
          notficationFrom={notficationFrom}
        />
      )}
    </nav>
  );
};

export default NavbarDashboard;
