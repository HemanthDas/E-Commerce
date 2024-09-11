import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Navbar from "../Components/Navbar";
export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div className="w-full h-screen bg-slate-300">
          <Navbar />
          <Outlet />
        </div>
        <TanStackRouterDevtools />
      </>
    );
  },
});
