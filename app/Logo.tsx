import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { SiBugsnag } from "react-icons/si";

const Logo = () => {
  return (
    <Link className="text-white" href="/">
      <Flex align="center" gap="1">
        <SiBugsnag />
        FrApp
      </Flex>
    </Link>
  );
};

export default Logo;
