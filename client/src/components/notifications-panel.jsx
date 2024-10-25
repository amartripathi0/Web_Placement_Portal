import React from "react";

export default function NotificationsPanel({
  notificationTitle,
  setShowNotification,
  notificationBody,
  notificationFrom,
}) {
  return (
    <div
      onMouseLeave={() => setShowNotification(false)}
      className="flex flex-col fixed bg-white gap-4 top-20 p-5 rounded-lg right-10 shadow-lg w-80 transition-transform transform hover:scale-105"
    >
      <h2 className="text-xl font-semibold text-gray-900 p-2 px-4 border-b border-gray-300">
        Notifications
      </h2>
      <div className="flex flex-col gap-3 bg-gray-50 rounded-lg p-4 shadow-md transition-all duration-200">
        <div className="flex justify-between items-center text-md text-gray-800">
          <span className="flex-1 bg-blue-100 p-2 rounded-lg hover:bg-blue-200 transition">
            <span className="font-semibold">{notificationTitle}</span>
          </span>
          <span className="ml-2 flex-1 bg-blue-100 p-2 rounded-lg hover:bg-blue-200 transition">
            <span className="font-semibold">{notificationFrom}</span>
          </span>
        </div>
        <p className="text-sm text-gray-700">{notificationBody}</p>
      </div>
    </div>
  );
}
