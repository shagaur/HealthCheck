import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiHome, FiUsers, FiUserCheck, FiChevronDown } from "react-icons/fi";

type UserRole = "admin" | "doctor" | "staff";

interface MenuItem {
  label: string;
  type: "item" | "item-group" | "text";
  path?: string;
  children?: MenuItem[];
  icon?: React.ReactNode;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    type: "item",
    path: "/dashboard",
    icon: <FiHome />,
    roles: ["admin", "doctor", "staff"],
    children: [],
  },
  {
    label: "Master Data",
    type: "text",
    roles: ["admin", "doctor", "staff"],
  },
  {
    label: "Organization",
    type: "item",
    path: "/organization",
    icon: <FiHome />,
    roles: ["admin", "doctor", "staff"],
    children: [],
  },
  {
    label: "Offices",
    type: "item",
    path: "/office",
    icon: <FiHome />,
    roles: ["admin", "doctor", "staff"],
    children: [],
  },
  {
    label: "Users & Roles",
    type: "item-group",
    icon: <FiHome />,
    roles: ["admin", "doctor", "staff"],
    children: [
      {
        label: "Users",
        type: "item",
        path: "/users",
        icon: <FiHome />,
        roles: ["admin", "doctor", "staff"],
        children: [],
      },
      {
        label: "Roles",
        type: "item",
        path: "/roles",
        icon: <FiHome />,
        roles: ["admin", "doctor", "staff"],
        children: [],
      },
    ],
  },
  {
    label: "Patients",
    type: "text",
    roles: ["admin", "doctor", "staff"],
  },
  {
    label: "Patients",
    type: "item",
    path: "/patients",
    icon: <FiUsers />,
    roles: ["admin", "doctor", "staff"],
    children: [],
  },
  {
    label: "Appointments",
    type: "item",
    path: "/appointments",
    icon: <FiHome />,
    roles: ["admin", "doctor", "staff"],
    children: [],
  },
  {
    label: "Patient Visits",
    type: "item",
    path: "/visits",
    icon: <FiUserCheck />,
    roles: ["admin", "doctor", "staff"],
    children: [],
  },
];

interface SidebarProps {
  role: UserRole;
}

const filterMenuByRole = (menu: MenuItem[], userRole: UserRole): MenuItem[] => {
  return menu
    .filter((item) => {
      // If no roles defined → public
      if (!item.roles || item.roles.length === 0) return true;
      return item.roles.includes(userRole);
    })
    .map((item) => {
      if (item.children) {
        const filteredChildren = filterMenuByRole(item.children, userRole);
        return {
          ...item,
          children: filteredChildren,
        };
      }
      return item;
    });
};

function MenuRenderer({
  item,
  currentRole,
  depth = 0,
}: {
  item: MenuItem;
  currentRole: UserRole;
  depth?: number;
}) {
  const [open, setOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <li>
      {item.type === "item" && (
        <NavLink
          to={item.path!}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg text-md font-semibold transition ${
              isActive
                ? "bg-[#1B345D] text-white"
                : "text-[#ABB6CD] hover:bg-[#162742] hover:text-white"
            }`
          }
        >
          {item.icon && <span>{item.icon}</span>}
          {item.label}
        </NavLink>
      )}

      {item.type === "item-group" && (
        <div className="flex items-center justify-between gap-3 px-4 py-2 mb-1 rounded-lg text-md font-semibold transition text-[#ABB6CD] hover:bg-[#162742] hover:text-white">
          <div className="flex items-center gap-3">
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </div>
          {hasChildren && (
            <button
              type="button"
              aria-label={open ? "Collapse menu" : "Expand menu"}
              onClick={() => setOpen(!open)}
              className="ml-2 text-[#ABB6CD] hover:text-white cursor-pointer"
            >
              <FiChevronDown
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      )}

      {item.type === "text" && (
        <div className="flex flex-col gap-2 mt-2">
          <div className="border-t border-[#1B345D]"></div>
          <span className="px-4 flex items-center gap-3 text-sm font-semibold uppercase mt-1 text-[#ABB6CD]">
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </span>
        </div>
      )}

      {hasChildren && open && (
        <ul className={`${item.type==='item-group'?'ml-2':''}`}>
          {item
            .children!.filter((child) => child.roles.includes(currentRole))
            .map((child, index) => (
              <MenuRenderer
                key={index}
                item={child}
                currentRole={currentRole}
                depth={depth + 1}
              />
            ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({ role }: SidebarProps) {
  const filteredMenu = filterMenuByRole(menuItems, role);

  return (
    <aside className="w-64 bg-[#0E1D34] text-white flex flex-col h-screen">
      <div className="h-14 flex items-center px-6 font-semibold">
        <div className="flex items-center gap-2">
          <img src="/public/assets/logo.png" width={40} height={40} alt="" />
          <span className="text-xl">HealthCheck</span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          {filteredMenu
            .filter((item) => item.roles.includes(role))
            .map((item, index) => (
              <MenuRenderer key={index} item={item} currentRole={role} />
            ))}
        </ul>
      </nav>
    </aside>
  );
}
