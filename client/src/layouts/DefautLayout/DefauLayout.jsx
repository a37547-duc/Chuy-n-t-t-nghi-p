
import Home from "../../pages/Home/Home";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function DefauLayout() {
  return (
    <div>
      <Header></Header>
      <main>
        <Home></Home>
      </main>
      <Footer></Footer>
    </div>
  );
}
