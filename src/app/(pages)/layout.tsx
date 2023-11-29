"use client";

// @ts-ignore
import { SdsNavbar } from "sds-projects";

import {
  AcademicCapIcon,
  CurrencyDollarIcon,
  HeartIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-indigo-300">
      <SdsNavbar
        projectName="Quack Advice"
        navigation={[
          {
            name: "Quack Advice",
            page: "/",
            icon: AcademicCapIcon,
          },
          {
            name: "Pricing",
            page: "/pricing",
            icon: CurrencyDollarIcon,
          },
          {
            name: "Who Made This?",
            page: "/who-made-this",
            icon: HomeModernIcon,
          },
          {
            name: "Meet The Ducks",
            page: "/ducks",
            icon: HeartIcon,
          },
        ]}
        customTheme={{
          colors: {
            background: "bg-indigo-300",
            border: "border-gray-800",
            dropdown: "bg-gray-800 text-indigo-300",
            dropdownText:
              "bg-gray-800 hover:bg-indigo-300 hover:text-gray-800 text-indigo-300",
            dropdownItem: "bg-gray-800",
          },
        }}
        hideSettingsButton
        hideYourProfileButton
        hideUserMenu
      >
        {children}
      </SdsNavbar>
    </div>
  );
}
