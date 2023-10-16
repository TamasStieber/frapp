"use client";

import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiBugsnag } from "react-icons/si";
import Logo from "./Logo";

const menuItems = [
  { href: "/", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
];

const NavBar = () => {
  const currentPath = usePathname();
  return (
    <nav className="border-b px-2 bg-lime-500">
      <Flex gap="3">
        <Logo />
        {menuItems.map((menuItem) => (
          <Link
            className={classNames({
              "text-zinc-200": menuItem.href !== currentPath,
              "text-white": menuItem.href === currentPath,
              "hover:text-white transition-colors": true,
            })}
            href={menuItem.href}
          >
            {menuItem.label}
          </Link>
        ))}
      </Flex>
    </nav>
  );
};

export default NavBar;
