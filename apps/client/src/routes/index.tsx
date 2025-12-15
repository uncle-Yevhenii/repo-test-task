import { createFileRoute, redirect } from "@tanstack/react-router";
import { CenterWrapper } from "../components/center-wrapper";
import { LoginCard } from "../components/login-card";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    if (localStorage.getItem("username")) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  return (
    <CenterWrapper>
      <LoginCard />
    </CenterWrapper>
  );
}
