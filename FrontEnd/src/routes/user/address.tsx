import { createFileRoute } from "@tanstack/react-router";

const Address = () => {
  return <div>Hello /user/address!</div>;
};

export const Route = createFileRoute("/user/address")({
  component: Address,
});
