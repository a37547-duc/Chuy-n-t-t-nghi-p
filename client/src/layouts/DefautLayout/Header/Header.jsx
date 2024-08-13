import React from "react";
import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import AuthButtons from "./AuthButtons/AuthButtons";
import Cart from "./Cart/Cart";

export default function Header() {
  return (
    <div className="flex">
      <Logo></Logo>
      <SearchBar></SearchBar>
      <AuthButtons></AuthButtons>
      <Cart></Cart>
    </div>
  );
}
