import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { SiBugsnag } from "react-icons/si";

const Logo = () => {
  return (
    <Link className="py-2 px-2 text-white font-bold" href="/">
      <Flex align="center" gap="1">
        <SiBugsnag style={{ strokeWidth: "1" }} />
        FrApp
      </Flex>
    </Link>
  );
};

export default Logo;
