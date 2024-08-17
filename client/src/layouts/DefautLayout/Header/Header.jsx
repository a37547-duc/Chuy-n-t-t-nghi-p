import React from "react";
import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import AuthButtons from "./AuthButtons/AuthButtons";
import Cart from "./Cart/Cart";

export default function Header() {
  return (
    <header className="flex bg-teal-50 border-b py-4 sm:px-8 px-6 font-[sans-serif] min-h-[80px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
        <Logo />
        <div className="flex-grow">
          <SearchBar className="w-full" />
        </div>
        <div className="flex ml-auto gap-4 mr-20">
          <AuthButtons />
          <Cart />
        </div>
      </div>
    </header>
  );
}
