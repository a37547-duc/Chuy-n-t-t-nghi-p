import React from "react";

import Home from "../../pages/Home/Home";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export default function DefaultLayout() {
  return (
    <div className="flex flex-col justify-around min-h-screen">
      <Header />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
    </div>
  );
}
