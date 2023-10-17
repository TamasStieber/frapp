"use client";

import { Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <nav className="bg-green-600">
      <Flex justify="between">
        <Flex gap="2">
          <Logo />
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
  const menuItems = [
    { href: "/", label: "Dashboard" },
    { href: "/projects", label: "Projects" },
    { href: "/issues", label: "Issues" },
  ];

  const currentPath = usePathname();

  return (
    <Flex>
      {menuItems.map((menuItem) => (
        <Link
          key={menuItem.href}
          className={classNames({
            "nav-link": true,
            "bg-green-500": menuItem.href === currentPath,
          })}
          href={menuItem.href}
        >
          {menuItem.label}
        </Link>
      ))}
    </Flex>
  );
};

const AuthStatus = () => {
  return (
    <Link className="nav-link" href="/api/auth/signin">
      Sign in
    </Link>
  );
};

export default NavBar;
