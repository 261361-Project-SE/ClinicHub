"use client";

import SettingsFilterTab from "@/components/dashboard/SettingsFilterTab";
import { useState } from "react";

const SettingsPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("booking");

  const menuItems = [
    { id: "booking", label: "การเปิดจอง" },
    { id: "workingHours", label: "เวลาเปิด-ปิด" },
  ];

  return (
    <div className="flex flex-col p-4 bg-white gap-y-4 rounded-xl shadow-shadow-bg">
      <SettingsFilterTab onFilterChange={(filter) => setSelectedMenu(filter)} />
      {selectedMenu === "booking" && (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <label className="text-sm text-gray-500">เปิดจอง</label>
            <div className="flex items-center gap-x-2">
              <input
                type="time"
                className="w-1/2 p-2 border border-gray-200 rounded-md"
              />
              <span>ถึง</span>
              <input
                type="time"
                className="w-1/2 p-2 border border-gray-200 rounded-md"
              />
            </div>
          </div>
        </div>
      )}
      {selectedMenu === "workingHours" && (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <label className="text-sm text-gray-500">เวลาเปิด-ปิด</label>
            <div className="flex items-center gap-x-2">
              <input
                type="time"
                className="w-1/2 p-2 border border-gray-200 rounded-md"
              />
              <span>ถึง</span>
              <input
                type="time"
                className="w-1/2 p-2 border border-gray-200 rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
