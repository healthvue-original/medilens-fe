"use client";
import { RiBodyScanFill } from "react-icons/ri";
import { FaChartPie, FaHome, FaUser, FaFileAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navList = [
  {
    label: "Home",
    id: "home",
    href: "/",
    Icon: FaHome,
  },
  {
    label: "Patients",
    id: "patients",
    href: "patients",
    Icon: FaUser,
  },
  {
    label: "Cases",
    href: "cases",
    id: "cases",
    Icon: FaFileAlt,
  },
  {
    label: "Scans",
    href: "scans",
    id: "scans",
    Icon: RiBodyScanFill,
  },
  {
    label: "Reports",
    href: "reports",
    id: "reports",
    Icon: FaChartPie,
  },
  {
    label: "Settings",
    href: "settings",
    id: "settings",
    Icon: IoMdSettings,
  },
];

export default function LeftNav(): JSX.Element {
  const pathname = usePathname();
  return (
    <div className=" h-full w-full">
      <ul className="flex flex-col gap-1 border-r h-full">
        {navList.map((item) => (
          <div key={item.id} className={`p-1 cursor-pointer`}>
            <Link
              href={item.href}
              className={`flex flex-col gap-1 items-center justify-center px-4 py-2 ${
                pathname === item.href
                  ? "bg-primary text-primary-foreground rounded"
                  : ""
              }`}
            >
              <item.Icon size={"24px"} />
              <p className=" text-xs">{item.label}</p>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
