import { createRootRoute, Outlet } from "@tanstack/react-router";

import Navbar from "../Components/Navbar";
export const Route = createRootRoute({
  component: () => {
    return (
      <div className="w-full h-screen">
        <Navbar />
        <Outlet />
      </div>
    );
  },
});
