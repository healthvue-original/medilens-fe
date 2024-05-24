import { useState } from "react";
import { LuFiles } from "react-icons/lu";
import { FaChartPie, FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const navList = [
  {
    label: "Home",
    id: "home",
    Icon: FaHome,
  },
  {
    label: "Cases",
    id: "cases",
    Icon: LuFiles,
  },
  {
    label: "Reports",
    id: "reports",
    Icon: FaChartPie,
  },
  {
    label: "Settings",
    id: "settings",
    Icon: IoMdSettings,
  },
];

export default function LeftNav(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState(navList[0]);

  return (
    <div className=" h-full w-full">
      <ul className="flex flex-col gap-1 border-r h-full">
        {navList.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`p-1 cursor-pointer`}
          >
            <div
              className={`${
                selectedItem.id == item.id
                  ? " bg-primary text-primary-foreground rounded"
                  : ""
              } flex flex-col gap-1 items-center justify-center p-4`}
            >
              <item.Icon size={"24px"} />
              <p className=" text-xs">{item.label}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
