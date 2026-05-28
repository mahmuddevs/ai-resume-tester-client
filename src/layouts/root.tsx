import { Outlet } from "react-router";
import Header from "../components/home/header";

export default function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}