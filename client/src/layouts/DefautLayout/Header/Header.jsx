import Logo from "./Logo/Logo";
import SearchBar from "./SearchBar/SearchBar";
import AuthButtons from "./AuthButtons/AuthButtons";
import Cart from "./Cart/Cart";

export default function Header() {
  return (
    <header className="sticky top-0 flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide z-50">
      <div className="flex items-center justify-between mx-auto max-w-screen-lg w-full">
        <Logo />
        <div className="flex-1 mx-4">
          <SearchBar />
        </div>
        <div className="flex items-center space-x-4">
          <AuthButtons />
          <Cart />
        </div>
      </div>
    </header>
  );
}
