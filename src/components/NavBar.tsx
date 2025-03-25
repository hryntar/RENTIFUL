import React from "react";
import Link from "next/link";
import Image from "next/image";

import {NAVBAR_HEIGHT} from "@/lib/constants";
import {Button} from "./ui/button";

const NavBar = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{height: `${NAVBAR_HEIGHT}px`}}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
        <div className="flex items-center gap-4 md:gap-6">
          <Link className="cursor-pointer hover:!text-primary-300" href="/" scroll={false}>
            <div className="flex items-center gap-3">
              <Image
                alt="Rentiful Logo"
                className="w-6 h-6"
                height={24}
                src="/logo.svg"
                width={24}
              />
              <div className="text-xl font-bold">
                RENT
                <span className="text-secondary-500 font-light hover:!text-primary-300">IFUL</span>
              </div>
            </div>
          </Link>
        </div>
        <p className="text-primary-200 hidden md:block">
          Discover your perfect apartment with our advanced search
        </p>
        <div className="flex items-center gap-5">
          <Link href="/signin">
            <Button
              className="cursor-pointer text-white border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg"
              variant="outline"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              className="cursor-pointer text-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"
              variant="secondary"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
