"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Inbox, Menu } from "lucide-react";
import { FaSheetPlastic, FaShip, FaTable } from "react-icons/fa6";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    active: false,
    path: "/dashboard",
  },
  { icon: Inbox, label: "Pilot Request", path: "/pilotage-service/request" },
  { icon: FaShip, label: "Pilot Activity", path: "/pilotage-service" },
  { icon: FaSheetPlastic, label: "Reports", path: "/reports" },
];

// const pagesItems = [
//   { icon: Target, label: 'Pricing', path: '/pricing' },
//   { icon: Calendar, label: 'Calendar', path: '/calendar' },
//   { icon: Table, label: 'To-Do', path: '/todo' },
//   { icon: Users, label: 'Contact', path: '/contact' },
//   { icon: FileText, label: 'Invoice', path: '/invoice' },
//   { icon: Grid, label: 'UI Elements', path: '/ui-elements' },
//   { icon: Users, label: 'Team', path: '/team' },
//   { icon: Table, label: 'Table', path: '/table' },
// ]

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
        onClick={() => setOpen(!open)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 overflow-y-auto z-40 transition-transform duration-300
          ${
            open ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:block`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">Panda App</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <div className="px-6">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => router.push(item.path)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.active
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* 
          <div className="px-6 mt-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              PAGES
            </h3>
            <ul className="space-y-1">
              {pagesItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => router.push(item.path)}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div> */}
        </nav>
      </div>

      {/* Overlay for mobile when sidebar open */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
