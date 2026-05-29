import { Outlet } from "react-router";
import Header from "../components/home/header";
import Footer from "../components/home/footer";

export default function Root() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}