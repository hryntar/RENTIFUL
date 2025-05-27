"use client";

import React from "react";

import { useGetAuthUserQuery } from "@/state/api";

import { NAVBAR_HEIGHT } from "../../lib/constants";
import NavBar from "../../components/NavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser } = useGetAuthUserQuery()

  return (
    <div className="h-full w-full">
      <NavBar />
      <main className={`h-full flex w-full flex-col`} style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
