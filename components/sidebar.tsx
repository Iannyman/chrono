"use client";
import { House, IdCard, List, Settings, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const menuItems = [
  { name: "Home", icon: House, variant: "ghost", href: "/" },
  { name: "Employees", icon: IdCard, variant: "ghost", href: "/employees" },
  { name: "Enterprise", icon: List, variant: "ghost", href: "/enterprise" },
  { name: "Settings", icon: Settings, variant: "ghost", href: "/settings" },
] as const;

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear token and user
    localStorage.removeItem("token");

    // Redirect to login
    router.replace("/login");
  };

  return (
    <div className="flex">
      <div className="relative w-20 md:w-60 bg-gray-800 p-4 text-white">
        <div className="flex justify-between items-center p-4">
          <Image
            className="w-48 h-auto"
            src="/logo.png"
            alt="Logo"
            width={192}
            height={60}
            priority
          />
        </div>

        <nav className="mt-4 flex flex-col justify-between">
          <ul className="flex flex-col gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex h-14 w-full items-center rounded-xl px-4 text-sm font-medium hover:text-[#fbfdc1]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center shrink-0">
                      <Icon size={20} />
                    </span>

                    <span className="ml-4 hidden md:block">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="absolute bottom-5 border-t-2 border-gray-700 px-4 pt-4 w-50">
            <div className="flex flex-col gap-3">
              <div className="leading-4">
                <h4 className="font-semibold">User</h4>
              </div>

              <Button
                onClick={handleLogout}
                variant="logout"
                className="flex h-10 w-full items-center rounded-xl text-sm font-medium hover:text-[#fbfdc1] cursor-pointer"
              >
                <span className="flex h-5 w-5 items-center justify-center shrink-0">
                  <LogOut size={20} />
                </span>

                <span className="ml-4">Logout</span>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
