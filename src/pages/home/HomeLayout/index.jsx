import React from "react";
import { Outlet } from "react-router-dom";
import TabsBar from "../TabsBar";
import HomePage from "../../Home";

export default function HomeLayout() {
  return (
    <div>
      <HomePage />
      <TabsBar />
      <Outlet />
    </div>
  );
}
