import Home from "../../pages/Home/Home";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

export default function DefauLayout() {
  return (
    <div>
      <Header></Header>
      <main>
        {/* <Home></Home> */}
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
}
