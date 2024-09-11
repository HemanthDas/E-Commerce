import { createLazyRoute } from "@tanstack/react-router";
import App from "../App";

export const Route = createLazyRoute("/")({
  component: () => <App />,
});
